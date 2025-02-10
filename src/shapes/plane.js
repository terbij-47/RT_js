class plane extends shape
{
	Normal;
    Pos;
    ShapeType = 'plane';

    constructor( Normal = new vec3(0, 1, 0), Pos = new vec3(0, -1, 0), Surf = new surface(), Mod = new mod() )
    {
        super(Surf, Mod);
        this.Normal = CoordSystem.applyCoordinateSystem(Normal.norm());
        this.Pos = CoordSystem.applyCoordinateSystem(Pos);
    }

    isIntersect( Ray )
    {
        if (Math.abs(Ray.Dir.dot(this.Normal)) < 0.00001)
            return 0;
        if ((this.Pos.sub(Ray.PStart)).dot(this.Normal) / (Ray.Dir.dot(this.Normal)) < 0.001)
            return 0;
        return 1;
    }
    
    intersect( Ray )
    {
        if (Math.abs(Ray.Dir.dot(this.Normal)) < 0.00001)
            return false;
        let t = (this.Pos.sub(Ray.PStart)).dot(this.Normal) / (Ray.Dir.dot(this.Normal));
        if (t < 0.001)
            return false;
        let Intr = new intr();
        Intr.Ray = Ray;
        Intr.Obj = this;
        Intr.TParam = t;
        Intr.InterPos = Ray.getPos(t);
        Intr.Normal = this.Normal;
        return Intr;        
    }

}
