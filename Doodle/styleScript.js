var context;
function init()
{
  context= myCanvas.getContext('2d');
  context.beginPath();
  context.fillStyle="#ff65bd";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  context.arc(100,100,20,0,Math.PI*2,true); context.closePath();
  context.fill();
}
