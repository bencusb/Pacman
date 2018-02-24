gamestate =
{
    "map":
	[
		"XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"X............XX............X",
		"X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
		"X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
		"X..........................X",
		"X.XXXX.XX.XXXXXXXX.XX.XXXX.X",
		"X......XX....XX....XX......X",
		"XXXXXX.XXXXX.XX.XXXXX.XXXXXX",
		"XXXXXX.XXXXX.XX.XXXXX.XXXXXX",
		"XXXXXX.XX..........XX.XXXXXX",
		"XXXXXX.XX.XXX  XXX.XX.XXXXXX",
		"X     ....X      X....     X",
		"XXXXXX.XX.XXXXXXXX.XX.XXXXXX",
		"XXXXXX.XX..........XX.XXXXXX",
		"XXXXXX.XX.XXXXXXXX.XX.XXXXXX",
		"X............XX............X",
		"X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
		"X...XX................XX...X",
		"XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
		"X......XX....XX....XX......X",
		"X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
		"X..........................X",
		"XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ],
	"pacman": {"x": 1, "y": 1}
};

function onLoad()
{
	window.setInterval(onTick, 20);
	document.onkeydown = onKeyDown;
}

function onKeyDown(event) 
{
	var key_press = String.fromCharCode(event.keyCode);
	var key_code = event.keyCode;
	if(key_press == "W"){
		console.log("w");
	} else if(key_press == "S") {
		console.log("s");
	} else if(key_press == "A") {
		console.log("a");
	} else if(key_press == "D") {
		console.log("d");
	}
}

function onTick()
{
	updatePacman();
	updateGhosts();
	draw();
}

function updatePacman()
{
	gamestate.pacman.x += 0.05;
}

function updateGhosts()
{
}

function draw()
{
	// clear canvas
	var ctx = document.getElementById('canvas').getContext('2d')	
	var cell_width = Math.round(ctx.canvas.width / gamestate.map[0].length);
	var cell_height = Math.round(ctx.canvas.height / gamestate.map.length);
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // draw map	
	drawMap(ctx, cell_width, cell_height)
	
	// draw pacman
	drawPacman(ctx, cell_width, cell_height)
	
	// draw ghosts
}

function drawMap(ctx, cell_width, cell_height)
{	
	for(var i = 0; i < gamestate.map.length; i++)
	{
		for(var l = 0; l < gamestate.map[i].length; l++)
		{
			if(gamestate.map[i][l] == 'X')	// wall
			{
				ctx.fillStyle = "#1111ff"
				ctx.fillRect(l*cell_width, i*cell_height, cell_width, cell_height);
			}
			else if(gamestate.map[i][l] == '.') // dot
			{
				ctx.fillStyle = "#111111"
				ctx.fillRect(l*cell_width + 2*cell_width/5 , i*cell_height + 2*cell_height/5, (cell_width)/5, (cell_height)/5);
			}
		}
	}
}

function drawPacman(ctx, cell_width, cell_height)
{
	ctx.fillStyle = "#ffff11"
	ctx.fillRect(gamestate.pacman.x*cell_width, gamestate.pacman.y*cell_height, cell_width, cell_height);	
}


