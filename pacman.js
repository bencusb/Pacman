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
	"keys": {"W_pressed": false, "S_pressed":false,"A_pressed":false,"D_pressed":false},
	"pacman": {"x": 13, "y": 17, "dir": "up"}
};

function onLoad()
{
	window.setInterval(onTick, 15);
	document.onkeydown = onKeyDown;
	document.onkeyup = onKeyUp;
}

function onKeyDown(event) 
{	
	var key_press = String.fromCharCode(event.keyCode);
	var key_code = event.keyCode;	
	if(key_press == "W") gamestate.keys.W_pressed=true;
	if(key_press == "S") gamestate.keys.S_pressed=true;
	if(key_press == "A") gamestate.keys.A_pressed=true;
	if(key_press == "D") gamestate.keys.D_pressed=true;
}

function onKeyUp(event)
{
	var key_press = String.fromCharCode(event.keyCode);
	var key_code = event.keyCode;
	if(key_press == "W") gamestate.keys.W_pressed=false;
	if(key_press == "S") gamestate.keys.S_pressed=false;
	if(key_press == "A") gamestate.keys.A_pressed=false;
	if(key_press == "D") gamestate.keys.D_pressed=false;
}

function onTick()
{
	updatePacman();
	updateGhosts();
	draw();
	
	//console.log( gamestate.keys );
}

function updatePacman()
{
	var speed = 0.1;
	
	if( gamestate.keys.W_pressed )
		gamestate.pacman.dir = "up";
	if( gamestate.keys.S_pressed )
		gamestate.pacman.dir = "down";
	if( gamestate.keys.A_pressed )
		gamestate.pacman.dir = "left";
	if( gamestate.keys.D_pressed )
		gamestate.pacman.dir = "right";
	
	if( gamestate.pacman.dir == "up" )
		gamestate.pacman.y -= speed;
	if( gamestate.pacman.dir == "down" )
		gamestate.pacman.y += speed;
	if( gamestate.pacman.dir == "left" )
		gamestate.pacman.x -= speed;
	if( gamestate.pacman.dir == "right" )
		gamestate.pacman.x += speed;
	
	//row = Math.round(gamestate.pacman.y)
	//col = Math.round(gamestate.pacman.x)
	//gamestate.map[row] = gamestate.map[row].substr(0,col) + ' ' + gamestate.map[row].substr(col+1);
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


