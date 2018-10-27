function anim1(path) {
  path.style.transitionDelay = `${Math.random() * 200}ms`;
  path.style.transformOrigin = `${Math.random() * 50 + 25}% 0%`;
  path.style.transform = `scale(0) rotate(${Math.random() * 100 - 50}deg)`;
  path.style.fill = '#777';
  path.style.stroke = '#555';
}

function reset1(path) {
  path.style.transitionDelay = 0;
  path.style.transformOrigin = `50%`;
  path.style.transform = `scale(1) rotate(0)`;
  path.style.fill = '#273439';
  path.style.stroke = '#273439';
}

function anim2(path, i) {
  path.style.transitionDuration = '1000ms';
  path.style.transitionDelay = `${i * 50}ms`;
  path.style.transformOrigin = `50%`;
  path.style.transform = `scale(0) translateX(${100 + i * 20}px)`;
  path.style.fill = '#777';
  path.style.stroke = '#555';
}
function reset2(path) {
  path.style.transitionDuration = 0;
  path.style.transitionDelay = 0;
  path.style.transformOrigin = `50%`;
  path.style.transform = `scale(1) translateX(0)`;
  path.style.fill = '#273439';
  path.style.stroke = '#273439';
}

const anims = [anim1, anim2, anim1],
      resets = [reset1, reset2, reset1],
      buttons = Array.from(document.querySelectorAll('.button')),
      refresh = document.querySelector('.refresh')
buttons.forEach((button, i) => {
  const submit = button.querySelector('.submit');
  let paths = button.querySelectorAll('path')
  submit.addEventListener('click', () => {
    paths.forEach((path, j) => {
      anims[i](path, j);
    });
    submit.style.backgroundColor = 'transparent';
    submit.style.opacity = '0';
  })
})

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

onload = function (){
  setTimeout(init,0)
}

init = function(){
  canvas = document.querySelector('canvas')
  ctx = canvas.getContext('2d')

  onresize = function(){
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }
  onresize()

  mouse = {x:canvas.width/2,y:canvas.height/2,out:false}

  canvas.onmouseout = function(){
    mouse.out = true
  }

  canvas.onmousemove = function(e){
    var rect = canvas.getBoundingClientRect()
    mouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      out: false
    }
  }

  gravityStrength = 10
  particles = []
  spawnTimer = 0
  spawnInterval = 10
  type = 0
  requestAnimationFrame(startLoop)
}

newParticle = function(){
  type = type?0:1
  particles.push({
    x:mouse.x,
    y:mouse.y,
    xv:type?18*Math.random()-9:24*Math.random()-12,
    yv:type?18*Math.random()-9:24*Math.random()-12,
    c:'rgb(255,255,255)',
    s:type?2+10*Math.random():1,
    a:1
  })
}

startLoop = function(newTime){
  time = newTime
  requestAnimationFrame(loop)
}

loop = function(newTime){
  draw()
  calculate(newTime)
  requestAnimationFrame(loop)
}

draw = function(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  for(var i=0;i<particles.length;i++){
    var p = particles[i]
    ctx.globalAlpha = p.a
    ctx.fillStyle = p.c
    ctx.beginPath()
    ctx.arc(p.x,p.y,p.s,0,2*Math.PI)
    ctx.fill()
  }
}

calculate = function(newTime){
  var dt = newTime-time
  time = newTime

  if(!mouse.out){
    spawnTimer += (dt<100)?dt:100
    for(;spawnTimer>0;spawnTimer-=spawnInterval){
      newParticle()
    }
  }

  particleOverflow = particles.length-700
  if(particleOverflow>0){
    particles.splice(0,particleOverflow)
  }

  for(var i=0;i<particles.length;i++){
    var p = particles[i]
    if(!mouse.out){
      x = mouse.x-p.x
      y = mouse.y-p.y
      a = x*x+y*y
      a = a>100?gravityStrength/a:gravityStrength/100
      p.xv = (p.xv+a*x)*0.99
      p.yv = (p.yv+a*y)*0.99
    }
    p.x += p.xv
    p.y += p.yv
    p.a *= 0.99
  }
}
