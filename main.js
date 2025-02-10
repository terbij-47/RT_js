window.addEventListener("load", main, false);


function getRndVec3()
{
    return new vec3(Math.random(), Math.random(), Math.random());
}

function main()
{
    let ctx = new context(7);


    ctx.Scene.camSet(new vec3(0, 30, 35), new vec3(0, 1, 0), new vec3(0, -1.5, -1.51));

    let Positions = [new vec3(0, 15, 2), new vec3(180, 15, 2.5), new vec3(50, 20, 1.9), new vec3(73, 25, 1.4), new vec3(165, 11.3, 1.5), 
                     new vec3(243, 26, 4), new vec3(130, 23.32, 2.145), new vec3(259, 27.32, 2.145), new vec3(210, 37.32, 3.12),
                     new vec3(72, 11.432, 1.1), new vec3(88, 13.2, 1.3), new vec3(80, 10, 0.7), 
                     new vec3(-65, 50.432, 2.487), new vec3(-62.5, 46.2, 1.24), new vec3(-60, 55, 2.7411)];

    let Chess = new chess_mod(4, 4, new vec3(1, 0, 1));
    let Tex = new texture_mod(test_jpg.W / 50, test_jpg.H /50, test_jpg, new vec3(0, 1, 0), new vec3(1, 0, 0));
    let NormalMap = new nmap_mod(normaltest2_png.W / 15, normaltest2_png.H /15, normaltest2_png, new vec3(0, 1, 0.01), new vec3(1, 0, 1));

    let Surf2 = new surface(new vec3(0.9175, 0.9175, 0.9175), new vec3(0.61424, 0.61424, 0.61424), new vec3(0.727811, 0.727811, 0.727811), 76.8, 0.2, 0.7);
    Surf2 = new surface(new vec3(0.3, 0.3, 0.3), new vec3(0.7, 0.7, 0.7), new vec3(0.7, 0.7, 0.7), 10, 0, 1, 0); 
    ctx.Scene.add(new plane(new vec3(0, 1, 0), new vec3(0, 0, 0), Surf2, NormalMap));

    let Surf = new surface(new vec3(0.2, 0.2, 0.2), new vec3(0.4585475803546166, 0.11499765847245436, 0.8800172253319853), new vec3(0.5, 0.5, 0.5), 80, 0.3, 1, 0 );
    
    let Surf3 = new surface(new vec3(0.01, 0.01, 0.01), new vec3(0.02, 0.02, 0.02), new vec3(0.3, 0.3, 0.3), 15, 0.2, 1.1, 0.85);
    ctx.Scene.add(new sphere(new vec3(0, 8, 0), 8, Surf3));
    
    CoordSystem.cylindrical();
    for (let i = 0; i < Positions.length; i++)
    // for (let i = 0; i < 0; i++)
    {
        ctx.Scene.add(new sphere(Positions[i], Positions[i].Z, Surf));
    }
    CoordSystem.cartesian();
    
    // ctx.Scene.add(new dir_light(new vec3(-1, -5, -1), new vec3(1, 1, 1)));        
    ctx.Scene.add(new soft_light(new vec3(0, 18, 0), 1, new vec3(1, 1, 1)));
    // ctx.Scene.add(new point_light(new vec3(0, 18, 0), new vec3(1, 1, 1)));
    // ctx.Scene.add(new proj_light(new vec3(0, 18, 0), new vec3(1.5, -5, 0), 60));

    ctx.render();
    console.log('done');
}
