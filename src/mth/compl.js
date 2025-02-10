class compl
{
    Re; 
    Im;

    constructor( Re, Im = 0 )
    {
        this.Re = Re;
        this.Im = Im;
    }

    add( C1 )
    {
        return new compl(this.Re + C1.Re, this.Im + C1.Im);
    }

    sub( C1 )
    {
        return new compl(this.Re - C1.Re, this.Im - C1.Im);        
    }

    mul( C1 )
    {
        return new compl(this.Re * C1.Re - this.Im * C1.Im, this.Re * C1.Im + this.Im * C1.Re);
    }

    len(  )
    {
        return this.Re**2 + this.Im**2;
    }

    cgt(  )
    {
        return new compl(this.Re, -this.Im);
    }    

    div( C1 )
    {
        if (C1.len() == 0)
            return 0;
        return this.mul( C1.cgt());
    }
}
