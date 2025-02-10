class ray
{
	PStart;
    Dir;

    constructor( PStart, Dir )
    {
        this.PStart = PStart;
        this.Dir = Dir.norm();
    }

    getPos( TParam )
    {
        return this.PStart.add(this.Dir.mulN(TParam));
    }
}

class coordinateSystem
{
    CoordSystem;

    constructor()
    {
        this.CoordSystem = 'cartesian';
    }

    /*
        format: (Phi, R, Z0)
     */
    cylindrical()
    {
        this.CoordSystem = 'cylindrical';
    }
    
    cartesian()
    {
        this.CoordSystem = 'cartesian';
    }
    
    applyCoordinateSystem( V )
    {
        switch (this.CoordSystem)
        {
        case 'cartesian':
            return V;
        case 'cylindrical':
            V.X = V.X * Math.PI / 180;
            return new vec3(V.Y * Math.cos(V.X), V.Z, V.Y * Math.sin(V.X));            
        }
    }
}

class intr
{
    Ray;
    Obj;
    InterPos;
    Normal;
    TParam;

    constructor(  ){}    
}