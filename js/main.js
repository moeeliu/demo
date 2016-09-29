var bg,myfighter,fire1,fire2,ene0,ene1,ene2;
var timer,n = 0,m=0 ,h = 3,score = 0;
var cw = 600,cy = 600;
var fighterX = 220,fighterY = 480;
var fireX1 = 230,fireX2 = 282,fireY = 555;
var vy = -30,bulletY,bulletX;
var bullets= [],ene0s = [],ene1s = [],ene2s = [],lifes = [];
var ene0X,eneY,ene1X,ene2X;







var canvas = document.getElementById("Air");

var context = canvas.getContext("2d");

window.onload = init();
window.onmousemove = mouseHandelar;

//初始化
function init(){
	log("init");
	
	bg = addImage("img/img/bg.png");
	myfighter = addImage("img/img/plane.png");
	fire1 = addImage("img/img/fire1.png");
	fire2 = addImage("img/img/fire2.png");
	bullet = addImage("img/img/bullet.png");
	ene0 = addImage("img/img/enemy.png");
	ene1 = addImage("img/img/enemy1.png");
	ene2 = addImage("img/img/enemy2.png");
	ene0B = addImage("img/img/boom_enemy.png");
	ene1B = addImage("img/img/boom_enemy1.png");
	ene2B = addImage("img/img/boom_enemy2.png");
	life = addImage("img/img/life.png");
//	creatbullet();
	timer = setInterval(gameTick,100);
	
}
function gameTick(){
	clearScreen();
	
	context.drawImage(bg,0,0,cw,cy);
	
	context.drawImage(myfighter,fighterX,fighterY);
	context.drawImage(fire1,fireX1,fireY);
	context.drawImage(fire2,fireX2,fireY);
	createlife();
	//无限子弹
	creatbullet();
	updatebullet();
	//敌机
	createene();
	updateene();
	//敌机1号
	createene1();
	updateene1();
	//敌机2号
	createene2();
	updateene2();
	//射击成功
	bulletAndene();
	bulletAndene1();
	bulletAndene2();
//	撞击
    eneAndplane();
	eneAndplane1();
	eneAndplane2();
//	生命值
    lifeAndboom();
	
}
function eneAndplane(){
	for(i=0;i<ene0s.length/10;i++){
	        var ene0i = ene0s[i];
		    var hit = hitTestPoint(fighterX,fighterY,myfighter.width,myfighter.height,ene0i.ex+ene0.width*0.5,ene0i.ey+ene0.height*0.5);
	        if(hit){
	    	    ene0s.splice(i,1);
	    	    h -= 1; 
	    	    lifes.splice(y,1);
	        }
	        if(h == 0 ){
//	    	游戏结束
                restarAndclearScreen();
	        }

	}
	
}
function eneAndplane1(){
	for(i=1;i<ene1s.length/10;i++){
		var ene1i = ene1s[i];
		var hit = hitTestPoint(fighterX,fighterY,myfighter.width,myfighter.height,ene1i.ex+ene1.width*0.5,ene1i.ey+ene1.height*0.5);
	    if(hit){
	    	ene1s.splice(i,1);
	    	h -= 1; 
	    }
	    if(h == 0 ){
//	    	游戏结束
            restarAndclearScreen();
	    }
	}
	
}
function eneAndplane2(){
	for(i=2;i<ene2s.length/200;i++){
		var ene2i = ene2s[i];
		var hit = hitTestPoint(fighterX,fighterY,myfighter.width,myfighter.height,ene2i.ex+ene2.width*0.5,ene2i.ey+ene2.height*0.5);
	    if(hit){
	    	ene2s.splice(i,1);
	    	h -= 1; 
	    }
	    if(h == 0 ){
//	    	游戏结束
            restarAndclearScreen();
	    }
	}
	
}
function bulletAndene(){
	for(i=0;i<ene0s.length/10;i++){
		for(y=0;y<bullets.length;y++){
            var ene0i = ene0s[i];
			var bullet = bullets[y];
		    var hit = hitTestPoint(ene0i.ex,ene0i.ey,ene0.width,ene0.height,bullet.bx,bullet.by);
		    if(hit){
//		    	var z = ene0;
//		    	ene0 = ene0B;
//		    	timer = setInterval(3000);
		    	bullets.splice(y,1);
			    ene0s.splice(i,1);
//              ene0 = z;
                score +=100; 
                document.getElementById("score").innerHTML = "得分："+score;
		    }
		}
		
	}
}
function bulletAndene1(){
		for(i=1;i<ene1s.length/10;i++){
		for(y=0;y<bullets.length;y++){
            var ene1i = ene1s[i];
			var bullet = bullets[y];
		    var hit = hitTestPoint(ene1i.ex,ene1i.ey,ene1.width,ene1.height,bullet.bx,bullet.by);
		    if(hit){
		    	bullets.splice(y,1);
		    	n +=1;
//			    ene1s.splice(i,1);
                
		    }
		    if(n==3){
		    	    ene1s.splice(i,1);
		    	    n=0;
		    	    score +=300; 
                document.getElementById("score").innerHTML = "得分："+score;
		    }
		    
		    
		}
		
	}
}
function bulletAndene2(){
	for(i=2;i<ene2s.length/200;i++){
		for(y=0;y<bullets.length;y++){
            var ene2i = ene2s[i];
			var bullet = bullets[y];
		    var hit = hitTestPoint(ene2i.ex,ene2i.ey,ene2.width,ene2.height,bullet.bx,bullet.by);
		      if(hit){
		    	bullets.splice(y,1);
		    	m +=1;
//			    ene1s.splice(i,1);
                
		    }
		    if(m==7){
		    	    ene2s.splice(i,1);
		    	    m=0;
		    	    score +=1000; 
                document.getElementById("score").innerHTML = "得分："+score;
		    }
		    
		}
		
	}
}

function createene(){
	ene0X = Math.floor(Math.random()*(cw-ene0.width))+ene0.width*0.5;
	eneY = 0;
	ene0s.push({ene0:ene0,ex:ene0X,ey:eneY});
}

//x1,y1被碰撞物体的起点坐标，w h 被碰撞物体的宽高 ，x2y2子弹的起点坐标
function hitTestPoint(x1,y1,w,h,x2,y2){
	if(x2>x1&&x2<=x1+w&&y2>y1&&y2<=y1+h){
		return true;
	}
	else{
		return false;
	}
}
function createlife(){
	for(i=0;i<3;i++){
	lifes.push({life:life,lx:10+42*i,ly:0});
	}
}
function lifeAndboom(){
	for(i=0;i<h;i++){
		var lifei = lifes[i];
		context.drawImage(lifei.life,lifei.lx,lifei.ly,40,40);
	}
}
function createene2(){
	ene2X = Math.floor(Math.random()*(cw-ene2.width*3))+ene2.width*0.5;
	eneY = -ene2.height;
	ene2s.push({ene2:ene2,ex:ene2X,ey:eneY});
}
function updateene2(){
	for(i=2;i<ene2s.length/200;i++){
		var ene2i = ene2s[i];
		context.drawImage(ene2i.ene2,ene2i.ex,ene2i.ey);
		ene2i.ey +=2; 
	}
}
function createene1(){
	ene1X = Math.floor(Math.random()*(cw-ene1.width))+ene1.width*0.5;
	eneY = -ene1.height;
	ene1s.push({ene1:ene1,ex:ene1X,ey:eneY});
}
function updateene1(){
	for(i=1;i<ene1s.length/30;i++){
		var ene1i = ene1s[i];
		context.drawImage(ene1i.ene1,ene1i.ex,ene1i.ey);
		ene1i.ey +=8; 
	}
}

function updateene(){
	for(i=0;i<ene0s.length/10;i++){
		var ene0i = ene0s[i];
		context.drawImage(ene0i.ene0,ene0i.ex,ene0i.ey);
		ene0i.ey +=10; 
	}
}
	


function creatbullet(){
	bulletX = fighterX+myfighter.width*0.5-3;
    bulletY = fighterY-10;
    bullets.push({bullet:bullet,bx:bulletX,by:bulletY});
}

function updatebullet(){
	for(i=0;i<bullets.length;i++){
		var bulleti = bullets[i];
		context.drawImage(bulleti.bullet,bulleti.bx,bulleti.by);
		bulleti.by +=-40; 
	}
	
}

function mouseHandelar(e){
	fighterX = e.clientX-myfighter.width*0.5;
	fighterY = e.clientY-myfighter.height*0.5;
	if(fighterX < 0){
		fighterX = 0;
	}
	if(fighterX>cw - myfighter.width){
		fighterX = cw - myfighter.width;
	}
	if(fighterY < 0){
		fighterY = 0;
	}
	if(fighterY>cy - myfighter.height){
		fighterY = cy - myfighter.height;
	}
	fireX1 = fighterX+10;
	fireX2 = fighterX+62;
	fireY = fighterY+75;
	
}
function clearScreen(){
	context.clearRect(0,0,cw,cy);
}
function addImage(url){
	var img = new Image();
	img.src = url;
	return img;
	
}
function log(msg){
	console.log(msg);
}
function restarAndclearScreen(){
	clearInterval(timer);
	clearScreen();
	context.drawImage(bg,0,0,cw,cy);
	
	var restart = document.getElementById("restartbutton");
	restart.style.display = "block";
	
}
function restartgame(){
	//重新加载
	window.location.reload();
}
