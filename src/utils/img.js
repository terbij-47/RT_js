class img
{
    W; H; C; Data; Format;

    constructor(w, h, Format, data)
    {
        this.W = w; this.H = h; this.Data = data;
        this.C = data.length / (w * h);
        this.Format = Format;
        console.log(w, h, this.C, this.Format);
    }

    getPixel(x, y)
    {
        // let offset = (x + y * this.W) * this.C;
        let offset;
        if (this.C == 3)
            switch (this.Format.toLowerCase())
            {
            case 'png':
                offset = ((x) + (this.H - y - 1) * this.W) * this.C;
                return new vec3(this.Data[offset + 2], this.Data[offset + 1], this.Data[offset]); 
            default:   // bmp, jpg
                offset = ((x) + (this.H - y - 1) * this.W) * this.C;
                return new vec3(this.Data[offset], this.Data[offset + 1], this.Data[offset + 2]); 
            }
        return new vec3(0.4, 0.7, 0.1);       
    }
}

class model
{
    NumOfPrims; Prims;
    Transform;
    MinBB; MaxBB;

    constructor()
    {
        // later
    }
}
