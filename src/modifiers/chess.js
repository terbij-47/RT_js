class chess_mod extends mod
{
    H; W; Up; Right;

    constructor(W, H, OrientationUp = new vec3(0, 0, 1), OrientationRight = new vec3(1, 0, 0))
    {
        super();
        this.H = H;
        this.W = W;
        this.Up = CoordSystem.applyCoordinateSystem(OrientationUp.norm());        
    }

    planeColor( Intr )    
    {
        let color = Intr.Obj.Surf.Kd;

        this.Right = this.Up.cross(Intr.Normal).norm();
        this.Up = Intr.Normal.cross(this.Right);
        let Delta = Intr.InterPos.sub(Intr.Obj.Pos);
        let XCell = Math.floor(this.Right.dot(Delta) / this.W);
        let YCell = Math.floor(this.Up.dot(Delta) / this.H);
        if ((Math.abs(XCell + YCell)) % 2)
            return color.divN(255);
        return color;
    }
}
