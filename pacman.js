playground =
{
    "map":
	[
		"----------------------------",
		"-____________--____________-",		
		"-_----_-----_--_-----_----_-",
		"-_----_-----_--_-----_----_-",
		"-__________________________-",
		"-_----_--_--------_--_----_-",
		"-______--____--____--______-",
		"------_-----_--_-----_------",
		"------_-----_--_-----_------",
		"------_--__________--_------",
		"------_--_--------_--_------",
		"__________--------__________",
		"------_--_--------_--_------",
		"------_--__________--_------",
		"------_--_--------_--_------",
		"-____________--____________-",
		"-_----_-----_--_-----_----_-",
		"-___--________________--___-",
		"---_--_--_--------_--_--_---",
		"-______--____--____--______-",
		"-_----------_--_----------_-",
		"-__________________________-",
		"----------------------------"
    ]
};

function onLoad()
{
	window.setInterval(onDraw, 50);
}

function onDraw()
{
	var ctx = document.getElementById('canvas').getContext('2d')
	ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	cell_width = Math.round(ctx.canvas.width / playground.map[0].length);
	cell_height = Math.round(ctx.canvas.height / playground.map.length);
	for(var i = 0; i < playground.map.length; i++)
	{
		for(var l = 0; l < playground.map[i].length; l++)
		{
			if(playground.map[i][l] == '-')
			{
				ctx.fillRect(l*cell_width, i*cell_height, cell_width, cell_height);
			}
		}
	}
}
