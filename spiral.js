var canvas=document.getElementById("canvas");

//SCREENW = 300;
//SCREENH = 300;
SCREENW = 400;
SCREENH = 400;

var ctx = canvas.getContext("2d");
var center_x = SCREENW/2;
var center_y = SCREENH/2;

function reset() {
    canvas.setAttribute('width',SCREENW);
    canvas.setAttribute('height',SCREENH);
    ctx.translate(center_x,center_y);
}

var colors = ['rgb(255,0,0)','rgb(0,128,0)','rgb(255,0,255)'];
function colorstring(r,g,b) {
    return 'rgb(' + [Math.floor(r),Math.floor(g),Math.floor(b)].join(',') + ')';
}

var smoothness = 10;
var numspirals = 5;
function drawSpiral() {
    //ctx.clearRect(0,0,SCREENW,SCREENH);
    
    
    var step = (2 * Math.PI)/smoothness;
    var rotations = 7;
    var time = new Date().getTime();
    var ebb = Math.sin( time/10000 );
    var ebb2 = 1 - Math.cos( time/1000 )/2;
    //ctx.strokeStyle = colorstring( 128 + ebb * 128, ebb2 * 128, ebb2 * -128 + 255 );
    

    var radial_fun = function(x) { return 20 * x; };
    for (var j=0; j<numspirals; j++) {

	var startangle = 2 * Math.PI / numspirals * j;
	//ctx.strokeStyle = colors[j];
	ctx.moveTo(0, 0);
	ctx.beginPath();
	for (var i=0;
             i <= 2*Math.PI * rotations + startangle;
             i = i + step) 
	{
	    var width = Math.pow(i, .3) / 10;
	    //console.log('width',width);
	    //ctx.lineWidth = width;
	    ctx.lineWidth = 4;
            var theta = i;
            var x = radial_fun(theta) * Math.cos(theta - startangle);
            var y = radial_fun(theta) * Math.sin(theta - startangle);
            ctx.lineTo(x, y);
	}
	ctx.stroke();
	ctx.closePath();
	
    }
}

var speed = 0.1;
document.getElementById('slider').value = 50 + (speed * 50);
document.getElementById('smooth_slider').value = smoothness;
document.getElementById('smooth_slider').value = numspirals;
document.getElementById('slider').addEventListener('change', function(evt) {
						       var newspeed = evt.target.value;
						       speed = (newspeed - 50) / 100;
						   });
document.getElementById('smooth_slider').addEventListener('change', function(evt) {
						       smoothness = evt.target.value;

						   });
document.getElementById('num_slider').addEventListener('change', function(evt) {
						       numspirals = evt.target.value;
						   });

var startangle = 0;
var ctr = 0;

setInterval( function() {
		 var time = new Date().getTime();

		 reset();
		 ctx.rotate(-Math.PI/100 * ctr);
                 drawSpiral(6);
                 //startangle = startangle + Math.PI/100;
		 ctr = ctr + Math.PI * speed;
             },
             10
           );
