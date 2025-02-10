class triangle extends shape
{
	Normal;
    P0; P1; P2;
    #s1; #s2; 
    #u0; #U1; #v0; #V1;
    ShapeType = 'triangle';

    constructor( P0 = new vec3(0, 0, 0), P1 = new vec3(1, 0, -1), P2 = new vec3(-1, 0, -1), Surf = new surface(), Mod = new mod() )
    {
        super(Surf, Mod);
        this.P0 = CoordSystem.applyCoordinateSystem(P0);
        this.P1 = CoordSystem.applyCoordinateSystem(P1);
        this.P2 = CoordSystem.applyCoordinateSystem(P2);

        this.#s1 = this.P1.sub(this.P0);
        this.#s2 = this.P2.sub(this.P0);
        this.Normal = this.#s1.cross(this.#s2).norm();
        
        let s1 = this.#s2.cross(  this.#s1.cross(this.#s2)  );
        this.#U1 = s1.divN(  this.#s1.dot(s1)  );
        this.#u0 = this.P0.dot(this.#U1);

        let s2 = this.#s1.cross(  this.#s2.cross(this.#s1)  );
        this.#V1 = s2.divN(  this.#s2.dot(s2)  );
        this.#v0 = this.P0.dot(this.#V1);
    }

    isIntersect( Ray )
    {
        if (Math.abs(Ray.Dir.dot(this.Normal)) < 0.00001)
            return 0;
        let t = (this.P0.sub(Ray.PStart)).dot(this.Normal) / (Ray.Dir.dot(this.Normal));
        if (t < 0.001)
            return 0;
        let P = Ray.getPos(t);
        let u = P.dot(this.#U1) - this.#u0;
        let v = P.dot(this.#V1) - this.#v0;
        if (u >= 0 && u <= 1 && v >= 0 && v <= 1 && u + v <= 1)
            return 1;
        return 0;
    }
    
    intersect( Ray )
    {
        if (Math.abs(Ray.Dir.dot(this.Normal)) < 0.00001)
            return false;
        let t = (this.P0.sub(Ray.PStart)).dot(this.Normal) / (Ray.Dir.dot(this.Normal));
        if (t < 0.001)
            return false;
        let P = Ray.getPos(t);
        let u = P.dot(this.#U1) - this.#u0;
        let v = P.dot(this.#V1) - this.#v0;
        if (u >= 0 && u <= 1 && v >= 0 && v <= 1 && u + v <= 1)
        {
            let Intr = new intr();
            Intr.Ray = Ray;
            Intr.Obj = this;
            Intr.TParam = t;
            Intr.InterPos = P;
            Intr.Normal = this.Normal;
            return Intr;            
        }
        return false;
    }
}