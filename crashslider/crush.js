

CrashSlider = function(id){
	
	this.crushImg = document.getElementById(id);
	
	this.nc = null;
	
	//CORE VERTS
	this.arp = null;
	
	//GROUND VERTS
	this.arg = null;
	
	//FORCES
	this.ars = null;
	
	//CORE BASE
	this.arb = null;
	
	//PERSPECTIVE VERTS
	this.arv = null;
	
	//GROUND BASE
	this.arq = null;
	
	//FORCES SAVED
	this.ark = null;
	
	this.cameraZ = -100;
	this.cameraF = 100;
	this.grav = 0.3;
	
	this.greydownlimit = 0.1;
	this.greyuplimit = 0.7;
	
	this.deathRect = document.body;
	this.deathTime = 5000;
	this.deathRand = 2000;
	
	this.deathByUpDown = 0;
	this.deathByLeftRight = 1;
	
	this.deathDuration = 1000;
	this.deathDurationRand = 1000;
	
	this.timeNow = 0;
	
	this.slowMo = 1;
	
	this.crushDead = 0;
	
	this.leftDeathLimit;
	this.rightDeathLimit;
	this.topDeathLimit;
	this.bottomDeathLimit;
	
}

CrashSlider.prototype = {};

var superParent = CrashSlider.prototype;

superParent.grav = 0.2;

superParent.cameraZ = -8000;
superParent.cameraF = 8000;


CrashSlider.prototype.getDenensions = function(el){
	
	var top = 0,left = 0,w = 0, h = 0;

	
	w = el.offsetWidth;
	h = el.offsetHeight;
	
	do{
		top += el.offsetTop;
		left += el.offsetLeft;
	}while(el = el.offsetParent);

	
	return {x:left,y:top,width:w,height:h};
	
}

CrashSlider.prototype.physPlane = function(gravity,pow,pers){
	
	pow = parseFloat(pow);
	if(isNaN(pow))
		pow = 0;
	else{
		pow /= 25*this.slowMo;
	}
	
	
	this.timeNow += pow*25;
	
	//console.log(this.timeNow);
	
	var arr = this.arp;
	var arrs = this.ars;
	var arrc = this.arc;
	var arrv = this.arv;
	var arrg = this.arg;
	
	
	var ccX = this.nc.width/2;
	var ccY = this.nc.height/2;
	//console.log(222);
	
	
	
	
	for(var i=0;i<arr.length;i++){
		for(var j=0;j<arr[i].length;j++){
			
			if(!arrs[i][j].vis)
				continue;
			
			var trueDeathTime = arrs[i][j].death.time + arrs[i][j].death.duration;
			
			if(trueDeathTime < this.timeNow)
				arrs[i][j].vis = 0;
			
			
			for(var k=0;k<arr[i][j].length;k++){
				
				
				
				var realP = this.calc.position(arr[i][j][k],this.calc.reverse(arrs[i][j].center),1);
				
				
				
				
				realP = this.calc.rotate.x(realP,arrs[i][j].spin,pow);
				realP = this.calc.rotate.y(realP,arrs[i][j].spin,pow);
				realP = this.calc.rotate.z(realP,arrs[i][j].spin,pow);
				
				realP = this.calc.position(realP,arrs[i][j].center,1);
				
				realP = this.calc.position(realP,arrs[i][j].vector,pow);
				
				arr[i][j][k] = realP.slice(0);
				
				/*
				realP = this.calc.position(realP,[-ccX,-ccY,0],pow);
				realP = this.perspective(realP);
				arrv[i][j][k] = this.calc.position(realP,[ccX,ccY,0],pow);*/
				// = realP
				
			}
			
			
			for(var k=0;k<arrg[i][j].length;k++){
				
				
				
				var realP = this.calc.position(arrg[i][j][k],this.calc.reverse(arrs[i][j].center),1);
				
				realP = this.calc.rotate.x(realP,arrs[i][j].spin,pow);
				realP = this.calc.rotate.y(realP,arrs[i][j].spin,pow);
				realP = this.calc.rotate.z(realP,arrs[i][j].spin,pow);
				
				realP = this.calc.position(realP,arrs[i][j].center,1);
				
				realP = this.calc.position(realP,arrs[i][j].vector,pow);
				
				arrg[i][j][k] = realP;
				
			}
			arrs[i][j].center = this.calc.position(arrs[i][j].center,arrs[i][j].vector,pow);
			
			
			
			var newGR = parseFloat(this.grav);
			newGR *= pow;
			//console.log(newGR);
			arrs[i][j].vector[1] = parseFloat(arrs[i][j].vector[1]) + newGR;
			
			
		}
	}
	
	
}

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////PERSPECTIVE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////////////////////////////////////////////

CrashSlider.prototype.perspective = function(p) {
	
	var cameraZ = superParent.cameraZ;
	var cameraF = superParent.cameraF;
	
	var coof = cameraF/cameraZ;
	return [
		p[0] * ((cameraF-cameraZ) / ((cameraF-cameraZ) - p[2])) * -coof * 1/*zoom*/,
		p[1] * ((cameraF-cameraZ) / ((cameraF-cameraZ) - p[2])) * -coof * 1/*zoom*/,
		p[2] * ((cameraF-cameraZ) / ((cameraF-cameraZ) - p[2])) * -coof * 1/*zoom*/
		//p : ((cameraF-cameraZ) / ((cameraF-cameraZ) - p.z)) * 1/*zoom*/
	]
}


CrashSlider.prototype.setRealWH = function(rWI,rHI){
	this.coofW = rWI/this.crushImg.offsetWidth;
	this.coofH = rHI/this.crushImg.offsetHeight;
}

CrashSlider.prototype.calcAng = function(obj1,obj2,isz,isx){
	
	var x1 = parseFloat(obj1[0]);
	var x2 = parseFloat(obj2[0]);
	var y1 = parseFloat(obj1[1]);
	var y2 = parseFloat(obj2[1]);
	
	var zn = y1*y2;
	var mz = 1;
	
	//alert(zn);
	
	
	
	
	var angl = (Math.abs(x1)*Math.abs(x2)+Math.abs(y1)*Math.abs(y2))/(Math.sqrt(Math.pow(x1,2)+Math.pow(y1,2))*Math.sqrt(Math.pow(x2,2)+Math.pow(y2,2)));
	
	angl = Math.acos(angl);

	
	if(isz){
	
		if(x1<=0){
			angl = (Math.PI/2 - angl) + Math.PI/2;
		}
	
		if(y1<0){
			angl = -angl;
			//angl += Math.PI;
		}
	
	}
	if(isx){

		if(x1 >= 0){
			if(x2 <= 0){
				angl = ((Math.PI/2) - angl) + Math.PI/2;
			}
			
			
		}
		else{

		
			
			
			
		}
		
		if(y2 < 0){
			angl = ((Math.PI/2) - angl) + Math.PI/2;
		}
	}
	return angl;
}

CrashSlider.prototype.displayCrush = function(custScrollTop,custScrollLeft){
	
	
	var arr = this.arp; //arp
	var arrg = this.arg;
	var arrs = this.ars;
	var arrq = this.arq;
	var ctx = this.nc.getContext("2d");
	
	var crIm = this.crushImg;
	
	var nccX = this.nc.width;
	var nccY = this.nc.height;
	
	//var ncl = (nccX - crIm.offsetWidth)/2;
	
	
	var ell = crIm;
	
	var crTop = 0;
	var caTop = document.body.scrollTop || document.documentElement.scrollTop;
	var crLeft = 0;
	var caLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
	
	if(custScrollTop)
		caTop = custScrollTop;
	if(custScrollLeft)
		caLeft = custScrollLeft;
	
	

	
	do{
		crTop += ell.offsetTop;
		crLeft += ell.offsetLeft;
	}
	while(ell = ell.offsetParent);
	
	var tpO = crTop - caTop;
	var tpL = crLeft - caLeft;
	
	var cIW = this.coofW;
	var cIH = this.coofH;
	
	
	
	//console.log(tpL);
	var minOne = 0;
	
	for(var m=0;m<arr.length;m++){
		
		
		
		for(var n=0;n<arr[m].length;n++){
			
			if(!arrs[m][n].vis)
				continue;
			
			
			var sclCX = Math.abs(arrq[m][n][0][0] - arrq[m][n][1][0]);
			var sclCY = Math.abs(arrq[m][n][0][1] - arrq[m][n][3][1]);
			
			var newTrValX = arrs[m][n].center[0];
			var newTrValY = arrs[m][n].center[1];
			
			var sclMax = Math.max(sclCX,sclCY);
			
			
			if(this.deathByLeftRight){
				if(newTrValX + tpL + sclMax < this.leftDeathLimit){
					arrs[m][n].vis = 0;
				}
				if(newTrValX + tpL - sclMax > this.rightDeathLimit){
					arrs[m][n].vis = 0;
				}
			}
			if(this.deathByUpDown){
				if(newTrValY + tpO + sclMax < this.topDeathLimit){
					arrs[m][n].vis = 0;
				}
				if(newTrValX + tpO - sclMax > this.bottomDeathLimit){
					arrs[m][n].vis = 0;
				}
			}
			
			//if(newTrValX + tpO + sclCX)
			
			//var sclMax = Math.max(sclCX,sclCY);
			
			//console.log(arr[m][n][0][0]);

			var trueOpac = (arrs[m][n].death.duration + arrs[m][n].death.time - this.timeNow)/arrs[m][n].death.duration;
			if(trueOpac < 0)
				trueOpac = 0;
			if(trueOpac > 1)
				trueOpac = 1;
			
			minOne = 1;
			
			ctx.save();
			ctx.strokeStyle="#000000";
			ctx.beginPath();
			for(var l=0;l<arr[m][n].length;l++){
				
				if(l === 0){
					ctx.moveTo(arr[m][n][l][0] + tpL,arr[m][n][l][1] + tpO);
				}
				else{
					ctx.lineTo(arr[m][n][l][0] + tpL,arr[m][n][l][1] + tpO);
				}
				
			}
			
			ctx.closePath();
			//***ctx.stroke();
			
			
			ctx.clip();
			
			
			
			

			var lnn = [arrg[m][n][2][0] - arrg[m][n][3][0],arrg[m][n][2][1] - arrg[m][n][3][1]];
			
			var ang = this.calcAng(lnn,[1000,0],true);
		
	

			
			ctx.translate(newTrValX+tpL,newTrValY+tpO);
			
			if(ang){
				
				ctx.rotate(ang);
				
				var skPt1 = arrg[m][n][2].slice(0);
				
				var skPt2 = arrg[m][n][3].slice(0);
				
				var skPt3 = arrg[m][n][0].slice(0);
				
				
				
				
				
				
				skPt1[2] = 0;
				skPt2[2] = 0;
				skPt3[2] = 0;
				
				
				
				var skC1 = arrs[m][n].center.slice(0);
				
				skC1[2] = 0;

				
				ang *= (180/Math.PI);
				
				
				skPt1 = this.calc.position(skPt1,this.calc.reverse(skC1),1);			
				skPt1 = this.calc.rotate.z(skPt1,[0,0,-ang],1);
				
				skPt2 = this.calc.position(skPt2,this.calc.reverse(skC1),1);
				skPt2 = this.calc.rotate.z(skPt2,[0,0,-ang],1);
				
				skPt3 = this.calc.position(skPt3,this.calc.reverse(skC1),1);
				skPt3 = this.calc.rotate.z(skPt3,[0,0,-ang],1);
				
				
				
				
				
				var lnm = [skPt1[0] - skPt2[0],skPt1[1] - skPt2[1]];
				var lnk = [skPt2[0] - skPt3[0],skPt2[1] - skPt3[1]];
				
				
				
				var kut = this.calcAng(lnm,lnk,false,true);
				
				
				var anll = (kut - Math.PI/2);// / (Math.PI/4); 
				
				

				var anl = Math.tan(anll); //* akll;
				
				

				var sclX = Math.abs(skPt1[0] - skPt2[0])/sclCX;
				var sclY = Math.abs(skPt3[1] - skPt2[1])/sclCY;
				
				ctx.transform(1,0,-anl,1,0,0);
				ctx.scale(sclX,sclY);
				
			}
			
			var icCC = 2;
			
			if(trueOpac < 1){
				
				ctx.globalAlpha = trueOpac;
				//ctx.fillStyle = "black";
			}
			

			
			ctx.drawImage(crIm,
				arrq[m][n][0][0]*cIW, 
				arrq[m][n][0][1]*cIH, 
				(arrq[m][n][2][0] - arrq[m][n][0][0])*cIW,
				(arrq[m][n][2][1] - arrq[m][n][0][1])*cIH, 
				(-(arrq[m][n][2][0]-arrq[m][n][0][0])/2), 
				(-(arrq[m][n][2][1]-arrq[m][n][0][1])/2),
				arrq[m][n][2][0] - arrq[m][n][0][0],
				arrq[m][n][2][1] - arrq[m][n][0][1]
			);
			
			
			
			
			

			if(this.fadeLow && this.fadeHigh && sclX && sclY){
				
				ctx.globalAlpha = ((1 - sclX * sclY) * this.fadeHigh)*trueOpac;
				ctx.fillStyle = "black";
				//ctx.fill();
				ctx.fillRect((-(arrq[m][n][2][0]-arrq[m][n][0][0])/2),(-(arrq[m][n][2][1]-arrq[m][n][0][1])/2),arrq[m][n][2][0] - arrq[m][n][0][0],arrq[m][n][2][1] - arrq[m][n][0][1]);
				
			}
			
			/*if(m == 4 && n == 8){
				//console.log();
				var testt = document.getElementById("testt");
				
				testt.style.left = newTrValX+tpL+'px';
				testt.style.top = newTrValY+tpO+'px';
				
				ctx.globalAlpha = 1;
				ctx.fillStyle = "red";
				ctx.fillRect(newTrValX,newTrValY,20,20);
				ctx.fillRect((-(arrq[m][n][2][0]-arrq[m][n][0][0])/2),(-(arrq[m][n][2][1]-arrq[m][n][0][1])/2),arrq[m][n][2][0] - arrq[m][n][0][0],arrq[m][n][2][1] - arrq[m][n][0][1]);
				//console.log(newTrValX + tpL + ' ' +this.leftDeathLimit);
			}*/
			
			
		
			ctx.restore();
			
			
			
			
		}
		
	}
	if(!minOne)
		this.crushDead = 1;
	
}



CrashSlider.prototype.render = function(){
	
	var el = this.crushImg;
	iii++;
	
	this.clearRect();
	this.physPlane(this.grav);
	this.displayCrush(el);
	
}

var dtr = function(v) {return v * Math.PI/180;};


CrashSlider.prototype.clearRect = function(){
	
	var ctx = this.nc.getContext('2d');
	
	ctx.clearRect(0,0,this.nc.width,this.nc.height);
	
}


CrashSlider.prototype.crashPlane = function(el,sett/*,type,density,dcc,mcc,scc,posX,posY*/){
	
	
	width = el.offsetWidth;
	height = el.offsetHeight;
	//alert(el.offsetWidth);
	
	var rect = this.getDenensions(this.deathRect);
	
	this.leftDeathLimit = rect.x;
	this.rightDeathLimit = rect.x+rect.width;
	this.topDeathLimit = rect.y;
	this.bottomDeathLimit = rect.y+rect.height;
	//console.log('LW: '+this.leftDeathLimit+' '+this.rightDeathLimit);
	
	
	var dcoof = sett.sideCount || 24;
	var mcoof = sett.multCoof || 1.5;
	var startval = sett.startLength || 10;
	var density = sett.density || 1;
	var cType = sett.type || 1;
	var spinForceX = sett.spin || 20;
	var spinForceY = sett.spin || 20;
	var spinForceZ = sett.spin || 20;
	var vectorForceX = sett.vector || 15;
	var vectorForceY = sett.vector || 15;
	var vectorDensity = 0.8;
	/*
	var death = sett.death;
	var deathTime = -1;
	var deathTimeRand = 3000;
	var deathEl = document.body;
	if(death){
		if(death.time)
			deathTime = death.time;
		if(death.rand)
			deathTimeRand = death.rand;
		if(death.el)
			deathEl = death.el;
	}
	*/
	//var deathTime = death.time || -1;
	//var deathTimeRand = death.rand || 3000;
	//var deathEl = death.el || document.body;
	
	var posX = (width/2) + Math.random() * (width * density/10 * 2) - (width * density/10);
	var posY = (height/2) + Math.random() * (height * density/10 * 2) - (height * density/10);
	
	if(sett.pos){
		posX = sett.pos.x;
		posY = sett.pos.y;
	}
	
	if(typeof vectorForceX == 'object'){
		vectorForceX = vectorForceX.x;
		vectorForceY = vectorForceX.y;
		vectorDensity = vectorForceX.random || 0.8;
	}
	
	if(typeof spinForceX == 'object'){
		spinForceX = spinForceX.x;
		spinForceY = spinForceX.y;
		spinForceZ = spinForceX.z;
	}
	
	//var oLeftV = (document.body.clientWidth - el.offsetWidth)/2;
	var oLeft = 0;
	
	var plusRand = function(width,density){
		return Math.random() * (width * density/10 * 2) - (width * density/10)
	}
	
	
	
	
	
	//this.arrb = [];
	var arr = [];
	var arrg = [];
	var arrs = [];
	var arrv = [];
	var arrq = [];
	
	var persCoof = 1;
	var center = {x:posX,y:posY};
	//var center = {x:document.body.offsetWidth/2,y:posY};
	var newWid = width;
	var widfor = (newWid * density/10 * 2);
	

	
	var dang = (Math.PI*2)/dcoof;
		
	var nx = center.x - widfor*density/10;
	var ny = center.y - widfor*density/10;
	
	var it = 0;
	
	
	
	for(var j=startval;j<=width;j*=mcoof){
		
		arr[it] = [];
		arrg[it] = [];
		arrs[it] = [];
		arrv[it] = [];
		arrq[it] = [];
		
		var ik = 0;
		
		for(var i=dang;i<=Math.PI*2;i+=dang){
			
			var px = j * Math.cos(i) + plusRand(j,density) + center.x;
			var py = j * Math.sin(i) + plusRand(j,density) + center.y;
			
			
			
			if(px < 0)
				px = 0;
			if(px > width)
				px = width;
			if(py < 0)
				py = 0;
			if(py > height)
				py = height;
			
			
			
			if(it === 0){
				arr[it].push([[center.x + oLeft,center.y,0],[px + oLeft,py,0]]);
			}
			else{
				arr[it].push([arr[it-1][ik][1],[px + oLeft,py,0]]);
			}
			
			ik++;
			
		}
		
		if(it === 0){
			var k;
			
			
			
			for(k=0;k<arr[it].length-1;k++){
				arr[it][k].push(arr[it][k+1][1]);
			}
			arr[it][k].push(arr[it][0][1]);
			
			
		}
		else{
			var k;
			
			
			for(k=0;k<arr[it].length-1;k++){
				arr[it][k].push(arr[it][k+1][1]);
				arr[it][k].push(arr[it-1][k+1][1]);
			}
			arr[it][k].push(arr[it][0][1]);
			arr[it][k].push(arr[it-1][0][1]);
		}
		
		
		for(k=0;k<arr[it].length;k++){
			
			var minH = Infinity,maxH = 0,minW = Infinity,maxW = 0;
			
			for(var l=0;l<arr[it][k].length;l++){
				
				if(arr[it][k][l][0] < minW)
					minW = arr[it][k][l][0];
				if(arr[it][k][l][0] > maxW)
					maxW = arr[it][k][l][0];
				if(arr[it][k][l][1] < minH)
					minH = arr[it][k][l][1];
				if(arr[it][k][l][1] > maxH)
					maxH = arr[it][k][l][1];
				
			}
			
			var centX = (maxW-minW)/2 + minW;
			var centY = (maxH-minH)/2 + minH;
			
			//console.log(centX+' '+center.x);
			
			var tmpX = ((centX - center.x)/vectorForceX); //15
			var tmpY = ((centY - center.y)/vectorForceY); //15
			
			var vectX = tmpX + Math.random() * (tmpX/vectorDensity) - (tmpX/(vectorDensity*2));
			var vectY = tmpY + Math.random() * (tmpY/vectorDensity) - (tmpY/(vectorDensity*2));
			var vectZ = 100/(Math.sqrt((tmpX*tmpX) + (tmpY*tmpY)));
			
			deathT = -1;
			if(this.deathTime >= 0){
				deathT = this.deathTime + Math.random()*this.deathRand;
			}
			var deathD = this.deathDuration + Math.random()*this.deathDurationRand;
			
			//SPIN 10-5
			arrs[it][k] = {'spin':[Math.random()*spinForceX-spinForceX/2,Math.random()*spinForceY-spinForceY/2,Math.random()*spinForceZ-spinForceZ/2],'vector':[vectX,vectY,vectZ],'center':[centX,centY,0],'death':{'time':deathT,'duration':deathD},'vis':1};
			//arrs[it][k] = {'spin':[5,5,0],'vector':[vectX,vectY,vectZ],'center':[centX,centY,0]};
			
			arrg[it][k] = [[minW,minH,0],[maxW,minH,0],[maxW,maxH,0],[minW,maxH,0]];
			arrq[it][k] = [[minW,minH,0],[maxW,minH,0],[maxW,maxH,0],[minW,maxH,0]];
			
			arrv[it][k] = [];
		}
		
		
		it++;
		
	}
	
	this.arp = arr;
	this.arg = arrg;
	this.arb = arr.slice(0);
	this.ars = arrs;
	this.arv = arrv;
	this.arq = arrq;
	
	console.log(arrg);
	console.log(arr);
	console.log(arrs);
	
	
	var ctx = this.nc.getContext('2d');
	
	/* DISPLAY TEST */
	
	/* DISPLAY TEST END */
	
}



superParent.calc = {
	size : function(p, size) {
		
		if(typeof p == 'Object'){
		
			return {
				x : p.x * size.x,
				y : p.y * size.y,
				z : p.z * size.z
			}
			
		}
		else{
			
			return [ p[0] * size[0], p[1] * size[1], p[2] * size[2] ]
			
			
		}
	},
	rotate: {
		x : function(p, rotate, pow) {
			//pow = 1;
			if(typeof p == 'Object'){
				
				return {
					x : p.x,
					y : p.y*Math.cos(dtr(rotate.x * pow)) - p.z*Math.sin(dtr(rotate.x * pow)),
					z : p.y*Math.sin(dtr(rotate.x * pow)) + p.z*Math.cos(dtr(rotate.x * pow)) 
				}
			
			}
			else{
				
				return [
					p[0],
					p[1]*Math.cos(dtr(rotate[0] * pow)) - p[2]*Math.sin(dtr(rotate[0] * pow)),
					p[1]*Math.sin(dtr(rotate[0] * pow)) + p[2]*Math.cos(dtr(rotate[0] * pow)) 
				]
				
			}
		},
		y : function(p, rotate, pow) {
			
			if(typeof p == 'Object'){
			
				return {
					x : p.x*Math.cos(dtr(rotate.y * pow)) + p.z*Math.sin(dtr(rotate.y * pow)),
					y : p.y,
					z : -p.x*Math.sin(dtr(rotate.y * pow)) + p.z*Math.cos(dtr(rotate.y * pow)) 
				}
			
			}
			else{
				
				return [
					p[0]*Math.cos(dtr(rotate[1] * pow)) + p[2]*Math.sin(dtr(rotate[1] * pow)),
					p[1],
					-p[0]*Math.sin(dtr(rotate[1] * pow)) + p[2]*Math.cos(dtr(rotate[1] * pow))
				]
				
			}
		},
		z : function(p, rotate, pow) {
			
			if(typeof p == 'Object'){
			
				return {
					x : p.x*Math.cos(dtr(rotate.z * pow)) - p.y*Math.sin(dtr(rotate.z * pow)),
					y : p.x*Math.sin(dtr(rotate.z * pow)) + p.y*Math.cos(dtr(rotate.z * pow)),
					z : p.z
				}
			
			}
			else{
				
				return [
					p[0]*Math.cos(dtr(rotate[2] * pow)) - p[1]*Math.sin(dtr(rotate[2] * pow)),
					p[0]*Math.sin(dtr(rotate[2] * pow)) + p[1]*Math.cos(dtr(rotate[2] * pow)),
					p[2]
				]
				
			}
		}
	},
	position : function(p, position, pow) {
		//console.log(pow);
		if(typeof p == 'Object'){
		
			return {
				x : p.x + position.x * pow,
				y : p.y + position.y * pow,
				z : p.z + position.z * pow
			}
		
		}
		else{
			return [
				p[0] + (position[0]) * pow,
				p[1] + position[1] * pow,
				p[2] + position[2] * pow
			]
		}
	},
	reverse : function(p){
		if(typeof p == 'Object'){
			return {
				x : -p.x,
				y : -p.y,
				z : -p.z
			}
		}
		else{
			return [
				-p[0],
				-p[1],
				-p[2]
			]
		}
	}
}


CrashSlider.prototype.makeCanvas = function(el){
	
	var dems = this.getDenensions(el);
	var glob = {width:document.documentElement.clientWidth, height:document.documentElement.clientHeight, y:document.documentElement.scrollTop || document.body.scrollTop, x:document.documentElement.scrollLeft || document.body.scrollLeft};
	
	var c = document.createElement('canvas');
	c.width = document.body.clientWidth;
	c.height = window.innerHeight;
	
	c.style.top = dems.y;
	c.style.left = 0;
	c.style.position = 'fixed';
	c.style.top = 0;
	c.style.pointerEvents = 'none';
	
	this.nc = c;
	
	document.body.appendChild(c);
	
	var ctx = c.getContext('2d');
		
}
