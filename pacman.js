playground =
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
		"XXXXXX.XX.XXXXXXXX.XX.XXXXXX",
		"X     ....XXXXXXXX....     X",
		"XXXXXX.XX.XXXXXXXX.XX.XXXXXX",
		"XXXXXX.XX..........XX.XXXXXX",
		"XXXXXX.XX.XXXXXXXX.XX.XXXXXX",
		"X............XX............X",
		"X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
		"X...XX.......O........XX...X",
		"XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
		"X......XX....XX....XX......X",
		"X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
		"X..........................X",
		"XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ]
};

function onLoad()
{
	window.setInterval(onDraw, 20);
}

function onDraw()
{
	var ctx = document.getElementById('canvas').getContext('2d')
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	cell_width = Math.round(ctx.canvas.width / playground.map[0].length);
	cell_height = Math.round(ctx.canvas.height / playground.map.length);
	for(var i = 0; i < playground.map.length; i++)
	{
		for(var l = 0; l < playground.map[i].length; l++)
		{
			if(playground.map[i][l] == 'X')	// wall
			{
				ctx.fillStyle = "#1111ff"
				ctx.fillRect(l*cell_width, i*cell_height, cell_width, cell_height);
			}
			else if(playground.map[i][l] == '.') // dot
			{
				ctx.fillStyle = "#111111"
				ctx.fillRect(l*cell_width + 2*cell_width/5 , i*cell_height + 2*cell_height/5, (cell_width)/5, (cell_height)/5);
			}
			else if(playground.map[i][l] == 'O') // pacman
			{
				ctx.fillStyle = "#ffff00"
				ctx.fillRect(l*cell_width, i*cell_height, cell_width, cell_height);
			}
		}
	}
	update();
}

function update()
{
	document.onkeydown = function(event) {
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
}
