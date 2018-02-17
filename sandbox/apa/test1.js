points_state =
{
    "point_num": 1000,
    "max_speed": 2,
    "max_size": 10,
    "points": [],
    "width": 0,
    "height": 0
}

function initPoints()
{
    points_state.width = window.innerWidth;
    points_state.height = window.innerHeight;
    for( i=0; i<points_state.point_num; ++i)
    {
        points_state.points.push({"x": Math.random() * points_state.width
            , "y": Math.random() * points_state.height
            , "vx": (2*Math.random()-1) * points_state.max_speed
            , "vy": (2*Math.random()-1) * points_state.max_speed
            , "size": Math.random() * points_state.max_size});

    }
}

function onLoad()
{
    window.setInterval(onDraw, 20);
    initPoints();
}

function onDraw()
{
    // get and clear canvas
    points_state.width = window.innerWidth;
    points_state.height = window.innerHeight;
    var ctx = document.getElementById('canvas').getContext('2d')
    ctx.canvas.width  = points_state.width;
    ctx.canvas.height = points_state.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw points
    for( i=0; i<points_state.points.length; ++i)
        ctx.fillRect(points_state.points[i].x, points_state.points[i].y, points_state.points[i].size, points_state.points[i].size);

    // move points
    movePoints();
}

function movePoints()
{
    for( i=0; i<points_state.point_num; ++i)
    {
        points_state.points[i].x += points_state.points[i].vx;
        points_state.points[i].y += points_state.points[i].vy;
        if( points_state.points[i].x < 0 || points_state.points[i].x > points_state.width )
            points_state.points[i].vx = -points_state.points[i].vx;
        if( points_state.points[i].y < 0 || points_state.points[i].y > points_state.height )
            points_state.points[i].vy = -points_state.points[i].vy;
    }
}