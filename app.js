var duckImage = new Image;
duckImage.src = 'duck.png';
duckImage.style.transform = "rotateY(180deg)";
var lakeImage = new Image;
lakeImage.src="lake.png"


var context = canvas.getContext("2d");
context.canvas.height = window.innerHeight;
context.canvas.width = window.innerWidth;
window.addEventListener("resize", function(){
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
});


options  = { context: context, width: 40, height: 40, image: duckImage, numberOfFrames: 3, ticksPerFrame: 8, loop: true };

function sprite(options){
  var that = {};
  that.dx = 100;
  that.dy = 100;
  that.direction = 'r';
  that.frameIndex = 0;
  that.tickCount = 0;
  that.ticksPerFrame = options.ticksPerFrame || 0;
  that.numberOfFrames = options.numberOfFrames || 1;
  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;

  that.render = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

      if(that.direction == 'l'){
        that.image.style.transform = "rotateY(180deg)";
      } else{
        that.image.style.transform = "rotateY(0deg)";
      }
      // Draw the animation
      that.context.drawImage(
         that.image,
         that.frameIndex * that.width,
         0,
         that.width,
         that.height,
         that.dx,
         that.dy,
         40,
         40);
  }
    that.loop = options.loop;

    that.update = function(){
        that.tickCount += 1;
        if(that.tickCount > that.ticksPerFrame){
          that.tickCount = 0;
          if (that.frameIndex < that.numberOfFrames - 1){
            that.frameIndex += 1;
          }
          else if(that.loop) {
            that.frameIndex = 0;
            }
          }
      }

  return that;

}
var duck = sprite(options)
function gameLoop () {
  window.requestAnimationFrame(gameLoop);
  duck.update();
  duck.render();
}


window.addEventListener("keydown", function(e){
  switch(e.key){
    case "ArrowRight":{
      duck.dx += 10;
      duck.context.scale(1,1);
      duck.direction = 'r';
      break;
    }
    case "ArrowLeft":{
      duck.dx -= 10;
      duck.direction = 'l';
      break;
    }
    case "ArrowUp":{
      duck.dy -= 8;
      break;
    }
    case "ArrowDown":{
      duck.dy += 8;
      break;
    }
  }
  duck.render();
})

window.onload = function(){gameLoop()}
