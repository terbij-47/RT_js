class light
{
    Color;
    Cc; Cl; Cq;
    Type = "light";
    
    constructor( nColor = new vec3(1, 1, 1), Cc, Cl, Cq )
    {
        this.Color = nColor; this.Cc = Cc; this.Cl = Cl; this.Cq = Cq;
    }

    dir( Pos )
    {
        return new vec3(0, -1, 0);
    }

    shadowCoeff( InterPos, Shapes )
    {
        let LgDir = this.dir(InterPos);
        let Threshold = 0.000001; 

        let Transparency = 0;
        let flag = 0;
        let SRay = new ray(InterPos.add(LgDir.mulN(Threshold)), LgDir);
        for (let j = 0; j < Shapes.length; j++)
            if (Shapes[j].isIntersect(SRay))
            {
                if (Shapes[j].Surf.WKr === 0)
                    return 1;
                Transparency += Shapes[j].Surf.WKr;                                
                flag = 1;
            }
        if (flag)
            // return 1;
            return Math.max(0, 1 - Transparency);
        return 0;     
    }

    attenuationCoeff( Pos )
    {
        return 1;
    }
}

class dir_light extends light
{
    #Dir;

    constructor( Direction = new vec3(-0.5, -1, -0.1), Color = new vec3(1, 1, 1), Cc = 0, Cl = 0.05, Cq = 0.0001 )
    {
        super(Color, Cc, Cl, Cq);
        this.#Dir = CoordSystem.applyCoordinateSystem(Direction.norm());
    }

    dir( Pos )
    {
        return this.#Dir.mulN(-1);
    }
}

class point_light extends light
{
    LPos;

    constructor( Pos = new vec3(0, 10, 0), Color = new vec3(1, 1, 1), Cc = 0, Cl = 0.05, Cq = 0.0001 )
    {
        super(Color, Cc, Cl, Cq);        
        this.LPos = CoordSystem.applyCoordinateSystem(Pos);
    }

    dir( Pos )
    {
        return this.LPos.sub(Pos).norm();
    }

    attenuationCoeff( Pos )
    {
        let dist = (Pos.sub(this.LPos)).len();
        let coeff = 1 / (this.Cc + this.Cl * dist + this.Cq * dist**2);
        return Math.min(coeff, 1);
    }
}

class proj_light extends light
{
    LPos; Alpha; Dir;
    
    constructor( Pos, Dir, Alpha = 360, Color = new vec3(1, 1, 1), Cc = 0, Cl = 0.05, Cq = 0.0001 )
    {
        super(Color, Cc, Cl, Cq);
        this.LPos = Pos; this.Dir = Dir.norm(); this.Alpha = Alpha; 
    }

    dir( Pos )
    {
        return this.LPos.sub(Pos).norm();
    }

    attenuationCoeff( Pos )
    {
        let r = Pos.sub(this.LPos).norm();
        let dist = r.len();

        if (r.dot(this.Dir) < Math.cos(this.Alpha * Math.PI / 180))
            return 0;
        
        let coeff = 1 / (this.Cc + this.Cl * dist + this.Cq * dist**2);
        return Math.min(coeff, 1);
    }

}
