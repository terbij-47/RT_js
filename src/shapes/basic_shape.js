class surface
{
    Ka; Kd; Ks; Ph; 
    WKl;  // reflection coefficient (how much is reflected: 1 - like mirror; 0 - nothing reflected)
    Kr;  // refraction coefficient (sin_a / sin_b)
    WKr; // (how much is refracted: 1 - all goes throw; 0 - hothing refracted)
    
    constructor( Ka = new vec3(0.5, 0.5, 0.5), Kd = new vec3(0.5, 0.5, 0.5), Ks = new vec3(0.5, 0.5, 0.5), Ph = 5, WKl = 0.7, Kr = 1, WKr = 0.7 )
    {
        this.Ka = Ka;
        this.Kd = Kd;
        this.Ks = Ks;
        this.Ph = Ph;
        this.WKl = WKl;
        this.Kr = Kr;
        this.WKr = WKr;
    }
}

class shape
{
    Type = "shape";
    Surf;
    Mod;

    constructor( Surf, Mod )
    {
        this.Surf = Surf;
        this.Mod = Mod;
        console.log(this.Surf);
    }

    isIntersect( Ray )
    {
        return false;
    }

    intersect( Ray )
    {
        return new intr();
    }
}