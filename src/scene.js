let CoordSystem = new coordinateSystem();

class scene
{
    Shapes = [];
    Transparent = [];
    Lights = [];
    // envi Media;
    RecLevel;
    MaxResLevel;
    Threshold = 0.0001; 
    BackgroungColor = new vec3(0.1, 0.1, 0.1);

    // camera parametrs
    CamLoc; CamAt; CamUp; CamRight;    // Up and Right define screen plane
    ProjSize; ProjDist;
    RaysPointStart;

    constructor( RecLevelMax = 1)
    {
        this.RecLevel = 0;
        this.MaxRecLevel = RecLevelMax;
    }    

    shade( Intr )
    {        
        let Ka = Intr.Obj.Surf.Ka;
        let Kd = Intr.Obj.Mod.getColor(Intr);
        let Ks = Intr.Obj.Surf.Ks;
        let Ph = Intr.Obj.Surf.Ph;
        let Normal = Intr.Obj.Mod.getNormal(Intr);

        // result color
        let ResColor = new vec3();
        
        // reflected ray direction
        let R = Intr.Ray.Dir.sub(Normal.mulN(2 * Intr.Ray.Dir.dot(Normal))).norm();
        let Reflected = new ray(Intr.InterPos.add(R.mulN(this.Threshold)), R);
        
        // ambient
        let Ia = Ka.mul(this.BackgroungColor);
        ResColor = ResColor.add(Ia);

        // count all lights
        for (let i = 0; i < this.Lights.length; i++)
        {
            // current light
            let Lg = this.Lights[i];
            let LgDir = Lg.dir(Intr.InterPos);
            
            let ShadowCoeff = Lg.shadowCoeff(Intr.InterPos, this.Shapes);
            if (ShadowCoeff == 1)
                continue;

            // diffuse
            let Id = Lg.Color.mulN(  Math.max(0, LgDir.dot(Normal))  ).mul(Kd);
            // specular
                // phong 
            // let Is = Ks.mul(Lg.Color.mulN(  Math.max(0, R.dot(LgDir))**Ph)  );
                // blinn-phong
            let Is = Ks.mul(Lg.Color.mulN(  Math.max(0, Normal.dot(  (LgDir.sub(Intr.Ray.Dir)).norm()  ))**Ph)  );

            // light attenuation coefficient
            let Fatt = Lg.attenuationCoeff(Intr.InterPos);
            let Idsp = (Id.add(Is)).mulN(Fatt);

            // result color    
            ResColor = ResColor.add(Idsp.mulN(1 - ShadowCoeff));
        }
        
        // reflection and refraction coefficients
        let ReflectionCoeff = Intr.Obj.Surf.WKl;
        let RefractionCoeff = Intr.Obj.Surf.WKr;
        if (this.RecLevel > 1)
        {
            ReflectionCoeff = Math.exp(-Intr.Ray.PStart.sub(Intr.InterPos).len() * (1 - Intr.Obj.Surf.WKl) * 0.01)  * Intr.Obj.Surf.WKl;
            RefractionCoeff = Math.exp(-Intr.Ray.PStart.sub(Intr.InterPos).len() * (1 - Intr.Obj.Surf.WKr) * 0.01)  * Intr.Obj.Surf.WKr;
        }

        // reflection
        ResColor = ResColor.add(this.trace(Reflected).mulN(ReflectionCoeff));
        
        // refraction        
        let Dir = Intr.Ray.Dir;
        let Norm = Normal.dot(Dir) < 0 ? Normal : Normal.mulN(-1);
        let Up = Dir.cross(Norm);
        let Right = Norm.cross(Up).norm();
        let Sin_b = Up.len() / Intr.Obj.Surf.Kr;
        let X = Right.mulN(Sin_b);
        let Cos_b = Math.sqrt(1 - Sin_b**2);
        let Y = Norm.mulN(-Cos_b);
        let ResDir = Y.add(X).norm();
        let RefractionRay = new ray(Intr.InterPos.add(ResDir.mulN(this.Threshold)), ResDir);

        ResColor = ResColor.add(this.trace(RefractionRay).mulN(Intr.Obj.Surf.WKr));

        return ResColor;
    }

    trace( Ray )
    {
        this.RecLevel++;
        if (this.RecLevel > this.MaxRecLevel)
        {   
            this.RecLevel--;
            return new vec3();
        }

        let BestIntr = new intr();
        BestIntr.TParam = Infinity;
        let flag = 0;

        for (let i = 0; i < this.Shapes.length; i++)
        {
            let Intr = this.Shapes[i].intersect(Ray);
            if (Intr == false)
                continue;
            if (Intr.TParam < BestIntr.TParam)
                BestIntr = Intr, flag = 1;
        }
        if (!flag)
        {
            this.RecLevel--;
            return new vec3(0, 0, 0);
        }
        let color = this.shade(BestIntr);

        this.RecLevel--;
        return color;
    }

    add( object )
    {
        if (object.Type == "shape")
        {
            this.Shapes.push(object);
            if (object.Surf.Wkr != 0)
                this.Transparent.push(object);
        }
        else if (object.Type == "light")
            this.Lights.push(object);
    }

    camSet( CamLoc = new vec3(0, 0, 0), CamUp = new vec3(0, 1, 0), CamAt = new vec3(0, 0, -1), ProjDist = 5, ProjSize = 100 )
    {
        this.ProjDist = ProjDist;
        this.ProjSize = ProjSize;
        this.CamAt = CoordSystem.applyCoordinateSystem(CamAt.norm());
        this.CamRight = this.CamAt.cross(CoordSystem.applyCoordinateSystem(CamUp)).norm();
        this.CamUp = this.CamRight.cross(this.CamAt).norm();
        this.CamLoc = CoordSystem.applyCoordinateSystem(CamLoc);
        this.RaysPointStart = this.CamLoc.sub(this.CamAt.mulN(ProjDist));
    }
}