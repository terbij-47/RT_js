class texture_mod extends mod
{    
    H; W; Img;
    Up; Right; 

    constructor(W, H, Img, OrientationUp = new vec3(0, 0, 1), OrientationRight = new vec3(1, 0, 0))
    {
        super();
        this.H = H;
        this.W = W;
        this.Img = Img;
        this.Up = CoordSystem.applyCoordinateSystem(OrientationUp.norm()); 
        this.Right = CoordSystem.applyCoordinateSystem(OrientationRight.norm()); 
    }

    planeColor( Intr )    
    {
        this.Right = this.Up.cross(Intr.Normal).norm();
        this.Up = Intr.Normal.cross(this.Right);
        let Delta = Intr.InterPos.sub(Intr.Obj.Pos);

        let x = this.Right.dot(Delta) / this.W - Math.floor(this.Right.dot(Delta) / this.W);
        let y = this.Up.dot(Delta) / this.H - Math.floor(this.Up.dot(Delta) / this.H);
        let texX = Math.floor(this.Img.W * x);
        let texY = Math.floor(this.Img.H * y);
        return this.Img.getPixel(texX, texY);
    }

    sphereColor( Intr )
    {
        let Fwd = this.Right.cross(this.Up.mulN(-1)).norm();
        this.Right = this.Up.cross(Fwd.mulN(-1)).norm();

        let r = Intr.InterPos.sub(Intr.Obj.CPos);
        let v = Math.acos(this.Up.dot(r.norm())) / Math.PI;
        let r1 = r.sub(this.Up.mulN(this.Up.dot(r))).norm();
        let cosA = this.Right.dot(r1);
        let sinA = Fwd.dot(r1);
        let acosA = Math.acos(cosA);
        let asinA = Math.asin(sinA);
        let u = asinA > 0 ? acosA : Math.PI * 2 - acosA;
        u /= 2 * Math.PI;
        let texX = Math.floor(this.Img.W * u);
        let texY = Math.floor(this.Img.H * v);
        return this.Img.getPixel(texX, this.Img.H - texY - 1);
    }
}



