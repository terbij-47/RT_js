class context
{
    Canvas;
    Context;
    W;
    H;
    ImageData;
    Scene;

    constructor( RecLevelMax )
    {
        this.Canvas = document.getElementById('canvas');
        this.H = this.Canvas.height;
        this.W = this.Canvas.width;
        this.Context = this.Canvas.getContext("2d"); 
        
        this.Context.fillStyle = `rgba(${0}, ${0}, ${0}, ${1})`;
        this.Context.fillRect(0, 0, this.W, this.H);
    
        this.ImageData = this.Context.getImageData(0, 0, this.W, this.H);
        for (let i = 0; i < this.ImageData.data.length; i++)
        this.ImageData[i] = 0;    
    
        this.Scene = new scene(RecLevelMax);
    }

    putPixel( x, y, eColor )
    {
        eColor.X = Math.min(Math.max(eColor.X, 0), 1);
        eColor.Y = Math.min(Math.max(eColor.Y, 0), 1);
        eColor.Z = Math.min(Math.max(eColor.Z, 0), 1);
    
        this.ImageData.data[(y * this.W + x) * 4] = Math.round(eColor.X * 255);
        this.ImageData.data[(y * this.W + x) * 4 + 1] = Math.round(eColor.Y * 255);
        this.ImageData.data[(y * this.W + x) * 4 + 2] = Math.round(eColor.Z * 255);
    } 
    
    setImage(  )
    {
        this.Context.putImageData(this.ImageData, 0, 0);
    }

    render()
    {
        // this.setImage();
        // return;

        let Right = this.Scene.CamRight;
        let Up = this.Scene.CamUp;
        let Loc = this.Scene.CamLoc;
        let ViewPoint = this.Scene.RaysPointStart;
        let Scale = this.Scene.ProjSize;

        for (let x = 0; x < this.W; x++)
            for (let y = 0; y < this.H; y++)
            {                
                let PStart1 = new vec3((x + 0.25 - this.W / 2) / Scale, (-y - 0.25 + this.H / 2) / Scale);                
                let PStart2 = new vec3((x + 0.25 - this.W / 2) / Scale, (-y - 0.75 + this.H / 2) / Scale); 
                let PStart3 = new vec3((x + 0.75 - this.W / 2) / Scale, (-y - 0.25 + this.H / 2) / Scale); 
                let PStart4 = new vec3((x + 0.75 - this.W / 2) / Scale, (-y - 0.75 + this.H / 2) / Scale);
                
                PStart1 = Right.mulN((x + 0.25 - this.W / 2) / Scale).add(Up.mulN((-y - 0.25 + this.H / 2) / Scale)).add(Loc);
                PStart2 = Right.mulN((x + 0.25 - this.W / 2) / Scale).add(Up.mulN((-y - 0.75 + this.H / 2) / Scale)).add(Loc);
                PStart3 = Right.mulN((x + 0.75 - this.W / 2) / Scale).add(Up.mulN((-y - 0.25 + this.H / 2) / Scale)).add(Loc);
                PStart4 = Right.mulN((x + 0.75 - this.W / 2) / Scale).add(Up.mulN((-y - 0.75 + this.H / 2) / Scale)).add(Loc);
                
                let Ray1 = new ray(PStart1, PStart1.sub(ViewPoint));
                let Ray2 = new ray(PStart2, PStart2.sub(ViewPoint));
                let Ray3 = new ray(PStart3, PStart3.sub(ViewPoint));
                let Ray4 = new ray(PStart4, PStart4.sub(ViewPoint));

                let col = this.Scene.trace(Ray1).add(this.Scene.trace(Ray2).add(this.Scene.trace(Ray3).add(this.Scene.trace(Ray4)))).mulN(0.25);

                // let tmp = this.Scene.trace(Ray);
                this.putPixel(x, y, col);
               
            }
        this.setImage();                         
    }
}
