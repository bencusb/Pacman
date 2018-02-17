playground =
{
    "x" : 100,
    "y" : 100,
    "size": 200,
    "map":
     [
        "XXXXXXXXXXXXXXXXXX",
        "X................X",
        "X.....X..........X",
        "X.....X..........X",
        "X.....X..........X",
        "X.....XXXXXXXXXX.X",
        "X.....X........X.X",
        "X.....XXXXXXXXXX.X",
        "X................X",
        "XXXXXXXXXXXXXXXXXX"
     ]
};

function onLoad()
{
    // set update to 100 FPS (=10 millisec update time)
    window.setInterval(onDraw, 10);

    // access playground example
    console.log("log1=" + playground.map.length);
    console.log("log2=" + playground.map[0]);
}

function onDraw()
{
    // get canvas ctx and clear it
    var ctx = document.getElementById('canvas').getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw playground
    ctx.fillRect(playground.x, playground.y, playground.size, playground.size);
}