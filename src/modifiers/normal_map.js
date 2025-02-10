class nmap_mod extends mod
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

    planeNormal( Intr )    
    {
        this.Right = this.Up.cross(Intr.Normal).norm();
        this.Up = Intr.Normal.cross(this.Right);
        let Delta = Intr.InterPos.sub(Intr.Obj.Pos);

        let x = this.Right.dot(Delta) / this.W - Math.floor(this.Right.dot(Delta) / this.W);
        let y = this.Up.dot(Delta) / this.H - Math.floor(this.Up.dot(Delta) / this.H);
        let texX = Math.floor(this.Img.W * x);
        let texY = Math.floor(this.Img.H * y);
        let Color = this.Img.getPixel(texX, texY);
        let Norm = (Color.mulN(2)).sub(new vec3(1, 1, 1)).norm();
        return this.Right.mulN(Norm.X).add(this.Up.mulN(Norm.Y)).add(Intr.Normal.mulN(Norm.Z));
    }

    sphereNormal( Intr )
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
        let Color = this.Img.getPixel(texX, this.Img.H - texY - 1);
        let Norm = (Color.mulN(2)).sub(new vec3(1, 1, 1)).norm();
        let LRight = this.Up.cross(Intr.Normal).norm();
        let LUp = Intr.Normal.cross(LRight).norm();

        return LRight.mulN(Norm.X).add(LUp.mulN(Norm.Y)).add(Intr.Normal.mulN(Norm.Z));
    }
}