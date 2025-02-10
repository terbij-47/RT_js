class mod 
{
    constructor(){}

    getColor( Intr )
    {
        switch (Intr.Obj.ShapeType)
        {
        case 'sphere':
            return this.sphereColor(Intr);
        case 'plane':
            return this.planeColor(Intr);
        case 'triangle':
            return this.triangleColor(Intr);
        default:
            return Intr.Obj.Surf.Kd;        
        }
    }

    planeColor(Intr)
    {
        return Intr.Obj.Surf.Kd;
    }

    sphereColor(Intr)
    {
        return Intr.Obj.Surf.Kd;    
    }

    triangleColor(Intr)
    {
        return Intr.Obj.Surf.Kd;    
    }

    getNormal( Intr )
    {
        switch (Intr.Obj.ShapeType)
        {
        case 'sphere':
            return this.sphereNormal(Intr);
        case 'plane':
            return this.planeNormal(Intr);
        case 'triangle':
            return this.triangleNormal(Intr);
        default:
            return Intr.Normal;        
        }
    }

    planeNormal(Intr)
    {
        return Intr.Normal;
    }

    sphereNormal(Intr)
    {
        return Intr.Normal;    
    }

    triangleNormal(Intr)
    {
        return Intr.Normal;    
    }    
}