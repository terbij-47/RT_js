class vec3
{
    X;
    Y;
    Z;

    constructor( x = 0, y = 0, z = 0 )
    {        
        this.X = x;
        this.Y = y;
        this.Z = z;

    }

    add( V )
    {
        return new vec3(this.X + V.X, this.Y + V.Y, this.Z + V.Z);
    }

    dot( V )
    {
        return this.X * V.X + this.Y * V.Y + this.Z * V.Z;
    }

    cross( V )
    {
        return new vec3(this.Y * V.Z - this.Z * V.Y, V.X * this.Z - this.X * V.Z, this.X * V.Y - V.X * this.Y);
    }

    len2(  )
    { 
        return this.X * this.X + this.Y * this.Y + this.Z * this.Z;
    }

    len(  )
    {
        return Math.sqrt(this.len2());
    }

    mul( V )
    {
        return new vec3(this.X * V.X, this.Y * V.Y, this.Z * V.Z);
    }

    sub( V )
    {
        return new vec3(this.X - V.X, this.Y - V.Y, this.Z - V.Z);
    }

    mulN( N )
    {
        return new vec3(this.X * N, this.Y * N, this.Z * N); 
    }

    divN( N )
    {
        return new vec3(this.X / N, this.Y / N, this.Z / N);
    }

    normSelf()
    {
        let L = this.len();
        if (L != 0)
          this.X /= L, this.Y /= L, this.Z /= L;
        return this;
    }

    norm()
    {
        let L = this.len();
        if (L != 0)
          return new vec3(this.X / L, this.Y / L, this.Z / L);
        return this;        
    }

    maxC()
    {
        return Math.max(this.X, Math.max(this.Y, this.Z));
    }
}