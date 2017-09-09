
var canvas;
var g;
var width;
var height;
var img = new Image;
var img_url;
var border_width;
var eat_width;
var outer_color;
var inner_color;

function repaint(source)
{
	refresh_attributes();
	resize_canvas();
	clear_canvas();
	draw_puzzle();
	draw_border();
}

function refresh_attributes()
{
	canvas = document.getElementById("canvas");
	g = canvas.getContext('2d');
	width = Number(document.getElementById("width").value);
	height = Number(document.getElementById("height").value);
	var url = document.getElementById("img_url").value;
	if (url != img_url)
	{
		img_url = url;
		img.src = url;
		img.onload = function ()
		{
			repaint();
		}
	}
	border_width = Number(document.getElementById("border_width").value);
	eat_width = Number(document.getElementById("eat_width").value);
	outer_color = document.getElementById("outer_color").value;
	inner_color = document.getElementById("inner_color").value;
}

function resize_canvas()
{
	canvas.width = width;
	canvas.height = height;
}

function clear_canvas()
{
	g.fillStyle = "#000";
	g.fillRect(0, 0, width, height);
}

function draw_puzzle()
{
	var real_width = width - (border_width - eat_width)*2;
	var real_height = height - (border_width - eat_width)*2;
	var sx = border_width - eat_width;
	var sy = border_width - eat_width;
	console.log(real_width);
	console.log(width+border_width);
	console.log(border_width);
	g.drawImage(img, sx, sy, real_width, real_height);
}

function draw_border()
{
	var w = border_width - eat_width;
	// corner use radial gradient
	var rg = g.createRadialGradient(w, w, w*1.5, w, w, 0);
	rg.addColorStop(0, outer_color);
	rg.addColorStop(0.7, outer_color);
	rg.addColorStop(1, inner_color);
	g.fillStyle = rg;
	g.fillRect(0, 0, w, w);
	g.translate(width-w-w, 0);
	g.fillRect(w, 0, w, w);
	g.translate(-(width-w-w), height-w-w);
	g.fillRect(0, w, w, w);
	g.translate(width-w-w, 0);
	g.fillRect(w, w, w, w);
	g.translate(-(width-w-w), -(height-w-w));
	// other use linear gradient
	var lg;
	
		lg = g.createLinearGradient(0, 0, 0, w);
		lg.addColorStop(0, outer_color);
		lg.addColorStop(0.5, outer_color);
		lg.addColorStop(1, inner_color);
		g.fillStyle = lg;
		g.fillRect(w, 0, width-w-w, w);
		lg = g.createLinearGradient(0, height-w, 0, height);
		lg.addColorStop(1, outer_color);
		lg.addColorStop(0.5, outer_color);
		lg.addColorStop(0, inner_color);
		g.fillStyle = lg;
		g.fillRect(w, height-w, width-w-w, w);
	
	{	
		lg = g.createLinearGradient(0, 0, w, 0);
		lg.addColorStop(0, outer_color);
		lg.addColorStop(0.5, outer_color);
		lg.addColorStop(1, inner_color);
		g.fillStyle = lg;
		g.fillRect(0, w, w, height-w-w);
		lg = g.createLinearGradient(width-w, 0, width, 0);
		lg.addColorStop(1, outer_color);
		lg.addColorStop(0.5, outer_color);
		lg.addColorStop(0, inner_color);
		g.fillStyle = lg;
		g.fillRect(width-w, w, w, height-w-w);
	}
}