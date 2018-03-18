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
		"X1    ....X      X....    2X",
		"XXXXXX.XX.XXX  XXX.XX.XXXXXX",
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
	"pacman": {"x": 13, "y": 17, "dir": "stop" , "opendir" : "opening", "mouth_pos" : 0.01},
	//"ghosts":{"x": 11,"y": 11, "dir": "stopped"},
	
	"ghosts2":	
	[{"x": 11,"y": 11, "dir": "stopped"},
	 {"x": 12,"y": 11, "dir": "stopped"},
	 {"x": 14,"y": 11, "dir": "stopped"},
	 {"x": 15,"y": 11, "dir": "stopped"}]
};

gameconfig = 
{
	"mouth_angle": {"up": Math.PI + Math.PI / 2, "left": Math.PI, "down": Math.PI / 2, "right" : 0 },
	"openmax" : 1.2
};

dirhelper = 
{
	"up": [0,-1],
	"down": [0,1],
	"left": [1,0],
	"right": [-1,0],
	"stopped": [0,0]
};

function onLoad()
{
	window.setInterval(onTick, 15);
	document.onkeydown = onKeyDown;
	document.onkeyup = onKeyUp;
	score = 0;
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
	updateGhosts2();

	draw();
	//console.log( gamestate.keys );
}

function updatePacman()
{
	var speed = 0.125;
	row = Math.round(gamestate.pacman.y)
	col = Math.round(gamestate.pacman.x)
	isColAlighned = (Math.abs(gamestate.pacman.x - col) < 0.05);
	isRowAlighned = (Math.abs(gamestate.pacman.y - row) < 0.05);
	
	if( isColAlighned )
	{
		if( gamestate.keys.W_pressed && gamestate.map[row-1][col] != 'X')
			gamestate.pacman.dir = "up";
		if( gamestate.keys.S_pressed && gamestate.map[row+1][col] != 'X')
			gamestate.pacman.dir = "down";
	}
	
	if( isRowAlighned )
	{
		if( gamestate.keys.A_pressed && gamestate.map[row][col-1] != 'X')
			gamestate.pacman.dir = "left";
		if( gamestate.keys.D_pressed && gamestate.map[row][col+1] != 'X')
			gamestate.pacman.dir = "right";
	}
		
	if( gamestate.pacman.dir == "up" && (!isRowAlighned || gamestate.map[row-1][col] != 'X' ))
		gamestate.pacman.y -= speed;
	if( gamestate.pacman.dir == "down" && (!isRowAlighned || gamestate.map[row+1][col] != 'X'))
		gamestate.pacman.y += speed;

	if( gamestate.pacman.dir == "left" && (!isColAlighned || gamestate.map[row][col-1] != 'X'))
		gamestate.pacman.x -= speed;
	if( gamestate.pacman.dir == "right" && (!isColAlighned || gamestate.map[row][col+1] != 'X'))
		gamestate.pacman.x += speed;

	if(gamestate.map[row][col] == '.')
	{
		score += 1;
		console.log(score);
		gamestate.map[row] = gamestate.map[row].substr(0,col) + ' ' + gamestate.map[row].substr(col+1);	
	}
	
	if(gamestate.pacman.opendir == "opening" && gamestate.pacman.mouth_pos < gameconfig.openmax)gamestate.pacman.mouth_pos += 0.1;
	else if(gamestate.pacman.mouth_pos > 0.1)
	{	
		gamestate.pacman.mouth_pos -= 0.1;
		gamestate.pacman.opendir = "closing";
	}
	else gamestate.pacman.opendir = "opening";
	
	if(gamestate.map[row][col] == "1")
	{
		gamestate.pacman.x = 25;
	}
	if(gamestate.map[row][col] == "2")
	{
		gamestate.pacman.x = 2;
	}
}

function updateGhosts2()
{	
	var speed = 0.1;
	//var speed = 0.125;	
	for(var i = 0;i < gamestate.ghosts2.length; i++)
	{
		var row = Math.round(gamestate.ghosts2[i].y)
		var col = Math.round(gamestate.ghosts2[i].x)	
		var isAlighned = (Math.abs(gamestate.ghosts2[i].x - col) < 0.05) && (Math.abs(gamestate.ghosts2[i].y - row) < 0.05);
		var rand = Math.random() * 10;
	
		if( isAlighned )
		{
			var x_ahead = col + dirhelper[gamestate.ghosts2[i].dir][0];
			var y_ahead = row + dirhelper[gamestate.ghosts2[i].dir][1];
			if(gamestate.map[y_ahead][x_ahead] == "X")
				gamestate.ghosts2[i].dir = "stopped";
			
			if( rand < 1 )
				gamestate.ghosts2[i].dir = "stopped";
		}
	
		gamestate.ghosts2[i].x += speed * dirhelper[gamestate.ghosts2[i].dir][0];
		gamestate.ghosts2[i].y += speed * dirhelper[gamestate.ghosts2[i].dir][1];	
		
		if(gamestate.ghosts2[i].dir == "stopped")
		{
			if(rand >= 2)gamestate.ghosts2[i].dir = "up";
			if(rand >= 4)gamestate.ghosts2[i].dir = "down";
			if(rand >= 6)gamestate.ghosts2[i].dir = "left";
			if(rand >= 8)gamestate.ghosts2[i].dir = "right";
			//console.log(gamestate.ghost2[i].dir);
		}
	}	
}

function draw()
{
	// clear canvas
	var ctx = document.getElementById('canvas').getContext('2d')	
	var cell_width = Math.round(ctx.canvas.width / gamestate.map[0].length);
	var cell_height = Math.round(ctx.canvas.height / gamestate.map.length);	
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
    // draw map	
	drawMap(ctx, cell_width, cell_height);
	
	// draw pacman
	drawPacman(ctx, cell_width, cell_height);
			
	// draw ghosts
	drawGhosts2(ctx, cell_width, cell_height);
	
	if(score == 248)
	{
		ctx.fillStyle = "#fff";
		ctx.font = "90px Arial";
		ctx.fillText("Victory",200,320);
	}
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
				ctx.fillStyle = "#ffe6e6"
				ctx.fillRect(l*cell_width + 2*cell_width/5 , i*cell_height + 2*cell_height/5, (cell_width)/5, (cell_height)/5);
			}
		}
	}
}

function drawPacman(ctx, cell_width, cell_height)
{
	if(gamestate.pacman.dir == "stop")
	{
		drawPacmanShape(ctx, cell_width, cell_height , 0  , 0.001 )
	}
	else 
	{
		drawPacmanShape(ctx, cell_width, cell_height , gameconfig.mouth_angle[gamestate.pacman.dir], gamestate.pacman.mouth_pos )
	}
}

function drawPacmanShape(ctx, cell_width, cell_height , alpha , beta)
{
	var x = gamestate.pacman.x*cell_width + cell_width / 2;
	var y = gamestate.pacman.y*cell_height  + cell_height / 2;
	
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.arc(x, y, cell_width / 3,alpha+beta, alpha-beta ,false);
	ctx.lineTo(x,y);
	ctx.fillStyle = "#ffff00";
	ctx.strokeStyle="#ffff00";
	ctx.stroke();
	ctx.fill();
}

function drawGhosts2(ctx, cell_width, cell_height)
{
	for(var i = 0; i < gamestate.ghosts2.length; i++)
	{	
		var x = gamestate.ghosts2[i].x*cell_width;
		var y = gamestate.ghosts2[i].y*cell_height;
		ctx.fillStyle = "#7799ff"
		ctx.fillRect( x, y , cell_width, cell_height);
	}
}