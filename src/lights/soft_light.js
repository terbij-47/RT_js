class soft_light extends light
{
    Pos;
    R;
    DotPerArea = 30;
    PCount;

    constructor( Pos = new vec3(0, 10, 0), R = 1, Color = new vec3(1, 1, 1), Cc = 0, Cl = 0.05, Cq = 0.0001 )
    {
        super(Color, Cc, Cl, Cq);
        this.Pos = CoordSystem.applyCoordinateSystem(Pos);
        this.R = R;         
        let Area = Math.PI * this.R**2;
        this.PCount = Math.round(Area * this.DotPerArea);
    }

    dir( Point )
    {
        return this.Pos.sub(Point).norm();
    }

    shadowCoeff( InterPos, Shapes )
    {

        let N = this.Pos.sub(InterPos).norm();
        let Right = N.cross(this.Pos).norm();
        let Up = Right.cross(N);

        let Transparency = 0;
        let InterCount = 0;
        for (let i = 0; i < this.PCount; i++)
        {
            let CoordRo = Math.random() * this.R;
            let CoordPhi = Math.random() * 2 * Math.PI;
            let x = CoordRo * Math.cos(CoordPhi);
            let y = CoordRo * Math.sin(CoordPhi);
            
            let LgDir = Up.mulN(y).add(Right.mulN(x).add(this.Pos)).sub(InterPos);
            let Threshold = 0.000001; 
    
            let SRay = new ray(InterPos.add(LgDir.mulN(Threshold)), LgDir);
            let PointTrans = 0;
            for (let j = 0; j < Shapes.length; j++)
                if (Shapes[j].isIntersect(SRay))
                {   
                    if (Shapes[j].Surf.WKr === 0)
                    {
                        InterCount++;
                        PointTrans = 1; 
                        break;
                    }
                    PointTrans += 1 - Shapes[j].Surf.WKr; 
                    InterCount++;
                    // break;
                }
            Transparency += PointTrans;    
        }
        // 0 - no shadow
        return Math.max(0, Transparency / this.PCount);
        return Math.max(0, InterCount / this.PCount - Transparency / this.PCount);
    }

    attenuationCoeff( Pos )
    {
        let dist = (Pos.sub(this.Pos)).len();
        let coeff = 1 / (this.Cc + this.Cl * dist + this.Cq * dist**2);
        return Math.min(coeff, 1);
    }


}