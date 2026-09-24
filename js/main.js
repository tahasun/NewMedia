(function(){
"use strict";
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim();}


/* ---------- Crystals: p5.js loaded on demand, instance mode ---------- */
(function crystals(){
  var stage=document.getElementById("crystal-stage"), status=document.getElementById("crystal-status"), btn=document.getElementById("crystal-new");
  var inst=null, loading=false;
  function load(){
    if(loading)return; loading=true; status.textContent="Loading p5.js…";
    var s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js";
    s.onload=start;
    s.onerror=function(){status.textContent="p5.js couldn't load. Check your connection and reload the page.";};
    document.head.appendChild(s);
  }
  function start(){
    status.remove();
    inst=new p5(function(p){
      var PALETTE, SIDES=6, SIZE, layers=[], shown=0, timer;
      function pal(){return p.random(PALETTE);}
      function half(){return p.random(1)>0.5;}
      function hexagon(r){p.beginShape();for(var i=0;i<6;i++){p.vertex(r*p.cos(i*60),r*p.sin(i*60));}p.endShape(p.CLOSE);}
      function outline(){var col=pal(),w=half()?1:3,hex=half();return function(){p.noFill();p.stroke(col);p.strokeWeight(w);hex?hexagon(SIZE/2):p.ellipse(0,0,SIZE,SIZE);};}
      function rings(){var col=pal(),n=SIDES,sz=(SIZE/2)*0.93,pos=(SIZE/2)-(sz/2);return function(){p.noFill();p.stroke(col);p.strokeWeight(1);for(var i=0;i<n;i++){p.ellipse(pos,0,sz,sz);p.rotate(360/n);}};}
      function spokes(){var steps=half()?8:10,step=(SIZE/2)/steps,a=p.floor(p.random(0,steps)),b=p.floor(p.random(a+1,steps+1)),n=half()?SIDES:SIDES/2,col=pal(),w=half()?3:5;
        return function(){p.stroke(col);p.strokeWeight(w);for(var i=0;i<n;i++){p.line(a*step,0,b*step,0);p.rotate(360/n);}};}
      function triangles(){var steps=half()?8:10,step=(SIZE/2)/steps,a=p.floor(p.random(1,steps-2)),b=p.floor(p.random(a+1,steps)),n=half()?SIDES:SIDES/2,col=pal(),w=half()?1:3,filled=p.random(1)>0.6;
        return function(){filled?p.fill(col):p.noFill();p.stroke(col);p.strokeWeight(w);for(var i=0;i<n;i++){p.triangle(a*step,0,b*step,-step*0.9,b*step,step*0.9);p.rotate(360/n);}};}
      function dots(){var col=pal(),r=p.random(SIZE*0.12,SIZE*0.42),n=p.random([12,18,24]),d=p.random([4,6,8]);
        return function(){p.noStroke();p.fill(col);for(var i=0;i<n;i++){p.circle(r,0,d);p.rotate(360/n);}};}
      function build(){
        layers=[];
        if(p.random(1)>0.3)layers.push(outline());
        if(p.random(1)>0.3)layers.push(spokes());
        if(p.random(1)>0.5)layers.push(rings());
        if(p.random(1)>0.3)layers.push(triangles());
        if(p.random(1)>0.4)layers.push(dots());
        if(layers.length<2){layers.unshift(outline());layers.push(spokes());}
      }
      function render(){p.background(255);p.push();p.translate(p.width/2,p.height/2);for(var i=0;i<shown;i++){p.push();layers[i]();p.pop();}p.pop();}
      p.regrow=function(){clearTimeout(timer);build();if(reduce){shown=layers.length;render();return;}shown=0;render();
        (function next(){shown++;render();if(shown<layers.length)timer=setTimeout(next,280);})();};
      p.setup=function(){
        var w=Math.min(stage.clientWidth||320,420);
        p.pixelDensity(Math.min(window.devicePixelRatio||1,2));
        p.createCanvas(w,w).parent(stage); p.angleMode(p.DEGREES); p.noLoop();
        SIZE=w*0.82;
        PALETTE=[p.color(18,153,214),p.color(228,9,124),p.color(25,23,46),p.color(240,200,0)];
        p.regrow();
      };
      p.draw=function(){};
    });
  }
  function regrow(){if(inst&&inst.regrow)inst.regrow();else load();}
  stage.addEventListener("click",regrow); btn.addEventListener("click",regrow);
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){load();io.disconnect();}},{rootMargin:"300px 0px"});
    io.observe(stage);
  } else load();
})();

/* ---------- Housing: hex bins loaded from JSON ---------- */
(function housing(){
  var RANGE=[[255,255,204],[255,237,160],[254,217,118],[254,178,76],[253,141,60],[252,78,42],[227,26,28],[189,0,38],[128,0,38]];
  var ramp=document.getElementById("ramp");
  RANGE.forEach(function(c){var i=document.createElement("i");i.style.background="rgb("+c+")";ramp.appendChild(i);});
  var cv=document.getElementById("hex-canvas"), ctx=cv.getContext("2d"), out=document.getElementById("hex-readout");
  var S3=Math.sqrt(3);
  var HEX=[], order=[], byValue=[];
  var sel=null, W,H,sc,ox,oy;
  var minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;

  function color(v){var i=Math.min(8,Math.max(0,Math.floor((v-15)/(500-15)*9)));return RANGE[i];}
  function hexPath(cx,cy,r){ctx.beginPath();for(var i=0;i<6;i++){var a=Math.PI/180*(60*i-30);var px=cx+r*Math.cos(a),py=cy+r*Math.sin(a);i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();}
  function layout(){
    var dpr=Math.min(window.devicePixelRatio||1,2); W=cv.clientWidth||320; H=Math.round(W*1.1);
    cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr); cv.style.height=H+"px"; ctx.setTransform(dpr,0,0,dpr,0,0);
    var pad=16, top=24; sc=Math.min((W-2*pad)/(maxX-minX+2),(H-pad-top)/(maxY-minY+2));
    ox=pad+(W-2*pad-(maxX-minX)*sc)/2-minX*sc; oy=top+(H-pad-top-(maxY-minY)*sc)/2-minY*sc;
    draw();
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    var r=sc*0.96;
    order.forEach(function(h){
      var cx=ox+h.x*sc, cy=oy+h.y*sc, c=color(h[3]), ht=Math.max(1,(h[4]-10)/77*sc*2.2);
      var d="rgb("+c.map(function(v){return Math.round(v*0.62);})+")";
      for(var k=0;k<ht;k+=1){hexPath(cx,cy-k,r);ctx.fillStyle=d;ctx.fill();}
      hexPath(cx,cy-ht,r); ctx.fillStyle="rgb("+c+")"; ctx.fill();
      h.sx=cx; h.sy=cy-ht;
    });
    if(sel){hexPath(sel.sx,sel.sy,sc*1.05);ctx.lineWidth=2.5;ctx.strokeStyle=css("--ink");ctx.stroke();}
  }
  function describe(h){
    out.textContent="Homes here had a median value of about $"+h[3]+"k, and households earned about $"+h[4]+"k. That's "+h[2].toLocaleString()+" block group"+(h[2]===1?"":"s")+", "+h[5].toLocaleString()+" people.";
  }
  function pick(e){
    var b=cv.getBoundingClientRect(), x=e.clientX-b.left, y=e.clientY-b.top, best=null, bd=Infinity;
    for(var i=order.length-1;i>=0;i--){var h=order[i],d=(h.sx-x)*(h.sx-x)+(h.sy-y)*(h.sy-y);if(d<bd){bd=d;best=h;}}
    if(best&&bd<Math.pow(sc*2.2,2)){sel=best;draw();describe(best);}
  }
  cv.addEventListener("click",pick);
  cv.addEventListener("keydown",function(e){
    if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft"&&e.key!=="ArrowUp"&&e.key!=="ArrowDown")return;
    e.preventDefault(); var i=sel?byValue.indexOf(sel):-1; var up=(e.key==="ArrowRight"||e.key==="ArrowUp");
    i=up?Math.min(byValue.length-1,i+1):Math.max(0,(i<0?byValue.length:i)-1); sel=byValue[i]; draw(); describe(sel);
  });
  var rt;window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(layout,120);});
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",draw);

  // Fetch housing data from JSON
  fetch("data/housing-hexbins.json")
    .then(function(r){return r.json();})
    .then(function(data){
      HEX=data;
      HEX.forEach(function(h){h.x=S3*(h[0]+h[1]/2);h.y=-1.5*h[1];});
      HEX.forEach(function(h){minX=Math.min(minX,h.x);maxX=Math.max(maxX,h.x);minY=Math.min(minY,h.y);maxY=Math.max(maxY,h.y);});
      order=HEX.slice().sort(function(a,b){return a.y-b.y;});
      byValue=HEX.slice().sort(function(a,b){return a[3]-b[3];});
      layout();
    })
    .catch(function(err){
      out.textContent="Could not load housing data.";
      console.error("Housing data fetch error:",err);
    });
})();


})();
