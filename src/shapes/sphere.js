class sphere extends shape
{
    CPos;
    R;
    R2;
    ShapeType = 'sphere';

    constructor( CPos = new vec3(0, 0, -1), R = 1, Surf = new surface(), Mod = new mod() )
    {
        
        console.log("cylindrical " , CPos, R);
        super(Surf, Mod);
        this.CPos = CoordSystem.applyCoordinateSystem(CPos);
        this.R = R;
        this.R2 = R * R;
        console.log("cartesian " , this.CPos, this.R);
    }

    isIntersect( Ray )
    {
        /*
        let OO1 = this.CPos.sub(Ray.PStart);
        let OP = Ray.Dir.mulN(OO1.dot(Ray.Dir));
        let l = (OO1.sub(OP)).len2();
        return l <= this.R2;  */
        let OC = Ray.PStart.sub(this.CPos);
        let Len2OC = OC.len2();
        let Root = Ray.Dir.dot(OC)**2 - Len2OC + this.R2;
        if (Root < 0)
            return false;
        let SRoot = Math.sqrt(Root);
        let DOC = -Ray.Dir.dot(OC);
        let t1 = DOC - SRoot;
        let t2 = DOC + SRoot;
        if (t2 < 0)
          return false;
        return true;

    }

    intersect( Ray )
    {
        let OC = Ray.PStart.sub(this.CPos);
        let Len2OC = OC.len2();
        let Root = Ray.Dir.dot(OC)**2 - Len2OC + this.R2;
        if (Root < 0)
            return false;
        let SRoot = Math.sqrt(Root);
        let DOC = -Ray.Dir.dot(OC);
        let t1 = DOC - SRoot;
        let t2 = DOC + SRoot;
        if (t2 < 0)
            return false;
        let Intr = new intr();
        Intr.TParam = t1 > 0 ? t1 : t2;
        Intr.Ray = Ray;
        Intr.Obj = this;
        Intr.InterPos = Ray.getPos(Intr.TParam);
        Intr.Normal = Intr.InterPos.sub(this.CPos).norm();
        return Intr;
    }
}