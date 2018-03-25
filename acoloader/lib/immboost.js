
Math.linearTween = function (t, b, c, d) {
	return c*t/d + b;
};
Math.easeInQuad = function (t, b, c, d) {
	t /= d;
	return c*t*t + b;
};
Math.easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
Math.easeInCubic = function (t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
};
Math.easeOutCubic = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
};
Math.easeInOutCubic = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};
Math.easeInQuart = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
};
Math.easeOutQuart = function (t, b, c, d) {
	t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};
Math.easeInOutQuart = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
};
Math.easeInQuint = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t*t + b;
};
Math.easeOutQuint = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t*t*t + 1) + b;
};
Math.easeInOutQuint = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t*t*t + 2) + b;
};
Math.easeInSine = function (t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};
Math.easeOutSine = function (t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};
Math.easeInOutSine = function (t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};
Math.easeInExpo = function (t, b, c, d) {
	return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
};
Math.easeOutExpo = function (t, b, c, d) {
	return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};
Math.easeInOutExpo = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};
Math.easeInCirc = function (t, b, c, d) {
	t /= d;
	return -c * (Math.sqrt(1 - t*t) - 1) + b;
};
Math.easeOutCirc = function (t, b, c, d) {
	t /= d;
	t--;
	return c * Math.sqrt(1 - t*t) + b;
};
Math.easeInOutCirc = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
};


addEventListener('DOMContentLoaded',function(){

},false);

/*
var target = document.querySelector('body');
var observer = new MutationObserver(function(mutations) {
	//console.log(mutations);
});
var config = { attributes: true, childList: true, subtree: true};
observer.observe(target, config);
*/


//ALL IMM COMPONENTS
var Imm = function(){
	
	this.all = {
		tabs:[]
	};
	this.lang = {
		days:["M","T","W","T","F","S","S"]
	};
	
	this.L_DARK = 1;
	this.L_LIGHT = 2;
}

var IMM = new Imm();

Imm.prototype.TAB = function(tab){
	this._o = tab;
	this.activate();
}

Imm.prototype.INP = function(inp){
	this._o = inp;
	
	Object.defineProperty(this,'disabled',{
		get: function(){
			return this.disab;
		}, 
		set:function(val){
			this.disab = (val == true);
			this._o.disabled = this.disab;
		} 
	});
	
	this.activate();
	inp.O = this;
}

Imm.prototype.SEL = function(sel){
	this._o = sel;
	
	Object.defineProperty(this,'disabled',{
		get: function(){
			return this.disab;
		}, 
		set:function(val){
			this.disab = (val == true);
			this.html.classList[this.disab ? 'add' : 'remove']('disabled');
		} 
	});
	
	this.activate();
	sel.O = this;
}

Imm.prototype.RADIO = function(rad){
	var allRads = document.getElementsByName(rad);
	this._o = allRads;
	rad.O = this;
	this.activate();
}

Imm.prototype.CHECK = function(check){
	//var allRads = document.getElementsByName(rad);
	this._o = check;
	check.O = this;
	this.activate();
}
Imm.prototype.SCROLL = function(scroll,callback){
	this._o = scroll;
	scroll.O = this;
	this.activate(callback);
}
Imm.prototype.DATEPICKER = function(inp){
	this._o = inp;
	inp.O = this;
	this.activate();
}
Imm.prototype.NUMBER = function(inp){
	this._o = inp;
	
	Object.defineProperty(this,'disabled',{
		get: function(){
			return this.disab;
		}, 
		set:function(val){
			this.disab = (val == true);
			this._o.disabled = this.disab;
		} 
	});
	
	inp.O = this;
	this.activate();
}
Imm.prototype.COLOR = function(inp){
	this._o = inp;
	inp.O = this;
	this.activate();
}
Imm.prototype.WORKTIME = function(inp){
	this._o = inp;
	inp.O = this;
	this.activate();
}
Imm.prototype.ANIMATE = function(time,fn,callback){
	//this.activate(time,fn,callback);
	requestAnimationFrame(calc);
	var nt = 0;
	var dvcoof = (1000/60);
	function calc(){
		if(nt < time){
			callback(fn(nt,0,1,time));
			nt+=dvcoof;
			requestAnimationFrame(calc);
		}
		else{
			nt = time;
			callback(1);
		}
	}
}
Imm.prototype.T = function(str,obj){
	return this.parse(str,obj);
}
Imm.prototype.SLIDER = function(inp){
	this._o = inp;
	
	Object.defineProperty(this,'disabled',{
		get: function(){
			return this.disab;
		}, 
		set:function(val){
			this.disab = (val == true);
			this.html.classList[this.disab ? 'add' : 'remove']('disabled');
		} 
	});
	
	inp.O = this;
	this.activate();
}
Imm.prototype.LOADING = function(tmpl,background){
	
	return this.generate(tmpl,background);
	//<span class="imm-loading-container"><b class="imm-loading"><i><em></em></i><em></em></b></span>
}


var tabs = Imm.prototype.TAB;
var inps = Imm.prototype.INP;
var sels = Imm.prototype.SEL;
var rads = Imm.prototype.RADIO;
var checks = Imm.prototype.CHECK;
var scrolls = Imm.prototype.SCROLL;
var datepickers = Imm.prototype.DATEPICKER;
var numbers = Imm.prototype.NUMBER;
var colors = Imm.prototype.COLOR;
var worktimes = Imm.prototype.WORKTIME;
var animate = Imm.prototype.ANIMATE;
var slider = Imm.prototype.SLIDER;
var templater = Imm.prototype.T;
var loading = Imm.prototype.LOADING;



////////////////////////////////////////////////////////////////
///////////////////////////SCROLLS//////////////////////////////
////////////////////////////////////////////////////////////////

scrolls.prototype.activate = function(callback){
	
	this.cScr = 0;
	this.scrollDone = 0;
	this.nScr = 0;
	this.focused = 0;
	this._updateInterval = null;
	this.callback = callback;
	this.mouseEntered = 0;
	
	var self = this;
	var o = this._o;
	this._o.SCROLL = this;
	
	o.o = this;
	
	if(!IMM.mobile)
		o.classList.add('no-scrollbars');
	
	if(IMM.mobile){
		o.classList.add('mobile');
	}
	
	var div = document.createElement('div');
	div.className = 'imm-scroll-in';
	div.style.transform = 'translate3d(0px, 0px, 0px)';
	
	while(o.children.length){
		div.appendChild(o.children[0]);
	}
	
	var scrollLine = document.createElement('div');
	scrollLine.className = 'scroll-line';
	scrollLine.innerHTML = '<div class="scroll-line-hand" style="top: 0;"></div>';
	
	scrollLine.children[0].onmousedown = function(){
		return false;
	}
	
	o.appendChild(div);
	o.appendChild(scrollLine);
	
	this._block = o;
	
	
	(function(){
		if(o && o.parentNode){
			if(o.clientHeight < o.children[0].offsetHeight){
				if(self.mouseEntered)
					o.children[1].classList.add('active');
			}
			else{
				//if(!self.mouseEntered)
				o.children[1].classList.remove('active');
			}
			self._updateHandleHeight();
			setTimeout(arguments.callee,1000);
		}
	})();
		
		
	
	
	o.addEventListener('mouseenter',function(event){
		if(self.freezed)
			return;
		if(this.clientHeight < this.children[0].offsetHeight){
			this.children[1].classList.add('active');
		}
		self.mouseEntered = 1;
		self._updateHandleHeight();
	},false);
	o.addEventListener('mouseleave',function(){
		self.mouseEntered = 0;
		this.children[1].classList.remove('active');
	},false);
	
	
	
	var scrollLineHand = o.children[1].children[0];
	var bodyBlock = o.children[0];
	
	var handleT = 0;
	var touchT = 0;
	var oldY;
	var tOldY;
	var tTime = null;
	
	var plusReal;
	
	o.addEventListener('touchstart',function(event){
		
		if(IMM.mobile)
			return;
		
		touchT = 1;
		var tchY = event.changedTouches[0].pageY;
		tOldY = tchY;
		self.cScr = self.nScr;
		plusReal = 0;
	},false);
	
	window.addEventListener('touchmove',function(event){
		if(touchT){

			var newY = event.changedTouches[0].pageY;
			var plusPxs = newY-tOldY;
			tOldY = newY;
			
			plusReal = plusPxs;// /self.scrollRatio;
			
			self.cScr -= plusReal;
			
			if(self.cScr < 0){
				self.cScr = 0;
			}
			if(self.cScr > bodyBlock.offsetHeight - bodyBlock.parentNode.clientHeight){
				self.cScr = bodyBlock.offsetHeight - bodyBlock.parentNode.clientHeight;
			}
			
			if(tTime)
				clearTimeout(tTime);
			tTime = setTimeout(function(){
				plusReal = 0;
				tTime = null;
			},50);
			
			self.nScr = self.cScr;
			
			//scrollLineHand.style.top = self.nScr*self.scrollRatio+'px';
			//bodyBlock.style.marginTop = -self.nScr+'px';
			
			scrollLineHand.style.transform = 'translate3d(0, '+(self.nScr*self.scrollRatio)+'px, 0)';
			bodyBlock.style.transform = 'translate3d(0, '+(-self.nScr)+'px, 0)';
			
			var cevent = new CustomEvent('scroll', {detail:{cScr:self.cScr,nScr:self.nScr}});
			o.dispatchEvent(cevent);
			
			if(self.callback)
				self.callback(self.nScr,-plusReal);
		}
	});
	
	window.addEventListener('touchend',function(){
		
		if(IMM.mobile)
			return;
		
		touchT = 0;
		
		self.cScr -= plusReal*25;
		
		if(self.scrollDone === 0){
			self._makeScroll();
		}
		//self._makeScroll();
	});
	
	scrollLineHand.addEventListener('mousedown',function(event){
		
		if(IMM.mobile)
			return;
		
		if(self.freezed)
			return;
		
		handleT = 1;
		oldY = event.pageY;
	},false);
	window.addEventListener('mousemove',function(event){
		if(handleT){
			var newY = event.pageY;
			var plusPxs = newY-oldY;
			oldY = newY;
			
			var plusReal = plusPxs/self.scrollRatio;
			
			self.cScr += plusReal;
			
			if(self.cScr < 0){
				self.cScr = 0;
			}
			if(self.cScr > bodyBlock.offsetHeight - bodyBlock.parentNode.clientHeight){
				self.cScr = bodyBlock.offsetHeight - bodyBlock.parentNode.clientHeight;
			}
			
			
			self.nScr = self.cScr;
			
			scrollLineHand.style.transform = 'translate3d(0, '+(self.nScr*self.scrollRatio)+'px, 0)';
			bodyBlock.style.transform = 'translate3d(0, '+(-self.nScr)+'px, 0)';
			
			//scrollLineHand.style.top = self.nScr*self.scrollRatio+'px';
			//bodyBlock.style.marginTop = -self.nScr+'px';
			
			
			var cevent = new CustomEvent('scroll', {detail:{cScr:self.cScr,nScr:self.nScr}});
			o.dispatchEvent(cevent);
			
			
			if(self.callback)
				self.callback(self.nScr,plusReal);
		}
		
		
	},false);
	
	window.addEventListener('mouseup',function(){
		handleT = 0;
	},false);
	/*
	scrollLineBlock.addEventListener('mousedown',function(event){
		if(!handleT){
			var clTop = event.offsetY;
			if(clTop < self.nScr){
				self.cScr -= self.html.children[1].offsetHeight;
			}
			else{
				self.cScr += self.html.children[1].offsetHeight;
			}
			if(self.scrollDone === 0){
				self._makeScroll();
			}
		}
	},false); */
	
	
	
	function onWheel(event){
		
		if(IMM.mobile)
			return;
		
		if(self.freezed)
			return;
		
		event.preventDefault();
		//console.log(event);
		
		
		var delta = event.deltaY || event.detail || event.wheelDelta;
		
		if(delta > 0)
			delta = 120;
		if(delta < 0)
			delta = -120;
		
		var scrollLen = delta / 2;
		

		self.cScr += scrollLen;
	
		if(self.scrollDone === 0){
			self._makeScroll();
		}
		
		event.stopPropagation();
		

	}
	
	
	if (bodyBlock.parentNode.addEventListener) {
	  if ('onwheel' in document) {
		// IE9+, FF17+, Ch31+
		bodyBlock.parentNode.addEventListener("wheel", onWheel);
	  } else if ('onmousewheel' in document) {
		// устаревший вариант события
		bodyBlock.parentNode.addEventListener("mousewheel", onWheel);
	  } else {
		// Firefox < 17
		bodyBlock.parentNode.addEventListener("MozMousePixelScroll", onWheel);
	  }
	} else { // IE8-
	  bodyBlock.parentNode.attachEvent("onmousewheel", onWheel);
	}
	
	
	window.addEventListener('resize',function(){ 
	
		if(IMM.mobile)
			return;
		
		self._makeScroll(); 
		self._updateHandleHeight(); 
	},false);
	
	
}
scrolls.prototype.unfreeze = function(){
	this.freezed = 0;
	this._o.children[1].classList.add('active');
	this.mouseEntered = 1;
}
scrolls.prototype.freeze = function(){
	this.freezed = 1;
	this._o.children[1].classList.remove('active');
	this.mouseEntered = 0;
}
scrolls.prototype.trigger = function(w){
	var self = this;
	
	if(IMM.mobile)
		return;
	
	self.cScr = w;
	if(self.scrollDone === 0){
		self._makeScroll();
	}
}
scrolls.prototype._updateHandleHeight = function(){
	var self = this;
	
	if(IMM.mobile)
		return;
	
	var o = this._o;
	var handHeight = o.offsetHeight*(o.clientHeight/o.children[0].offsetHeight);
	
	this.scrollRatio = (o.clientHeight/o.children[0].offsetHeight);
	
	//var scrollHandHeight = this.scrollRatio * ul.offsetHeight;
	if(handHeight < 10)
		handHeight = 10;
	
	o.children[1].children[0].style.height = handHeight+'px';
}
scrolls.prototype._makeScroll = function(event){
	this.scrollDone = 1;
	var self = this;
	
	if(IMM.mobile)
		return;
	
	var o = this._o;
	
	var bblock = o;
	var scrollLine = o.children[1];
	var scrollHand = scrollLine.children[0];
	
	var ul = bblock;
	if(this.cScr < 0){
		this.cScr = 0;
	}
	if(this.cScr > ul.children[0].offsetHeight - ul.clientHeight){
		this.cScr = ul.children[0].offsetHeight - ul.clientHeight;
	}
	
	//console.log(ul.children[0].offsetHeight - ul.clientHeight);
	var plusScr;
		
	if(this.cScr != this.nScr){
		//alert(1);
		plusScr = this.cScr - this.nScr;
		if(Math.abs(plusScr) <= 0.5){
			plusScr = this.cScr - this.nScr;
			this.nScr = this.cScr;
		}
		else{
			plusScr /= 10;
			this.nScr += plusScr;
		}
		requestAnimationFrame(function(){ scrollNow(self.nScr); });
	}
	else{
		this.scrollDone = 0;
	}
	function scrollNow(pScr){
		
		//alert(pScr);
		pScr = parseInt(pScr);
		
		//scrollHand.style.top = pScr*self.scrollRatio+'px';
		scrollHand.style.transform = 'translate3d(0, '+(pScr*self.scrollRatio)+'px, 0)';
		//ul.children[0].style.marginTop = -pScr+'px';
		ul.children[0].style.transform = 'translate3d(0, '+(-pScr)+'px, 0)';
		
		var cevent = new CustomEvent('scroll', {detail:{cScr:self.cScr,nScr:self.nScr}});
		o.dispatchEvent(cevent);
		//ul.children[0].style.top = -pScr+'px';
		//ul.children[0].style.transform = 'translateY('+(-pScr)+'px)';
		
		if(self.callback)
			self.callback(pScr,plusScr);
		
		self._makeScroll();
	}
}



////////////////////////////////////////////////////////////////
///////////////////////CHECKS//////////////////////////////
////////////////////////////////////////////////////////////////

checks.prototype._animateCircs = function(){
	
	var self = this;
	var o = this._o;
	self.animStared = 1;
	
	
	var block = this._block;
	var limW = Math.sqrt(Math.pow((block.children[1].offsetWidth - 4) * 2,2) + Math.pow((block.children[1].offsetWidth - 4) * 2,2));
	
	
	
	function animate(){
		
		var arr = block.children[1].children;
		
		for(var i=0;i<arr.length;i++){
			var dx = parseInt(arr[i].getAttribute('data-x'));
			var dy = parseInt(arr[i].getAttribute('data-y'));
			var ow = arr[i].OW || 0;
			if(ow >= limW){
				if(arr[i].classList.contains('enabled')){
					block.children[1].classList.add('enabled');
				}
				else{
					block.children[1].classList.remove('enabled');
				}
				arr[i].parentNode.removeChild(arr[i]);
				i--;
			}
			else{
				var pmc = Math.ceil((limW - ow) / 35);
				var reW = ow + pmc;
				arr[i].style.width = reW+'px';
				arr[i].style.height = reW+'px';
				arr[i].style.top = dy - reW/2+'px';
				arr[i].style.left = dx - reW/2+'px';
				arr[i].OW = reW;
			}
		}
		
		if(arr.length)
			window.requestAnimationFrame(animate);
		else
			self.animStared = 0;
		
	}
	
	
	animate();
	
}
checks.prototype.getLayer = function(evt) {
  var el = evt.target;
   /*   x = 0,
      y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  x = evt.clientX - x;
  y = evt.clientY - y;
  return { x: x, y: y };*/
  var p = el.getBoundingClientRect();
  return {x:evt.clientX-p.x, y:evt.clientY-p.y};
  
}
checks.prototype.activate = function(){
	
	var self = this;
	var o = this._o;
	this._o.CHECK = this;
	
	this.animStared = 0;
	
	o.classList.add('dnone');
	
	var div = document.createElement('div');
	div.className = 'imm-check-block';
	
	this._block = div;
	
	var template = o.hasAttribute('data-template') ? o.getAttribute('data-template') : '';
	var labelText = o.hasAttribute('data-label') ? o.getAttribute('data-label') : '';
	
	if(!o.id)
		o.id = (o.getAttribute('name') || Math.random())+'_checkid';
	
	var labId = o.id;
	
	
	var labelCheck = document.createElement('label');
	var labelLab = document.createElement('label');
	
	labelCheck.onclick = function(event){
		var selfC = this;
		setTimeout(function(){
			if(o.checked){
				selfC.classList.add('active');
			}
			else{
				selfC.classList.remove('active');
			}
			
			//console.log(event);
			
			var sCirc = document.createElement('span');
			sCirc.className = 'imm-check-circ';
			var addCC = o.checked ? 'enabled' : 'disabled';
			sCirc.classList.add(addCC);
			var ley = self.getLayer(event);
			
			console.log(ley,"KEY");
			
			sCirc.setAttribute('data-x',ley.x);
			sCirc.setAttribute('data-y',ley.y);
			
			selfC.appendChild(sCirc);
			
			if(!self.animStared){
				self._animateCircs();
			}
		},0);
	}
	
	labelLab.onclick = function(){
		
		var selfC = labelCheck;
		setTimeout(function(){
			if(o.checked){
				selfC.classList.add('active');
			}
			else{
				selfC.classList.remove('active');
			}
			
			//console.log(event);
			
			var sCirc = document.createElement('span');
			sCirc.className = 'imm-check-circ';
			var addCC = o.checked ? 'enabled' : 'disabled';
			sCirc.classList.add(addCC);
			sCirc.setAttribute('data-x',10);
			sCirc.setAttribute('data-y',10);
			
			selfC.appendChild(sCirc);
			
			if(!self.animStared){
				self._animateCircs();
			}
		},0);
		
	}
	
	labelCheck.setAttribute('for',labId);
	labelLab.setAttribute('for',labId);
	
	labelCheck.className = 'imm-check-box'+' '+template;
	labelLab.className = 'imm-check-label';
	
	if(o.checked)
		labelCheck.classList.add('enabled');
	
	labelLab.innerHTML = labelText;
	
	o.parentNode.insertBefore(div,o);
	
	div.appendChild(o);
	div.appendChild(labelCheck);
	div.appendChild(labelLab);
	
}




////////////////////////////////////////////////////////////////
///////////////////////RADIOS//////////////////////////////
////////////////////////////////////////////////////////////////

rads.prototype._addActCirc = function(actCirc){
	var actBackBlock = document.getElementsByClassName('imm-radio-active-circles')[0];
	if(!actBackBlock){
		actBackBlock = document.createElement('div');
		actBackBlock.className = 'imm-radio-active-circles';
		document.body.appendChild(actBackBlock);
	}
	actBackBlock.appendChild(actCirc);
}

rads.prototype._getPos = function(obj){
	var x=0,y=0;
	do{
		x += (obj.offsetLeft);
		y += (obj.offsetTop);
	}while(obj = obj.offsetParent);
	return {x:x,y:y};
}

rads.prototype.activate = function(){
	
	var self = this;
	var o = this._o;
	this._o.RADIO = this;
	
	this.actItem = null;
	this.actCirc = document.createElement('div');
	this.actCirc.className = 'imm-radio-active-circle'+' '+template;
	
	this._addActCirc(self.actCirc);
	
	//this._o.RADIO = this;
	
	for(var i=0;i<o.length;i++){
		
		var template = o[i].hasAttribute('data-template') ? o[i].getAttribute('data-template') : '';
		var labelText = o[i].hasAttribute('data-label') ? o[i].getAttribute('data-label') : '';
		
		var radioBlock = document.createElement('div');
		var labelRad = document.createElement('label');
		var labelLab = document.createElement('label');
		
		
		
		radioBlock.className = 'imm-radio-block'+' '+template;
		labelRad.className = 'imm-radio-but';
		labelLab.className = 'imm-radio-label';
		
		labelLab.innerHTML = labelText;
		
		o[i].classList.add('dnone');
		
		
		if(!o[i].id)
			o[i].id = o[i].getAttribute('name')+'_'+i;
		
		var labId = o[i].id;
		
		labelRad.setAttribute('for',labId);
		labelLab.setAttribute('for',labId);
		
		o[i].parentNode.insertBefore(radioBlock,o[i]);
		
		radioBlock.appendChild(o[i]);
		radioBlock.appendChild(labelRad);
		radioBlock.appendChild(labelLab);
		
		o[i].onclick = function(){
			var trColor = this.hasAttribute('data-template') ? this.getAttribute('data-template') : '';
			var thiss = this;
			
			//alert(trColor);
			var oPos = self._getPos(this.parentNode.children[1]);
			self.actCirc.style.left = (oPos.x)+'px';
			self.actCirc.style.top = (oPos.y)+'px';
			var plusClasses = '';
			if(self.actCirc.classList.contains('active'))
				plusClasses = ' transit active';
			self.actCirc.className = 'imm-radio-active-circle' + plusClasses + ' ' + trColor;
			console.log(oPos.x+' '+oPos.y);
			if(!self.actCirc.classList.contains('active')){
				setTimeout(function(){ self.actCirc.classList.add('transit'); self.actCirc.classList.add('active');},100);
			}
		}
		
		if(o[i].checked){
			self.actItem = radioBlock;
			//console.log(self.actItem);
			(function(){
				setTimeout(function(){
					
					var oPos = self._getPos(self.actItem.children[1]);
					self.actCirc.style.left = parseInt(oPos.x)+'px';
					self.actCirc.style.top = parseInt(oPos.y)+'px';
					setTimeout(function(){ self.actCirc.classList.add('transit'); self.actCirc.classList.add('active');},100);
					
				},100);
			})();
			
		}
		
		
	}	
}


////////////////////////////////////////////////////////////////
///////////////////////SELECTS//////////////////////////////
////////////////////////////////////////////////////////////////

sels.prototype._makeScroll = function(){
	this.scrollDone = 1;
	var self = this;
	
	var bblock = self.html;
	var scrollLine = bblock.getElementsByClassName('scroll-line')[0];
	var scrollHand = scrollLine.children[0];
	
	var ul = bblock.children[1];
	if(this.cScr < 0){
		this.cScr = 0;
	}
	if(this.cScr > ul.children[0].offsetHeight - ul.offsetHeight + 2){
		this.cScr = ul.children[0].offsetHeight - ul.offsetHeight + 2;
	}
	
	console.log(ul.children[0].offsetHeight - ul.offsetHeight);
	
		
	if(this.cScr != this.nScr){
		//alert(1);
		var plusScr = this.cScr - this.nScr;
		if(Math.abs(plusScr) <= 1){
			this.nScr = this.cScr;
		}
		else{
			plusScr /= 10;
			this.nScr += plusScr;
		}
			
		requestAnimationFrame(function(){ scrollNow(self.nScr); });
	}
	else{
		this.scrollDone = 0;
	}
	function scrollNow(pScr){
		
		//alert(pScr);
		
		//scrollHand.style.top = pScr*self.scrollRatio+'px';
		//ul.children[0].style.marginTop = -pScr+'px';
		
		scrollHand.style.transform = 'translate3d(0, '+(pScr*self.scrollRatio)+'px, 0)';
		ul.children[0].style.transform = 'translate3d(0, '+(-pScr)+'px, 0)';
		
		
		
		self._makeScroll();
	}
}
sels.prototype._filter = function(){
	
	var self = this;
	
	var o = this._o;
	this._o.SEL = this;
	
	var bblock = this.html;
	var headBlock = bblock.children[0];
	var bodyBlock = bblock.children[1];
	
	var ul = bodyBlock.children[0];
	
	var searchStr = '';
	if(headBlock.children[0])
		searchStr = headBlock.children[0].children[0].value.trim();
	
	
	for(var i=0;i<ul.children.length;i++){
		var sInd = ul.children[i].getAttribute('data-inner').toLowerCase().indexOf(searchStr.toLowerCase());
		if(sInd + 1 || searchStr == '' || searchStr == '.'){
			ul.children[i].classList.remove('filtered');
			var defInn = ul.children[i].getAttribute('data-inner');
			if(searchStr == ''){
				ul.children[i].innerHTML = defInn;
			}
			else if(searchStr == '.'){
				ul.children[i].innerHTML = defInn;
				if(ul.children[i].classList.contains('active')){
					ul.children[i].classList.remove('filtered');
				}
				else{
					ul.children[i].classList.add('filtered');
				}
			}
			else{
				ul.children[i].innerHTML = '';
				ul.children[i].innerHTML += defInn.substr(0,sInd);
				ul.children[i].innerHTML += '<u>'+defInn.substr(sInd,searchStr.length)+'</u>';
				ul.children[i].innerHTML += defInn.substr(sInd+searchStr.length,defInn.length-(sInd+searchStr.length));
			}
		}
		else{
			ul.children[i].classList.add('filtered');
		}
	}
	
	setTimeout(function(){ self.resized(); },300);
	setTimeout(function(){ self.resized(); },500);
	
	this.cScr = 0;
	
	if(this.scrollDone === 0)
		this._makeScroll();
	
}
sels.prototype.activate = function(){
	
	var o = this._o;
	this._o.SEL = this;
	
	
	this.cScr = 0;
	this.scrollDone = 0;
	this.nScr = 0;
	this.focused = 0;
	this._updateInterval = null;
	
	var self  = this;
	
	this.inpsf = 0;
	
	var dataCount = o.hasAttribute('data-count') ? parseInt(o.getAttribute('data-count')) : 6;
	var dataSearch = o.hasAttribute('data-search') ? 1 : 0;
	var dataMulti = o.hasAttribute('multiple') ? 1 : 0;
	var dataDefaultSearch = o.hasAttribute('data-defaultsearch') ? o.getAttribute('data-defaultsearch') : 'Press Buttons To Search...';
	var labelText = o.hasAttribute('placeholder') ? o.getAttribute('placeholder') : '';
	var disabled = o.hasAttribute('disabled');
	
	this.disab = disabled;

	var bblock = document.createElement('div');
	bblock.className = 'imm-select-base-block';
	if(dataMulti)
		bblock.classList.add('multiselect');
	if(this.disab)
		bblock.classList.add('disabled');
	bblock.setAttribute('tabindex','1');
	var labelDiv = '';
	if(labelText != ''){
		labelDiv = '<label class="">'+labelText+'</label>';
	}
	bblock.innerHTML = '<div class="imm-select-head-block"></div><div class="imm-select-body-block"><ul></ul><div class="scroll-line"><div class="scroll-line-hand"></div></div></div>'+labelDiv;
	
	if(IMM.mobile)
		bblock.classList.add('mobile');
	
	var bodyBlock = bblock.children[1].children[0];
	var headBlock = bblock.children[0];
	
	
	if(dataSearch){
		//console.log(headBlock);
		headBlock.innerHTML = '<div data-default="'+dataDefaultSearch+'" class="imm-select-searchbar"><input class="def-search" type="text"></div>';
	}
		
	this.html = bblock;
	
	
	if(dataSearch){
		headBlock.children[0].children[0].addEventListener('keyup',function(){
			self._filter();
		},false);
	}
	
	
	bblock.addEventListener('mousedown',function(e){
		e.stopPropagation();
	},false);
	bblock.addEventListener('focus',function(){
		
		if(this.classList.contains('active') || this.classList.contains('disabled'))
			return;
		
		this.classList.add('active');
		this.classList.add('pinned');
		
		setTimeout(function(){ self.resized(); },300);
		headBlock.classList.add('active');
		self.focused = 1;
		
		if(dataSearch){
			headBlock.getElementsByClassName("def-search")[0].value = '';
			self._filter();
		}
		
		var absY = 0;
		var absH = document.body.offsetHeight || document.document.body.offsetHeight;
		bbP = this;
		do{
			if(bbP.classList.contains('imm-scroll-in')){
				absH = bbP.offsetHeight;
				break;
			}
			absY+=bbP.offsetTop;
		}while(bbP = bbP.offsetParent);
		
		document.body.addEventListener('mousedown',closeSelect,false);
		
		//console.log(absH);
		
		setTimeout(function(){
			try{
				if(!IMM.mobile)
					headBlock.children[0].children[0].focus();
			}
			catch(e){}
		},300);
		
		var limit = dataCount;
		var elC = this.children[1].children[0].children.length;
		
		if(elC<limit)
			limit = elC;
		//console.log(absH+" "+(absY + (limit+1)*50));
		if(absY + (limit+1)*50 > absH){
			this.classList.add('inverted');
		}
		
		self._updateInterval = setInterval(function(){ self.resized(); },500);
		
	},false);
	function closeSelect(e,force){
		
		var el = e.target;
		
		if(!force)
			do{
				if(el.classList.contains('imm-select-base-block'))
					return;
				el = el.parentNode;
			}while(el && el != document.body);

		
		var sblock = bblock;
		
		sblock.classList.remove('active');
		
		setTimeout(function(){
			sblock.classList.remove('inverted');
			sblock.classList.remove('pinned');
		},300);
		
		bblock.children[1].children[0].style.transform = 'translate3d(0,0,0)';
		self.cScr = 0;
		self.nScr = 0;
		self.scrollDone = 0;
		self.focused = 0;
		self.html.getElementsByClassName("scroll-line")[0].classList.remove('active');
		self.html.getElementsByClassName("scroll-line")[0].children[0].style.transform = 'translate3d(0,0,0)';
		clearInterval(self._updateInterval);
		
		
		if(bodyBlock.getElementsByClassName('active').length){
			bblock.classList.add('items-selected');
		}
		else{
			bblock.classList.remove('items-selected');
		}
		document.body.removeEventListener('mousedown',closeSelect,false);
	}
	
	
	var scrollLineBlock = self.html.getElementsByClassName("scroll-line")[0];
	var scrollLineHand = scrollLineBlock.children[0];
	
	
	var handleT = 0;
	var oldY;
	scrollLineHand.addEventListener('mousedown',function(event){
		handleT = 1;
		oldY = event.pageY;
		window.addEventListener('mousemove',scrMM,false);
		window.addEventListener('mouseup',scrMU,false);
	},false);
	
	function scrMM(event){
		if(handleT){
			var newY = event.pageY;
			var plusPxs = newY-oldY;
			oldY = newY;
			
			var plusReal = plusPxs/self.scrollRatio;
			
			self.cScr += plusReal;
			
			if(self.cScr < 0){
				self.cScr = 0;
			}
			if(self.cScr > bodyBlock.offsetHeight - bodyBlock.parentNode.offsetHeight){
				self.cScr = bodyBlock.offsetHeight - bodyBlock.parentNode.offsetHeight;
			}
			
			
			self.nScr = self.cScr;
			
			//scrollLineHand.style.top = self.nScr*self.scrollRatio+'px';
			//bodyBlock.style.marginTop = -self.nScr+'px';
			scrollLineHand.style.transform = 'translate3d(0, '+(self.nScr*self.scrollRatio)+'px, 0)';
			bodyBlock.style.transform = 'translate3d(0, '+(-self.nScr)+'px, 0)';
		}
	}
	function scrMU(event){
		handleT = 0;
		window.removeEventListener('mousemove',scrMM,false);
		window.removeEventListener('mouseup',scrMU,false);
	}
	
	
	
	scrollLineBlock.addEventListener('mousedown',function(event){
		if(!handleT){
			var clTop = event.offsetY;
			if(clTop < self.nScr){
				self.cScr -= self.html.children[1].offsetHeight;
			}
			else{
				self.cScr += self.html.children[1].offsetHeight;
			}
			if(self.scrollDone === 0){
				self._makeScroll();
			}
		}
	},false);
	
	
	
	function onWheel(event){
		
		if(IMM.mobile)
			return;
		
		event.preventDefault();
		event.stopPropagation();
		//console.log(event);
		
		
		var delta = event.deltaY || event.detail || event.wheelDelta;
		
		if(delta > 0)
			delta = 120;
		if(delta < 0)
			delta = -120;
		
		var scrollLen = delta / 2;
		
		
		self.cScr += scrollLen;
		
		if(self.scrollDone === 0){
			self._makeScroll();
		}
	}
	
	
	if (bodyBlock.addEventListener) {
	  if ('onwheel' in document) {
		bodyBlock.addEventListener("wheel", onWheel);
	  } else if ('onmousewheel' in document) {
		bodyBlock.addEventListener("mousewheel", onWheel);
	  } else {
		bodyBlock.addEventListener("MozMousePixelScroll", onWheel);
	  }
	} else {
	  bodyBlock.attachEvent("onmousewheel", onWheel);
	}
		
	
	
	
	var wasAct = 0;
	//alert(o.options.length);
	
	for(var i=0;i<o.options.length;i++){
		var inb = document.createElement('li');
		inb.innerHTML = o.options[i].innerHTML;
		inb.setAttribute('data-val',o.options[i].value);
		inb.setAttribute('data-inner',o.options[i].innerHTML);
		inb.onclick = function(e){
			
			if(!dataMulti){
				for(var j=0;j<bodyBlock.children.length;j++){
					bodyBlock.children[j].classList.remove('active');
				}
				this.classList.add('active');
				bodyBlock.parentNode.parentNode.blur();
				closeSelect(e,1);
			}
			else{
				this.classList.toggle('active');
			}
			
		
			var clIndex = Array.prototype.indexOf.call(bodyBlock.children,this);
			
			if(this.classList.contains('active'))
				o.options[clIndex].selected = true;
			else{
				var searchStr = '';
				if(headBlock.children[0])
					searchStr = headBlock.children[0].children[0].innerHTML.trim();
				o.options[clIndex].selected = false;
				if(searchStr == '.')
					this.classList.add('filtered');
			}
			
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			o.dispatchEvent(evt);

		}
		if(o.options[i].selected){
			inb.classList.add('active');
			wasAct = 1;
			//bblock.children[0].innerHTML = '';
			//headBlock.innerHTML = o.options[i].innerHTML;
		}
		bodyBlock.appendChild(inb);
		
	}
	
	if(wasAct)
		bblock.classList.add('items-selected');
	
	
	var elHeight;


	setTimeout(function(){
		elHeight = 50;
		bodyBlock.parentNode.style.maxHeight = dataCount*elHeight+'px';
		//bodyBlock.parentNode.setAttribute('data-maxheight',dataCount*elHeight);
	},0);
	
	
	
	o.classList.add('dnone');
	
	
	o.parentNode.insertBefore(bblock,o);
	

	
}
sels.prototype.reload = function(){
	var o = this._o;
	
	var dataMulti = o.hasAttribute('multiple') ? 1 : 0;
	var bblock = this.html;
	var bodyBlock = bblock.children[1].children[0];
	var headBlock = bblock.children[0];
	
	while(bodyBlock.children[0])
		bodyBlock.removeChild(bodyBlock.children[0]);
	
	for(var i=0;i<o.options.length;i++){
		var inb = document.createElement('li');
		inb.innerHTML = o.options[i].innerHTML;
		inb.setAttribute('data-val',o.options[i].value);
		inb.setAttribute('data-inner',o.options[i].innerHTML);
		inb.onclick = function(){
			if(!dataMulti){
				for(var j=0;j<bodyBlock.children.length;j++){
					bodyBlock.children[j].classList.remove('active');
				}
				this.classList.add('active');
				bodyBlock.parentNode.parentNode.blur();
				closeSelect();
			}
			else{
				this.classList.toggle('active');
			}
			
		
			var clIndex = Array.prototype.indexOf.call(bodyBlock.children,this);
			
			console.log("CLINDEX ",clIndex,o,o.children[clIndex]);
			
			if(this.classList.contains('active'))
				o.options[clIndex].selected = true;
			else{
				var searchStr = '';
				if(headBlock.children[0])
					searchStr = headBlock.children[0].children[0].innerHTML.trim();
				o.options[clIndex].selected = false;
				if(searchStr == '.')
					this.classList.add('filtered');
			}
			
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			o.dispatchEvent(evt);

		}
		if(o.options[i].selected){
			inb.classList.add('active');
			wasAct = 1;
			//bblock.children[0].innerHTML = '';
			//headBlock.innerHTML = o.options[i].innerHTML;
		}
		bodyBlock.appendChild(inb);
		
	}
}
sels.prototype.resized = function(){
	var o = this._o;
	var bblock = this.html;
	
	
	
	var scrollLine = bblock.getElementsByClassName('scroll-line')[0];
	
	var ul = bblock.getElementsByClassName("imm-select-body-block")[0];
	
	//alert(ul.offsetWidth-ul.clientWidth);
	if(ul.offsetHeight < ul.children[0].offsetHeight){
		scrollLine.classList.add('active');
		
	}
	else{
		scrollLine.classList.remove('active');
	}
	this.scrollRatio = ul.offsetHeight / ul.children[0].offsetHeight;
	
	var scrollHandHeight = this.scrollRatio * ul.offsetHeight;
	if(scrollHandHeight < 10)
		scrollHandHeight = 10;
	scrollLine.children[0].style.height = scrollHandHeight+'px';
	//alert(ul.offsetHeight+' '+ul.scrollHeight);
	
}

////////////////////////////////////////////////////////////////
///////////////////////INPUTS////////////////////////////////
////////////////////////////////////////////////////////////////
inps.prototype.activate = function(){
	var o  = this._o;
	this._o.INP = this;
	
	var self = this;
	
	var inp = o;
	
	/*
	var dAdvenced = 0;
	
	if(inp.hasAttribute('data-advenced')){
		dAdvenced = intval(inp.getAttribute('data-advenced'));
		var dCustom = inp.getAttribute('data-custom');
		var dCharCount = inp.getAttribute('data-chars');
		var dArray = inp.getAttribute('data-array');
	}
	*/
	
	inp.classList.remove('imm-input');
	var div = document.createElement('div');
	div.className = 'imm-input m-t-20';
	//div.className = inp.className;
	div.classList.add('m-t-20');
	//inp.className = '';
	
	var labelText = inp.getAttribute('placeholder');
	inp.removeAttribute('placeholder');
	
	var label = document.createElement('label');
	label.innerHTML = labelText;
	
	inp.parentNode.insertBefore(div,inp);
	div.appendChild(inp);
	div.appendChild(label);
	
	var infoText = inp.getAttribute('data-info');
	if(infoText){
		var span = document.createElement('span');
		span.classList.add('imm-input-info');
		span.innerHTML = '<span>'+infoText+'</span>';
		div.appendChild(span);
	}
	
	this._o = div;
	o = div;
	
	if(inp.value.length > 0){
		inp.classList.add('active');
	}
	
	inp.onchange = function(){
		this.value = this.value.trim();
		if(this.value.length > 0){
			this.classList.add('active');
		}
		else{
			this.classList.remove('active');
		}
	}
	
}

inps.prototype.check = function(){
	var o  = this._o;
	var inp = o.children[0];
	inp.value = inp.value.trim();
	if(inp.value.length > 0){
		inp.classList.add('active');
	}
	else{
		inp.classList.remove('active');
	}
}

////////////////////////////////////////////////////////////////
///////////////////////TABS///////////////////////////////////
////////////////////////////////////////////////////////////////
tabs.prototype.activate = function(){
	var o = this._o;
	this._o.TAB = this;
	this.tabsh = o.getElementsByClassName("tab");
	this.tabsb = o.getElementsByClassName("tab-b");
	
	var self = this;
	
	for(var i=0;i<this.tabsh.length;i++){
		this.tabsh[i].addEventListener('click',function(){
			self.setTab(this);
		},true);
	}
	
	//IMM.all.tabs.push(this._o);
}
tabs.prototype.setTab = function(tid){
		
	var h = this.tabsh;
	var o = this._o;
	var b = this.tabsb;
	
	var id = tid;
	
	var ho;
	
	//alert(typeof tid);
	
	if(typeof tid == 'object'){
		ho = tid;
	}
	else{
		ho = h[tid];
	}

	var act = ho.getAttribute('data-action');
	if(act && act.trim() != ''){
		id = parseInt(act);
	}
	else{
		id = Array.indexOf.call(h,ho);
	}
	
	var findTab = o.getElementsByClassName("tb-"+id)[0];
	if(!findTab){
		findTab = b[id];
	}
	
	for(var i=0;i<h.length;i++){
		h[i].classList.remove('active');
		b[i].classList.remove('active');
	}
	
	ho.classList.add('active');
	findTab.classList.add('active');
	
}


////////////////////////////////////////////////////////////////
///////////////////////DATEPICKER///////////////////////////////
////////////////////////////////////////////////////////////////
datepickers.prototype.activate = function(){
	var o = this._o;
	this._o.DP = this;
	var self = this;
	
	var dateContainer = document.createElement('div');
	dateContainer.classList.add('imm-datepicker-container');
	o.parentNode.insertBefore(dateContainer,o);
	dateContainer.appendChild(o);
	
	var infoText = o.getAttribute('data-info');
	if(infoText){
		var span = document.createElement('span');
		span.classList.add('imm-input-info');
		span.innerHTML = '<span>'+infoText+'</span>';
		dateContainer.appendChild(span);
	}
	
	o.onfocus = function(){
		self.opendialog();
	};
	o.onblur = function(){
		self.closedialog();
	}
	var self = this;
	this.update();
}
datepickers.prototype.update = function(f){
	var o = this._o;
	var d = this.returndate(o.getAttribute('data-time'));
	o.value = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).substr(-2)+'-'+('0'+d.getDate()).substr(-2);
}
datepickers.prototype.opendialog = function(w,dr){
	var o = this._o;
	if(!w)
		var d = this.returndate(o.getAttribute('data-time'));
	else
		var d = w;
	
	if(!dr)
		dr = this.returndate(o.getAttribute('data-time'));
	
	var dBlock = this._createDialog(d,dr);
	this.dialog = dBlock;
	o.parentNode.appendChild(dBlock);
}
datepickers.prototype.returndate = function(time){
	time = parseInt(time);
	if(!time)
		return new Date();
	else
		return new Date(time);
}
datepickers.prototype.loc = {
	months:["January","February","March","April","May","June","July","August","September","October","November","December"]
};
datepickers.prototype._createDialog = function(d,dr){
	var o = this._o;
	if(this.dialog)
		this.dialog.parentNode.removeChild(this.dialog);
	var self = this;
	var pos = {x:0,y:0};
	var el = o;
	do{
		pos.x += el.offsetLeft;
		pos.y += el.offsetTop;
	}while(el = el.offsetParent);
	var dialogBlock = document.createElement('div');
	dialogBlock.classList.add('imm-datepicker-dialog-container');
	//dialogBlock.style.top = pos.y+o.offsetHeight+'px';
	//dialogBlock.style.left = pos.x+'px';
	dialogBlock.style.left = 0;
	dialogBlock.style.top = 100+'%';
	dialogBlock.innerHTML = '<div class="imm-dp-dialog-head"><div class="imm-dp-head-top"><div class="imm-dp-head-left"></div><div class="imm-dp-head-mid"><span>'+d.getFullYear()+'</span></div><div class="imm-dp-head-right"></div></div><div class="imm-dp-head-bottom"><div class="imm-dp-head-left"></div><div class="imm-dp-head-mid"><span>'+this.loc.months[(d.getMonth())]+'</span></div><div class="imm-dp-head-right"></div></div></div><div class="imm-dp-dialog-body"><div class="imm-dp-body-inn"></div></div><div class="imm-dp-dialog-footer"></div>';
	dialogBlock.addEventListener('mousedown',function(e){ e.preventDefault(); return false; },false);
	
	var drYear = dr.getFullYear();
	var drMonth = dr.getMonth();
	var drDate = dr.getDate();
	
	var dd = new Date(d.getTime());
	dd.setDate(1);
	
	var td = new Date();
	var tdYear = td.getFullYear();
	var tdMonth = td.getMonth();
	var tdDate = td.getDate();
	
	var dYear = dd.getFullYear();
	var dMonth = dd.getMonth();
	
	var bodyBlock = dialogBlock.children[1].children[0];
	var dayInMonth = 32 - new Date(dd.getFullYear(), dd.getMonth(), 32).getDate();
	
	var dayOfWeek = dd.getDay();
	while(dayOfWeek--){
		var divDay = document.createElement('div');
		divDay.classList.add('none');
		bodyBlock.appendChild(divDay);
	}
	
	for(var i=0;i<dayInMonth;i++){
		var divDay = document.createElement('div');
		divDay.innerHTML = (i+1);
		if(dYear == drYear && dMonth == drMonth && drDate == i+1)
			divDay.classList.add('now');
		if(dYear == tdYear && dMonth == tdMonth && tdDate == i+1)
			divDay.classList.add('today');
		divDay.addEventListener('click',function(){
			var nowDay = this.parentNode.getElementsByClassName("now")[0];
			if(nowDay)
				nowDay.classList.remove('now');
			this.classList.add('now');
			o.setAttribute('data-time',(new Date(dYear,dMonth,this.innerHTML).getTime()));
			o.value = dYear+'-'+(dMonth+1)+'-'+this.innerHTML;
		},false);
		bodyBlock.appendChild(divDay);
	}
	
	
	dialogBlock.children[0].children[1].children[0].addEventListener('click',function(){
		dd.setMonth(dd.getMonth()-1);
		self.opendialog(dd,dr);
	},false);
	dialogBlock.children[0].children[1].children[2].addEventListener('click',function(){
		dd.setMonth(dd.getMonth()+1);
		self.opendialog(dd,dr);
	},false);
	
	dialogBlock.children[0].children[0].children[0].addEventListener('click',function(){
		dd.setFullYear(dd.getFullYear()-1);
		console.log(dd.getFullYear());
		self.opendialog(dd,dr);
	},false);
	dialogBlock.children[0].children[0].children[2].addEventListener('click',function(){
		dd.setFullYear(dd.getFullYear()+1);
		self.opendialog(dd,dr);
	},false);
	
	return dialogBlock;
}
datepickers.prototype.closedialog = function(){
	if(this.dialog)
		this.dialog.parentNode.removeChild(this.dialog);
	this.dialog = null;
	
	if("createEvent" in document){
		var ev = document.createEvent("HTMLEvents");
		ev.initEvent('change',false,true);
		this._o.dispatchEvent(ev);
	}
	else{
		this._o.fireEvent('change');
	}
}



////////////////////////////////////////////////////////////////
///////////////////////NUMBER///////////////////////////////////
////////////////////////////////////////////////////////////////
numbers.prototype.activate = function(){
	var o = this._o;
	this._o.DP = this;
	var self = this;
	
	
	this.maxp = 3;
	
	var nContainer = document.createElement('div');
	nContainer.classList.add('imm-number-container');
	o.parentNode.insertBefore(nContainer,o);
	nContainer.appendChild(o);
	var self = this;
	
	var filterN = function(){
		
		if(isNaN(parseFloat(this.value.trim())))
			return;
		
		if(this.value.indexOf('.') == this.value.length-1)
			return;
		
		if(this.value.trim() == '' || this.value.trim() == '-')
			return;
			
		//alert(1);
		if(isNaN(this.value))
			this.value = parseInt(this.value) || 0;
		
		if("createEvent" in document){
			var ev = document.createEvent("HTMLEvents");
			ev.initEvent('change',false,true);
			this.dispatchEvent(ev);
		}
		else{
			this.fireEvent('change');
		}
	}
	
	o.addEventListener('change',function(){ this.value = parseFloat(this.value) || 0; if(!self.pushed) idiv.children[0].innerHTML = this.value; self.val = parseFloat(this.value); },false);
	o.addEventListener('keydown',function(){ var slf = this; setTimeout(function(){ filterN.call(slf); },0); },false);
	o.addEventListener('keypress',function(){ var slf = this; setTimeout(function(){ filterN.call(slf); },0); },false);
	//o.addEventListener('keydown',filterN,false);
	o.addEventListener('keyup',filterN,false);
	o.addEventListener('input',filterN,false);
	
	
	var idiv = document.createElement('div');
	idiv.classList.add('imm-number-counter');
	idiv.innerHTML = '<span></span>';
	nContainer.appendChild(idiv);
	
	this.counter = idiv;
	
	var pdiv = document.createElement('div');
	pdiv.classList.add('imm-number-picker');
	//pdiv.innerHTML = '<span>1</span>';
	nContainer.appendChild(pdiv);
	
	this.picked = 1;
	this.p = 0;
	
	this.picker = pdiv;
	
	filterN.call(o);
	
	this.pushed = 0;
	
	this.block = nContainer;
	
	var infoText = o.getAttribute('data-info');
	if(infoText){
		var span = document.createElement('span');
		span.classList.add('imm-input-info');
		span.innerHTML = '<span>'+infoText+'</span>';
		nContainer.appendChild(span);
	}
	
	
	this._fMove = function(e){
		self._moveEvent.call(self,e);
	}
	this._fUp = function(e){
		self._upEvent.call(self,e);
	}
	this._fCm = function(e){
		self._contextEvent.call(self,e);
	}
	this._fKd = function(e){
		e.preventDefault();
		var n = 1;
		if(e.shiftKey)
			n *= 10;
		if(e.ctrlKey)
			n *= 100;
		if(e.altKey)
			n = 1/n/10;
		if(this.p != n)
			self._contextEvent.call(self,n);
	}
	
	
	pdiv.addEventListener('mousedown',function(e){
		e.preventDefault();
		if(e.which != 1)
			return;
		self.pushed = 1;
		self.p = 1;
		self.picked = 1;
		self.pos = self.cur = {x:e.clientX,y:e.clientY};
		self.block.classList.add('active');
		window.addEventListener('mousemove',self._fMove,false);
		window.addEventListener('mouseup',self._fUp,false);
		window.addEventListener('contextmenu',self._fCm,false);
		window.addEventListener('keydown',self._fKd,false);
		window.addEventListener('keyup',self._fKd,false);
		window.addEventListener('keypress',self._fKd,false);
		var pickerDiv = self.createPickerPlace();
		self.pid = pickerDiv;
		self.picker.appendChild(pickerDiv);
		return false;
	});
}
numbers.prototype._moveEvent = function(e){
	this.cur = {x:e.clientX,y:e.clientY};
	
	//console.log(this.picked);
	this.calcNumber();
	this.changeVis();
	this.calcPicker();
}
numbers.prototype._upEvent = function(e){
	//var self = IMM.NUMBER.prototype;
	if(e.which != 1)
		return;
	this.pushed = 0;
	this.block.classList.remove('active');
	//this.setPicker(1);
	//this.p = 0;
	
	if(this.pid)
		this.pid.parentNode.removeChild(this.pid);
	this.pid = null;
	window.removeEventListener('mousemove',this._fMove,false);
	window.removeEventListener('mouseup',this._fUp,false);
	window.removeEventListener('contextmenu',this._fCm,false);
	window.removeEventListener('keydown',this._fKd,false);
	window.removeEventListener('keyup',this._fKd,false);
	window.removeEventListener('keypress',this._fKd,false);
}
numbers.prototype._contextEvent = function(n){
	this.calcPicker(n);
}
numbers.prototype.createPickerPlace = function(){
	
	var sp = document.createElement('span');
	sp.classList.add('imm-number-pick-nb');
	
	var span = document.createElement('span');
	span.classList.add('imm-number-pick-n');
	
	sp.appendChild(span);
	
	var revP = 1/this.p;
	
	var v = this.val;
	v = Math.floor((v)*revP)/revP;
	var di = document.createElement('i');
	di.innerHTML = v;
	di.classList.add('imm-number-pi');
	span.appendChild(di);
	
	//v += 4;
	for(var i=1;i<5;i++){
		var ip = i*this.picked;
		di = document.createElement('i');
		di.classList.add('imm-number-pi');
		di.innerHTML = parseFloat((parseFloat((v + ip)*revP)/revP).toFixed(12));
		span.appendChild(di);
		di = document.createElement('i');
		di.classList.add('imm-number-pi');
		di.innerHTML = parseFloat((parseFloat((v - ip)*revP)/revP).toFixed(12));
		span.insertBefore(di,span.children[0]);
	}

	span.D = this.picked;	
	span.P = 0;
	
	return sp;
}
numbers.prototype.rebuildPicks = function(){
	var revP = 1/this.p;
	for(var i=0;i<this.picker.children[0].children.length;i++){
		var pp = this.picker.children[0].children[i];
		var v = this.val;
		v = Math.floor((v)*revP)/revP;
		var pd = Math.floor((pp.D)*revP)/revP;
		var k = ((v*revP)-4*(pd*revP))/revP;
		
		k = parseFloat(k.toFixed(12));
		//k = Math.floor((k)*revP)/revP;
		for(var j=0;j<pp.children.length;j++){
			//k = Math.floor((k)*revP)/revP;
			pp.children[j].innerHTML = k;
			k = parseFloat((((k*revP)+(pd*revP))/revP).toFixed(12));
			//k+=pd;
		}
	}
}
numbers.prototype.calcPicker = function(t){
	//var movedX = parseInt((this.cur.x-this.pos.x)/30);
	
	//console.log(this.pos.x);
	
	
	
	if(t){
		/*
		var p = parseInt(this.p);
		p ++;
		if(p < 0)
			p = this.maxp;
		if(p > this.maxp)
			p = 0;
		this.p = p;
		var num = Math.pow(10,p);
		*/
		
		var p = t;
		this.p = p;
		this.pos.x = this.cur.x;
		var num = p;
		this.setPicker(num);
	
	}

	var movedY = parseInt(this.cur.y-this.pos.y);
	for(var i=0;i<this.picker.children[0].children.length;i++){
		var pp = this.picker.children[0].children[i];
		pp.P = movedY+'px';
		pp.style.top = movedY+'px';
	}

}
numbers.prototype.calcNumber = function(){
	var v = Math.round((this.pos.y-this.cur.y)/15);
	//console.log(v);
	if(v !== 0){
		// console.log(v+' '+this.picked+' '+parseFloat(v*this.picked));
		this.pos.y -= v*15;
		this.val = parseFloat((parseFloat(this.val)+parseFloat(v*this.picked)).toFixed(10));
		this._o.value = this.val;
		if("createEvent" in document){
			var ev = document.createEvent("HTMLEvents");
			ev.initEvent('change',false,true);
			this._o.dispatchEvent(ev);
		}
		else{
			this._o.fireEvent('change');
		}
		this.rebuildPicks();
	}
}
numbers.prototype.setPicker = function(num){
	//this.picker.children[0].innerHTML = num;
	
	if(this.picked == num)
		return;
	
	this.picked = num;
	var np = this.createPickerPlace();
	
	if(this.pid){
		np.children[0].style.left = 100+'%';
		this.pid.appendChild(np.children[0]);
		var pd = this.pid;
		
		var pdO = pd.children[pd.children.length-2];
		var pdN = pd.children[pd.children.length-1];

		pdN.P = pdO.P;
		pdN.style.top = pdN.P+'px';
		
		setTimeout(function(){
			pdO.style.left = -100+'%';
			pdN.style.left = 0;
		},50);
		setTimeout(function(){
			pd.removeChild(pdO);
		},200);
	}
	else{
		this.picker.appendChild(np);
	}
	//this.rebuildPicks();
}
numbers.prototype.changeVis = function(){
	this.counter.children[0].innerHTML = this.val;
}



////////////////////////////////////////////////////////////////
///////////////////////COLORS///////////////////////////////////
////////////////////////////////////////////////////////////////
colors.prototype.activate = function(){
	var o = this._o;
	this._o.DP = this;
	var self = this;
	
	var nContainer = document.createElement('div');
	nContainer.classList.add('imm-color-container');
	o.parentNode.insertBefore(nContainer,o);
	nContainer.appendChild(o);
	var self = this;
	
	var indecDiv = document.createElement('div');
	this.indec = indecDiv;
	indecDiv.classList.add('imm-color-indec');
	nContainer.appendChild(indecDiv);
	
	var pdiv = document.createElement('div');
	pdiv.classList.add('imm-color-picker');
	pdiv.innerHTML = '<i class="fa fa-paint-brush" aria-hidden="true"></i>';
	nContainer.appendChild(pdiv);
	
	var infoText = o.getAttribute('data-info');
	if(infoText){
		var span = document.createElement('span');
		span.classList.add('imm-input-info');
		span.innerHTML = '<span>'+infoText+'</span>';
		nContainer.appendChild(span);
	}
	
	this.opened = 0;
	
	this.block = nContainer;
	
	this.initColor(1);
	
	this.cLeftWidth = 10;
	this.cLeftHeight = 110;
	this.cRightWidth = 200;
	this.cRightHeight = 128;
	
	this.updateControlValues();
	
	/*o.addEventListener('change',function(){
		
	});*/
	
	o.addEventListener('keyup',function(){
		self.initColor();
		self.renderPicker();
	});
	
	o.addEventListener('blur',function(){
		self.initColor(1);
		self.renderPicker();
		self.removeBlock();
	});
	o.addEventListener('focus',function(){
		self.createBlock();
	},false);
	
}
colors.prototype.initColor = function(t){
	var o = this._o;
	var val = o.value;
	val = val.replace(/\s*/g,'');
	//alert(val);
	var reg = /^(rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\))|(\#(([0-9a-fA-F]{3}|[0-9a-fA-F]{6})))$/;
	if(!reg.test(val)){
		if(t){
			this.color = '#f00';
			o.value = this.color;
			this.updateControlValues();
		}
	}
	else{
		this.color = val;
		if(t)
			o.value = this.color;
		this.updateControlValues();
	}
		
}
colors.prototype.updateControls = function(){
	
	
	//console.log(this.scolor);
	
	this.cr.parentNode.children[1].style.top = (this.scolor*100)+'%';
	this.cl.parentNode.children[1].style.top = ((1-this.vcolor)*100)+'%';
	this.cl.parentNode.children[1].style.right = (this.hcolor*100)+'%';
	this.cm.parentNode.children[1].style.top = ((1-this.acolor)*100)+'%';
	
}
colors.prototype._crmu = function(e){
	window.removeEventListener('mousemove',this._crmmE,false);
	window.removeEventListener('mouseup',this._crmuE,false);	
	window.removeEventListener('touchmove',this._crmmE,false);
	window.removeEventListener('touchend',this._crmuE,false);
}
colors.prototype._crmm = function(e){
	var y = this._crmmO.v - (this._crmmO.y - (e.changedTouches ? e.changedTouches[0].pageY : e.pageY));
	if(y < 0)
		y = 0;
	if(y > this._crmmO.m)
		y = this._crmmO.m;
	
	y/=this._crmmO.m;
	
	//console.log('y '+y);
	
	var ry = (y*6)%6;
	var r = 255,g = 0,b = 0;
	var ryc = Math.floor(ry);
	if(ryc === 0){
		r = 255;
		g = 255*(ry-ryc);
		b = 0;
	}
	else if(ryc === 1){
		r = 255-255*(ry-ryc);
		g = 255;
		b = 0;
	}
	else if(ryc === 2){
		r = 0;
		g = 255;
		b = 255*(ry-ryc);
	}
	else if(ryc == 3){
		r = 0;
		g = 255-255*(ry-ryc);
		b = 255;
	}
	else if(ryc == 4){
		r = 255*(ry-ryc);
		g = 0;
		b = 255;
	}
	else if(ryc == 5){
		r = 255;
		g = 0;
		b = 255-255*(ry-ryc);
	}
	
	var rrx = Math.round(r);
	var rrg = Math.round(g);
	var rrb = Math.round(b);
	
	this.rcolor = 'rgb('+rrx+','+rrg+','+rrb+')';
	this.scolor = y;
	this.carr = [r,g,b];
	
	this.updateColorFromControls();
	this.renderPicker();
	
	this.callChange();
	//this.updateControls();
}
colors.prototype._clmm = function(e){
	var y = this._clmmO.vy + (this._clmmO.y - (e.changedTouches ? e.changedTouches[0].pageY : e.pageY));
	if(y < 0)
		y = 0;
	if(y > this._clmmO.my)
		y = this._clmmO.my;
	
	var x = this._clmmO.vx + (this._clmmO.x - (e.changedTouches ? e.changedTouches[0].pageX : e.pageX));
	if(x < 0)
		x = 0;
	if(x > this._clmmO.mx)
		x = this._clmmO.mx;
	
	y/=this._clmmO.my;
	x/=this._clmmO.mx;
	
	this.vcolor = y;
	this.hcolor = x;
	
	this.updateColorFromControls();
	this.renderPicker();
	
	this.callChange();
}
colors.prototype._clmu = function(e){
	window.removeEventListener('mousemove',this._clmmE,false);
	window.removeEventListener('mouseup',this._clmuE,false);
	window.removeEventListener('touchmove',this._clmmE,false);
	window.removeEventListener('touchend',this._clmuE,false);
}
colors.prototype._cmmm = function(e){
	
	//e.preventDefault();
	
	/*console.log(e.pageY);
	if(e.changedTouches)
		console.log(e.changedTouches[0].pageY);*/
	
	var y = this._cmmmO.v + (this._cmmmO.y - (e.changedTouches ? e.changedTouches[0].pageY : e.pageY));
	if(y < 0)
		y = 0;
	if(y > this._cmmmO.m)
		y = this._cmmmO.m;
	
	y/=this._cmmmO.m;
	
	y = parseInt(y*100)/100;
	
	this.acolor = y;
	
	this.updateColorFromControls();
	this.renderPicker();
	
	this.callChange();
}
colors.prototype._cmmu = function(e){
	window.removeEventListener('mousemove',this._cmmmE,false);
	window.removeEventListener('mouseup',this._cmmuE,false);	
	window.removeEventListener('touchmove',this._cmmmE,false);
	window.removeEventListener('touchend',this._cmmuE,false);
}
colors.prototype.updateColorFromControls = function(){
	
	var r = this.carr[0];
	var g = this.carr[1];
	var b = this.carr[2];
	
	
	if(isNaN(this.hcolor)){
		this.hcolor = 0;
	}
	
	
	r = 255-(255-r)*(1-this.hcolor);
	g = 255-(255-g)*(1-this.hcolor);
	b = 255-(255-b)*(1-this.hcolor);
	
	
	r *= this.vcolor;
	g *= this.vcolor;
	b *= this.vcolor;
	
	var rrx = Math.round(r);
	var rrg = Math.round(g);
	var rrb = Math.round(b);
	
	if(this.acolor === 1){
		var sr = rrx.toString(16);
		var sg = rrg.toString(16);
		var sb = rrb.toString(16);
		if(sr.length<2)
			sr = '0'+sr;
		if(sg.length<2)
			sg = '0'+sg;
		if(sb.length<2)
			sb = '0'+sb;
		this.color = '#'+sr+sg+sb;
	}
	else
		this.color = 'rgba('+rrx+','+rrg+','+rrb+','+this.acolor+')';
	
	this.wcolor = 'rgb('+rrx+','+rrg+','+rrb+')';
	
	
	console.log('WRRC: '+this.wcolor,this.hcolor,this.vcolor);
	
	this._o.value = this.color;
	
	this.updateIndec();
	
}
colors.prototype.updateIndec = function(){
	this.indec.style.backgroundColor = this.color;
};
colors.prototype.callChange = function(){
	//this.DC = 1;
	if("createEvent" in document){
		var ev = document.createEvent("HTMLEvents");
		ev.initEvent('change',false,true);
		this._o.dispatchEvent(ev);
	}
	else{
		this._o.fireEvent('change');
	}
	//this.DC = 0;
};
colors.prototype.createBlock = function(){
	var div = document.createElement('div');
	div.classList.add('imm-color-pick-container');
	
	this.block.classList.add('opened');
	
	var cr = document.createElement('canvas');
	var crDiv = document.createElement('div');
	crDiv.classList.add('imm-c-left-canvas');
	cr.height = this.cLeftHeight;
	cr.width = this.cLeftWidth;
	crDiv.style.height = this.cLeftHeight+'px';
	crDiv.style.width = this.cLeftWidth+'px';
	crDiv.appendChild(cr);
	var crSpan = document.createElement('span');
	crDiv.appendChild(crSpan);
	div.appendChild(crDiv);
	
	var self = this;
	
	
	this._crmmE = function(e){
		self._crmm.call(self,e);
	}
	this._crmuE = function(e){
		self._crmu.call(self,e);
	}
	
	crDiv.addEventListener('mousedown',function(e){
		self._crmmO = {v:self.getLayer(e).y,y:e.pageY,m:this.offsetHeight};
		self._crmm(e);
		window.addEventListener('mousemove',self._crmmE,false);
		window.addEventListener('mouseup',self._crmuE,false);
	},false);
	crDiv.addEventListener('touchstart',function(e){
		e.preventDefault();
		self._crmmO = {v:self.getLayer(e).y,y:(e.changedTouches ? e.changedTouches[0].pageY : e.pageY),m:this.offsetHeight};
		self._crmm(e);
		window.addEventListener('touchmove',self._crmmE,false);
		window.addEventListener('touchend',self._crmuE,false);
	},false);
	
	div.addEventListener('mousedown',function(e){
		e.preventDefault();
		return false;
	},false);
	
	//this.color = '#f00'; ///! REPLACE WITH PICKING
	
	var cm = document.createElement('canvas');
	var cmDiv = document.createElement('div');
	cmDiv.classList.add('imm-c-middle-canvas');
	cm.height = this.cLeftHeight;
	cm.width = this.cLeftWidth;
	cmDiv.style.height = this.cLeftHeight+'px';
	cmDiv.style.width = this.cLeftWidth+'px';
	cmDiv.appendChild(cm);
	var cmSpan = document.createElement('span');
	cmDiv.appendChild(cmSpan);
	div.appendChild(cmDiv);
	
	this._cmmmE = function(e){
		self._cmmm.call(self,e);
	}
	this._cmmuE = function(e){
		self._cmmu.call(self,e);
	}
	
	cmDiv.addEventListener('mousedown',function(e){
		self._cmmmO = {v:this.offsetHeight-self.getLayer(e).y,y:e.pageY,m:this.offsetHeight};
		self._cmmm(e);
		window.addEventListener('mousemove',self._cmmmE,false);
		window.addEventListener('mouseup',self._cmmuE,false);
	},false);
	cmDiv.addEventListener('touchstart',function(e){
		e.preventDefault();
		self._cmmmO = {v:this.offsetHeight-self.getLayer(e).y,y:(e.changedTouches ? e.changedTouches[0].pageY : e.pageY),m:this.offsetHeight};
		self._cmmm(e);
		window.addEventListener('touchmove',self._cmmmE,false);
		window.addEventListener('touchend',self._cmmuE,false);
	},false);
	
	var cl = document.createElement('canvas');
	var clDiv = document.createElement('div');
	clDiv.classList.add('imm-c-right-canvas');
	cl.height = this.cRightHeight;
	cl.width = this.cRightWidth;
	clDiv.style.height = this.cRightHeight+'px';
	clDiv.style.width = this.cRightWidth+'px';
	clDiv.appendChild(cl);
	var clSpan = document.createElement('span');
	clDiv.appendChild(clSpan);
	div.appendChild(clDiv);
	
	this._clmmE = function(e){
		self._clmm.call(self,e);
	}
	this._clmuE = function(e){
		self._clmu.call(self,e);
	}
	
	clDiv.addEventListener('mousedown',function(e){
		var lev = self.getLayer(e);
		self._clmmO = {vy:this.offsetHeight-lev.y,vx:this.offsetWidth-lev.x,y:e.pageY,x:e.pageX,my:this.offsetHeight,mx:this.offsetWidth};
		self._clmm(e);
		console.log(self._clmmO);
		window.addEventListener('mousemove',self._clmmE,false);
		window.addEventListener('mouseup',self._clmuE,false);
	},false);
	clDiv.addEventListener('touchstart',function(e){
		e.preventDefault();
		var lev = self.getLayer(e);
		self._clmmO = {vy:this.offsetHeight-lev.y,vx:this.offsetWidth-lev.x,y:(e.changedTouches ? e.changedTouches[0].pageY : e.pageY),x:(e.changedTouches ? e.changedTouches[0].pageX : e.pageX),my:this.offsetHeight,mx:this.offsetWidth};
		self._clmm(e);
		console.log(self._clmmO);
		window.addEventListener('touchmove',self._clmmE,false);
		window.addEventListener('touchend',self._clmuE,false);
	},false);
	
	var ctr = cr.getContext('2d');
	var ctl = cl.getContext('2d');
	var ctm = cm.getContext('2d');
	
	this.ctr = ctr;
	this.ctl = ctl;
	this.ctm = ctm;
	
	this.cr = cr;
	this.cl = cl;
	this.cm = cm;
	
	this.colorContainer = div;
	
	this.block.appendChild(div);
	
	this.renderPicker(1);
	
	
}
colors.prototype.getLayer = function(evt) {
  var el = evt.target;
  var p = el.getBoundingClientRect();
  return {x:evt.clientX-p.x, y:evt.clientY-p.y};
}
colors.prototype.removeBlock = function(){
	if(this.colorContainer)
		this.colorContainer.parentNode.removeChild(this.colorContainer);
	this.colorContainer = null;
	this.block.classList.remove('opened');
}
colors.prototype.renderPicker = function(fr){
	
	var ctm = this.ctm;
	var ctr = this.ctr;
	var ctl = this.ctl;
	
	var cm = this.cm;
	var cl = this.cl;
	var cr = this.cr
	
	if(fr){
		//PALETE
		var hGrad = ctr.createLinearGradient(0, 0, 0, cl.height);
		hGrad.addColorStop(0 / 6, '#F00');
		hGrad.addColorStop(1 / 6, '#FF0');
		hGrad.addColorStop(2 / 6, '#0F0');
		hGrad.addColorStop(3 / 6, '#0FF');
		hGrad.addColorStop(4 / 6, '#00F');
		hGrad.addColorStop(5 / 6, '#F0F');
		hGrad.addColorStop(6 / 6, '#F00');
		ctr.fillStyle = hGrad;
		//ctr.clearRect(0,0,cr.width,cr.height);
		ctr.fillRect(0, 0, cr.width, cr.height);
	}
	
	//DRAWED
	ctl.fillStyle = this.rcolor;
	ctl.fillRect(0,0,cl.width,cl.height);
	var vGrad = ctl.createLinearGradient(0, 0, cl.width, 0);
	vGrad.addColorStop(0, 'rgba(255,255,255,1)');
	vGrad.addColorStop(1, 'rgba(255,255,255,0)');
	ctl.fillStyle = vGrad;
	ctl.fillRect(0,0,cl.width,cl.height);
	
	
	for(var i=0;i<cm.height/5;i++){
		ctm.fillStyle = i%2 ? '#fff' : '#ccc';
		ctm.fillRect(0,i*5,5,(i+1)*5);		
		ctm.fillStyle = i%2 ? '#ccc' : '#fff';
		ctm.fillRect(5,i*5,10,(i+1)*5);
	}
	var mGrad = ctm.createLinearGradient(0, 0, 0, cm.height);
	//console.log('wc '+this.wcolor);
	mGrad.addColorStop(0, this.wcolor);
	mGrad.addColorStop(1, 'rgba(255,255,255,0)');
	ctm.fillStyle = mGrad;
	//ctm.clearRect(0,0,cm.width,cm.height);
	ctm.fillRect(0,0,cm.width,cm.height);
	
	
	vGrad = ctl.createLinearGradient(0, 0, 0, cl.height);
	vGrad.addColorStop(0, 'rgba(0,0,0,0)');
	vGrad.addColorStop(1, 'rgba(0,0,0,1)');
	ctl.fillStyle = vGrad;
	//ctl.clearRect(0,0,cl.width,cl.height);
	ctl.fillRect(0,0,cl.width,cl.height);
	
	this.updateControls();
}
colors.prototype.updateControlValues = function(){
	
	var c = this.color;
	
	var r,g,b,a;
	
	if(c.indexOf('#')+1){
		var nc = (c.length-1)/3;
		r = parseInt(c.substr(1+0*nc,nc),16);
		g = parseInt(c.substr(1+1*nc,nc),16);
		b = parseInt(c.substr(1+2*nc,nc),16);
		a = 1;
		if(nc === 1){
			r = r*16+r;
			g = g*16+g;
			b = b*16+b;
		}
	}
	else if(c.indexOf('rgba')+1){
		var crr = c.substr(5,c.length-6).split(',');
		r = parseInt(crr[0]);
		g = parseInt(crr[1]);
		b = parseInt(crr[2]);
		a = parseFloat(crr[3]);
		
		//console.log('ss ',r,g,b,a);
		
		if(isNaN(a))
			a = 1;
		
		this.color = 'rgba('+r+','+g+','+b+','+a+')';
	}
	else{
		var crr = c.substr(4,c.length-5).split(',');
		r = parseInt(crr[0]);
		g = parseInt(crr[1]);
		b = parseInt(crr[2]);
		a = 1;
		
		console.log('ss ',r,g,b,a);
		
		this.color = 'rgba('+r+','+g+','+b+','+a+')';
	}
	
	this.wcolor = 'rgb('+r+','+g+','+b+')';
	//console.log('wrc '+this.wcolor);
	//console.log(r,g,b,a);
	
	var rx = r/255;
	var rg = g/255;
	var rb = b/255;
	
	var mx = Math.max(rx,rg,rb);
	
	console.log("mx: "+mx);
	
	r /= mx;
	g /= mx;
	b /= mx;
	
	rx = r/255;
	rg = g/255;
	rb = b/255;
	
	
	var mn = Math.min(rx,rg,rb);
	
	if(mn == 1 || mx == 0){
		r = 255;
		g = 0;
		b = 0;
	}
	else{
		r = 255 - (255-r)/(1-mn);
		g = 255 - (255-g)/(1-mn);
		b = 255 - (255-b)/(1-mn);
	}
	
	var rrx = Math.round(r);
	var rrg = Math.round(g);
	var rrb = Math.round(b);
	
	console.log(rrx,rrg,rrb);
	
	var rval = 0;
	if(rrx == 255 && rrb == 0)
		rval = 0/6 + (rrg/255)*1/6;
	else if(rrg == 255 && rrb == 0)
		rval = 1/6 + (1-rrx/255)*1/6;
	else if(rrg == 255 && rrx == 0)
		rval = 2/6 + (rrb/255)*1/6;
	else if(rrb == 255 && rrx == 0)
		rval = 3/6 + (1-rrg/255)*1/6;
	else if(rrb == 255 && rrg == 0)
		rval = 4/6 + (rrx/255)*1/6;
	else if(rrx == 255 && rrg == 0)
		rval = 5/6 + (1-rrb/255)*1/6;
	
	this.rcolor = 'rgb('+rrx+','+rrg+','+rrb+')';
	this.vcolor = mx;
	this.hcolor = mn;
	this.acolor = a;
	this.scolor = rval;
	this.carr = [r,g,b];
	
	//console.log('scolor ',this.scolor,this.vcolor,this.hcolor);
	
	this.updateIndec();
	
}

////////////////////////////////////////////////////////////////
///////////////////////WORKTIME/////////////////////////////////
////////////////////////////////////////////////////////////////
worktimes.prototype.activate = function(){
	var o = this._o;
	this._o.WT = this;
	var self = this;
	
	o.addEventListener('change',function(){
		self.fromInput();
	},false);
	
	this.open = 0;
	
	var dateContainer = document.createElement('div');
	dateContainer.classList.add('imm-worktime-container');
	o.parentNode.insertBefore(dateContainer,o);
	dateContainer.appendChild(o);
	
	this.container = dateContainer;
	
	var divBut = document.createElement('div');
	divBut.classList.add('imm-workt-button');
	divBut.innerHTML = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
	dateContainer.appendChild(divBut);
	
	var val = o.value.trim();
	
	//console.log(val);
	
	val = this.parseValue(val);
	
	//console.log(val);
	
	var vArr = this.parseArray(val);
	
	//console.log(vArr);
	
	vArr = this.fixArray(vArr);
	
	//console.log(JSON.parse(JSON.stringify(vArr)));
	
	this.value = vArr;
	
	var infoText = o.getAttribute('data-info');
	if(infoText){
		var span = document.createElement('span');
		span.classList.add('imm-input-info');
		span.innerHTML = '<span>'+infoText+'</span>';
		dateContainer.appendChild(span);
	}
	
	divBut.addEventListener('click',function(){
		
		self.open = 1-self.open;
		
		
		var div = dateContainer.getElementsByClassName("imm-worktime-picker")[0];
		if(div)
			div.parentNode.removeChild(div);
		
		dateContainer.classList.remove('active');
			
		if(!self.open)
			return;
		
		dateContainer.classList.add('active');
		div = document.createElement('div');
		div.classList.add('imm-worktime-picker');
		div.innerHTML = '<div class="imm-worktime-left"><span>'+IMM.lang.days[0]+'</span><span>'+IMM.lang.days[1]+'</span><span>'+IMM.lang.days[2]+'</span><span>'+IMM.lang.days[3]+'</span><span>'+IMM.lang.days[4]+'</span><span>'+IMM.lang.days[5]+'</span><span>'+IMM.lang.days[6]+'</span></div><div class="imm-worktime-middle"></div><div class="imm-worktime-right"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>';
		var divMid = div.children[1];
		divMid.innerHTML = '<div class="imm-worktime-mid-days">'+
			'<div class="imm-worktime-day"><div data-day="1" class="imm-workt-day"></div><div class="imm-workt-meter"></div></div>'+
			'<div class="imm-worktime-day"><div data-day="2" class="imm-workt-day"></div><div class="imm-workt-meter"></div></div>'+
			'<div class="imm-worktime-day"><div data-day="3" class="imm-workt-day"></div><div class="imm-workt-meter"></div></div>'+
			'<div class="imm-worktime-day"><div data-day="4" class="imm-workt-day"></div><div class="imm-workt-meter"></div></div>'+
			'<div class="imm-worktime-day"><div data-day="5" class="imm-workt-day"></div><div class="imm-workt-meter"></div></div>'+
			'<div class="imm-worktime-day"><div data-day="6" class="imm-workt-day"></div><div class="imm-workt-meter"></div></div>'+
			'<div class="imm-worktime-day"><div data-day="7" class="imm-workt-day"></div><div class="imm-workt-meter"></div></div>'+
			'</div><div class="imm-worktime-mid-panel"></div>';
		var allWorkTimes = divMid.getElementsByClassName("imm-workt-day");
		var allMeters = divMid.getElementsByClassName("imm-workt-meter");
		var panelDiv = divMid.getElementsByClassName("imm-worktime-mid-panel")[0];
		self.days = allWorkTimes;
		dateContainer.appendChild(div);
		var allCross = div.children[2].children;

		for(var i=0;i<allCross.length;i++){
			allCross[i].addEventListener('click',function(){
				var iind = Array.prototype.indexOf.call(this.parentNode.children,this)+1;
				self.value[iind] = [];
				self.clearDays();
				self.buildDays();
			},false);
		}
		for(var i=0;i<allMeters.length;i++){
			for(var j=0;j<13;j++){
				var span = document.createElement('span');
				span.style.left = (j*8.3333)+'%';
				allMeters[i].appendChild(span);	
			}
		}
		for(var i=0;i<13;i++){
			var span = document.createElement('span');
			span.innerHTML = (i*2)+'';
			panelDiv.appendChild(span);	
		}
		for(var i=0;i<allWorkTimes.length;i++){
			allWorkTimes[i].addEventListener('mousedown',function(e){
				if(e.which !== 1)
					return;
				if(e.target.classList.contains("imm-workt-day")){
					
					if(self._C)
						return;
					
					var pos = self.getLayer(e);
					var startPoint = pos.x/e.target.offsetWidth;
					var span = document.createElement('span');
					span.style.left = startPoint*100+'%';
					var contBlock = e.target;
					contBlock.appendChild(span);
					
					self._C = {container:contBlock,block:span,pos:{x:pos.x,ox:e.pageX-pos.x}};
					
					window.addEventListener('mousemove',self._workdayMM,false);
					window.addEventListener('mouseup',self._workdayMU,false);
				}
			},false);
			allWorkTimes[i].addEventListener('mousemove',function(e){
				if(e.target.classList.contains('imm-workt-day')){
					var dI = this.parentNode.children[1].getElementsByClassName('imm-wt-time-hover')[0];
					if(!dI){
						dI = document.createElement('i');
						dI.classList.add('imm-wt-time-hover');
						this.parentNode.children[1].appendChild(dI);
					}
					dI.style.left = (self.getLayer(e,this).x/this.offsetWidth)*100+'%';
					var rdT = self.getCorrectTime((self.getLayer(e,this).x/this.offsetWidth)*86400000);
					dI.innerHTML = '<b>'+rdT[0]+':'+rdT[1]+'</b>';
				}
				else{
					var allD = this.parentNode.children[1].getElementsByClassName('imm-wt-time-hover');
					for(var i=0;i<allD.length;i++)
						allD[i].parentNode.removeChild(allD[i]);
				}
			},false);
			allWorkTimes[i].addEventListener('mouseleave',function(e){
				var allD = this.parentNode.children[1].getElementsByClassName('imm-wt-time-hover');
				for(var i=0;i<allD.length;i++)
					allD[i].parentNode.removeChild(allD[i]);
			},false);
		}
		
		self.buildDays();
		
	},false);
	
	
	this._workdayMM = function(e){
		
		self._worktdayMousemove(e);
		
	}
	this._workdayMU = function(e){
		
		self._worktdayMouseup(e);
		
		window.removeEventListener('mousemove',self._workdayMM,false);
		window.removeEventListener('mouseup',self._workdayMU,false);
	}
	
}
///? Creating new time interval
worktimes.prototype._worktdayMousemove = function(e){
	
	var C = this._C;
	C.pos.ex = e.pageX - C.pos.ox;
	
	if(C.pos.ex < 0)
		C.pos.ex = 0;
	if(C.pos.ex > C.container.offsetWidth)
		C.pos.ex = C.container.offsetWidth;
	
	var p1 = C.pos.x/C.container.offsetWidth;
	var p2 = C.pos.ex/C.container.offsetWidth;
	
	var nl = Math.min(p1,p2)*100;
	var nw = Math.abs(p2-p1)*100;
	
	C.block.style.left = nl+'%';
	C.block.style.width = nw+'%';
}
worktimes.prototype.fromInput = function(){
	
	var val = this._o.value.trim();
	
	val = this.parseValue(val);
	
	var vArr = this.parseArray(val);
	
	vArr = this.fixArray(vArr);
	
	this.value = vArr;
	
	this.clearDays();
	this.buildDays();
}
worktimes.prototype.decodeValue = function(){
	var retArr = [];
	for(var i=1;i<=7;){
		var endP = i;
		if(this.value[i].length){
			endP = 7;
			var rArr = [];
			for(var j=0;j<this.value[i].length;j++){
				var rtS = this.getCorrectTime(this.value[i][j][0]);
				if(!parseInt(rtS[1]))
					rtS.splice(1,1);
				var rtE = this.getCorrectTime(this.value[i][j][1]);
				if(!parseInt(rtE[1]))
					rtE.splice(1,1);
				rArr.push(rtS.join(':')+'-'+rtE.join(':'));
				for(var k=endP;k>i;k--){
					if(!this.value[k].length || !this.value[k][j] || this.value[i][j][0] != this.value[k][j][0] || this.value[i][j][1] != this.value[k][j][1])
						endP = k-1;
				}
			}
			var istr = i.toString();
			if(i != endP)
				istr += '-'+endP;
			retArr.push(istr+'.'+rArr.join('.'));
		}
		i = endP+1;
	}
	this._o.value = retArr.join(',');
}
worktimes.prototype._worktdayMouseup = function(e){
	
	var C = this._C;
	
	var p1 = C.pos.x/C.container.offsetWidth;
	var p2 = C.pos.ex/C.container.offsetWidth;
	
	if(p1 > p2)
		p1 = [p2,p2=p1][0];
	
	var oneDay = 86400000;
	var oneMin = 60000;
	
	var startTime = Math.floor((oneDay*p1)/oneMin)*oneMin;
	var endTime = Math.floor((oneDay*p2)/oneMin)*oneMin;
	
	var day = C.container.getAttribute('data-day');
	
	this.value[day].push([startTime,endTime]);
	
	this.value = this.fixArray(this.value);
	
	this.clearDays();
	this.buildDays();
	
	this._C = null;
	delete this._C;
}
worktimes.prototype.clearDays = function(){
	console.log(this.days);
	for(var i=0;i<this.days.length;i++){
		while(this.days[i].children.length)
			this.days[i].removeChild(this.days[i].children[0]);
	}
}
worktimes.prototype.buildDays = function(){
	var self = this;
	var vArr = this.value;
	var allWorkTimes = this.days;
	for(var i=1;i<=7;i++){
		if(vArr[i]){
			var ii = i-1;
			for(var j=0;j<vArr[i].length;j++){
				console.log(vArr[i][j]);
				var fromTime = vArr[i][j][0];
				var toTime = vArr[i][j][1];
				console.log(fromTime,toTime);
				var tMin = 0;
				var tMax = 86400000;
				var fromPerc = fromTime/tMax;
				var toPerc = toTime/tMax;
				var span = document.createElement('span');
				span.style.width = (toPerc-fromPerc)*100+'%';
				span.style.left = fromPerc*100+'%';
				var rsTime = this.getCorrectTime(fromTime);
				var reTime = this.getCorrectTime(toTime);
				span.setAttribute('data-s',rsTime[0]+':'+rsTime[1]);
				span.setAttribute('data-e',reTime[0]+':'+reTime[1]);
				//span.setAttribute('tabindex','1');
				span.addEventListener('click',function(){
					if(self._C)
						return;
					this.classList.add('active');
					var leftMove = document.createElement('span');
					var rightMove = document.createElement('span');
					leftMove.className = 'imm-wt-mover imm-wt-prevent imm-wt-mover-left';
					rightMove.className = 'imm-wt-mover imm-wt-prevent imm-wt-mover-right';
					var leftI = document.createElement('input');
					var rightI = document.createElement('input');
					leftI.setAttribute('type','text');
					rightI.setAttribute('type','text');
					leftI.className = 'imm-wt-prevent imm-wt-mover-input imm-wt-mover-input-left';
					rightI.className = 'imm-wt-prevent imm-wt-mover-input imm-wt-mover-input-right';
					var ind = Array.prototype.indexOf.call(this.parentNode.children,this);
					var dayN = this.parentNode.getAttribute('data-day');
					var cS = self.getCorrectTime(self.value[dayN][ind][0]);
					var cE = self.getCorrectTime(self.value[dayN][ind][1]);
					leftI.value = cS[0]+':'+cS[1];
					rightI.value = cE[0]+':'+cE[1];
					this.appendChild(leftMove);
					this.appendChild(rightMove);
					this.appendChild(leftI);
					this.appendChild(rightI);
					leftMove.addEventListener('mousedown',function(e){
						e.preventDefault();
						var oneDay = 86400000;
						var startVal = self.value[dayN][self._C.ind][0]/oneDay;
						var widthVal = (self.value[dayN][self._C.ind][1]-startVal)/oneDay;
						self._C.mo = {d:-1,x:e.pageX,ox:startVal,ow:widthVal};
						window.addEventListener('mousemove',_moveSpanHelper,false);
						window.addEventListener('mouseup',_upSpanHelper,false);
					},false);
					rightMove.addEventListener('mousedown',function(e){
						e.preventDefault();
						var oneDay = 86400000;
						var startVal = self.value[dayN][self._C.ind][0]/oneDay;
						var widthVal = (self.value[dayN][self._C.ind][1]-startVal)/oneDay;
						self._C.mo = {d:1,x:e.pageX,ox:startVal,ow:widthVal};
						window.addEventListener('mousemove',_moveSpanHelper,false);
						window.addEventListener('mouseup',_upSpanHelper,false);
					},false);
					leftI.addEventListener('change',function(){
						this.value = this.value.trim();
						var v = this.value;
						if(v.indexOf(":")+1){
							v = v.split(":");
							v = ((parseInt(v[0])||0)*3600)+((parseInt(v[1])||0)*60);
						}
						else{
							if(v.length > 4)
								v = 24*3600*1000;
							else if(v.length == 4)
								v = parseInt(v.substr(0,2))*3600+parseInt(v.substr(2))*60;
							else if(v.length == 3)
								v = parseInt(v.substr(0,1))*3600+parseInt(v.substr(1))*60;
							else if(v.length < 3)
								v = (parseInt(v)||0)*3600;
						}
						if(v > 86400)
							v = 86400;
						v*=1000;
						
						if(v > self.value[dayN][ind][1])
							v = self.value[dayN][ind][1];
						
						self.value[dayN][ind][0] = v;
						
						var oneDay = 86400000;
						//var startVal = self.value[dayN][self._C.ind][0]/oneDay;
						var endVal = self.value[dayN][self._C.ind][1]/oneDay;
						
						self._C.block.style.left = (v/oneDay)*100+'%';
						self._C.block.style.width = (endVal-(v/oneDay))*100+'%';
						
						
						var rv = self.getCorrectTime(v);
						this.value = rv[0]+':'+rv[1];
					},false);
					rightI.addEventListener('change',function(){
						this.value = this.value.trim();
						var v = this.value;
						if(v.indexOf(":")+1){
							v = v.split(":");
							v = ((parseInt(v[0])||0)*3600)+((parseInt(v[1])||0)*60);
						}
						else{
							if(v.length > 4)
								v = 24*3600*1000;
							else if(v.length == 4)
								v = parseInt(v.substr(0,2))*3600+parseInt(v.substr(2))*60;
							else if(v.length == 3)
								v = parseInt(v.substr(0,1))*3600+parseInt(v.substr(1))*60;
							else if(v.length < 3)
								v = (parseInt(v)||0)*3600;
						}
						if(v > 86400)
							v = 86400;
						v*=1000;
						
						if(v < self.value[dayN][ind][0])
							v = self.value[dayN][ind][0];
						
						self.value[dayN][ind][1] = v;
						
						var oneDay = 86400000;
						
						var startVal = self.value[dayN][self._C.ind][0]/oneDay;
						//var endVal = self.value[dayN][self._C.ind][1]/oneDay;
						
						self._C.block.style.left = (startVal)*100+'%';
						self._C.block.style.width = ((v/oneDay)-startVal)*100+'%';
						
						
						var rv = self.getCorrectTime(v);
						this.value = rv[0]+':'+rv[1];
					},false);
					self._C = {block:this,ind:ind};
					self.container.addEventListener('mousedown',removeHelpers,false);
				},false);
				allWorkTimes[ii].appendChild(span);
			}
		}
	}
	this.decodeValue();
	function removeHelpers(e){
		if(e.target.classList.contains('imm-wt-prevent'))
			return;
		while(self._C.block.children.length){
			self._C.block.removeChild(self._C.block.children[0]);
		}
		self.container.removeEventListener('mousedown',removeHelpers,false);
		
		self.value = self.fixArray(self.value);
		self.clearDays();
		self.buildDays();
		
		self._C = null;
		delete self._C;
	}
	function _moveSpanHelper(e){
		
		var nx = e.pageX;
		var C = self._C;
		
		var goff = C.block.parentNode.offsetWidth;
		
		if(C.mo.d < 0){
			
			var tWid = (nx-C.mo.x)/goff;
			
			var newLeft = tWid+C.mo.ox;
			
			if(newLeft < 0){
				tWid -= newLeft;
				newLeft = 0;
			}
			
			var newWidth = -tWid+C.mo.ow-C.mo.ox;
			
			if(newWidth < 0){
				newLeft += newWidth;
				newWidth = 0;
			}
		}
		else{
			var newLeft = C.mo.ox;
			var newWidth = (nx-C.mo.x)/goff+C.mo.ow - C.mo.ox;
			
			//console.log((nx-C.mo.x));
			
			if(newWidth < 0){
				newWidth = 0;
			}
			if(newLeft + newWidth > 1){
				newWidth = 1-newLeft;
			}
		}
		
		
		var oneDay = 86400000;
		var oneMin = 60000;
		
		var startTime = Math.round((oneDay*newLeft)/oneMin)*oneMin;
		var endTime = Math.round((oneDay*(newLeft+newWidth))/oneMin)*oneMin;
		
		var day = C.block.parentNode.getAttribute('data-day');
		
		self.value[day][C.ind][0] = startTime;
		self.value[day][C.ind][1] = endTime;
		
		
		
		var sTime = self.getCorrectTime(startTime);
		var eTime = self.getCorrectTime(endTime);
		
		C.block.children[2].value = sTime[0]+':'+sTime[1];
		C.block.children[3].value = eTime[0]+':'+eTime[1];

		
		
		C.block.style.left = (newLeft*100)+'%';
		C.block.style.width = (newWidth*100)+'%';
		
	}
	function _upSpanHelper(e){
		
		var C = self._C;
		
		var p1 = C.block.offsetLeft/C.block.parentNode.offsetWidth;
		var p2 = (C.block.offsetLeft+C.block.offsetWidth)/C.block.parentNode.offsetWidth;

		console.log(self.value);
		
		self._C.mo = null;
		delete self._C.mo;
		
		window.removeEventListener('mousemove',_moveSpanHelper,false);
		window.removeEventListener('mouseup',_upSpanHelper,false);
	}
}
worktimes.prototype.getCorrectTime = function(ts){
	var ts = Math.floor(ts/1000);
	var sH = Math.floor(ts/3600);
	var sM = Math.floor((ts-sH*3600)/60);
	
	if(sM < 10)
		sM = '0'+(sM);
	
	return [sH,sM];
}
worktimes.prototype.getLayer = function(evt,block) {
  var el = evt.target;
  var p = el.getBoundingClientRect();
  return {x:evt.clientX-p.x, y:evt.clientY-p.y};
}
worktimes.prototype.parseArray = function(arr){
	var retArr = [];
	
	for(var i=0;i<arr.length;i++){
		if(arr[i][0].length > 1){
			for(var fi=arr[i][0][0];fi<=arr[i][0][1];fi++){
				if(fi >= 1 && fi <= 7 && !retArr[fi]){
					retArr[fi] = JSON.parse(JSON.stringify(arr[i].slice(1,arr[i].length)));
					if(!retArr[fi].length)
						retArr[fi].push([[0],[24]]);
				}
			}
		}
		else{
			for(var fi=arr[i][0][0];fi<=arr[i][0][0];fi++){
				if(fi >= 1 && fi <= 7 && !retArr[fi]){
					retArr[fi] = JSON.parse(JSON.stringify(arr[i].slice(1,arr[i].length)));
					if(!retArr[fi].length)
						retArr[fi].push([[0],[24]]);
				}
			}
		}
	}
	
	for(var i=1;i<=7;i++){
		
		if(!retArr[i]){
			retArr[i] = [];
			continue;
		}
		
		for(var j=0;j<retArr[i].length;j++){
			
			if(!retArr[i][j][0][0])
				retArr[i][j][0][0] = 0;
			if(!retArr[i][j][0][1])
				retArr[i][j][0][1] = 0;
			if(!retArr[i][j][0][2])
				retArr[i][j][0][2] = 0;
			if(!retArr[i][j][1][0])
				retArr[i][j][1][0] = 0;
			if(!retArr[i][j][1][1])
				retArr[i][j][1][1] = 0;
			if(!retArr[i][j][1][2])
				retArr[i][j][1][2] = 0;
			
			var startVal = retArr[i][j][0][0]*60*60*1000 + retArr[i][j][0][1]*60*1000 + retArr[i][j][0][2]*1000;
			var endVal = retArr[i][j][1][0]*60*60*1000 + retArr[i][j][1][1]*60*1000 + retArr[i][j][1][2]*1000;
			
			retArr[i][j][0] = startVal;
			retArr[i][j][1] = endVal;
		}
		
	}
	
	return retArr;
}

worktimes.prototype.fixArray = function(arr){
	
	for(var i=1;i<=7;i++){
		
		for(var j=0;j<arr[i].length;j++){
			
			if(isNaN(arr[i][j][1]) || arr[i][j][0] < 0 || arr[i][j][1] < 0 || arr[i][j][0] > 86400000 || arr[i][j][1] > 86400000 || arr[i][j][0] >= arr[i][j][1]){
				arr[i].splice(j,1);
				j--;
				continue;
			}
			
			for(var k=0;k<j;k++){
				if(arr[i][k][0] <= arr[i][j][0] && arr[i][k][1] >= arr[i][j][1]){
					arr[i].splice(j,1);
					j--;
					break;
				}
				else if(arr[i][k][0] >= arr[i][j][0] && arr[i][k][1] <= arr[i][j][1]){
					arr[i].splice(k,1);
					j--;
					k--;
				}
				else if(arr[i][k][0] < arr[i][j][0] && arr[i][k][1] < arr[i][j][1] && arr[i][k][1] >= arr[i][j][0]){
					arr[i][j][0] = arr[i][k][0];
					arr[i].splice(k,1);
					j--;
					k--;
				}
				else if(arr[i][k][0] > arr[i][j][0] && arr[i][k][1] > arr[i][j][1] && arr[i][k][0] <= arr[i][j][1]){
					arr[i][j][1] = arr[i][k][1];
					arr[i].splice(k,1);
					j--;
					k--;
				}
			}
			
		}
		
	}
	
	return arr;
	
}

worktimes.prototype.parseValue = function(val){
	val = val.toString();
	var sWArr = val.split(',');
	var ind = 0;
	for(var i=0;i<sWArr.length;i++){
		sWArr[i] = sWArr[i].trim().split('.');
		for(var j=0;j<sWArr[i].length;j++){
			sWArr[i][j] = sWArr[i][j].trim().split("-");
		}
		for(var j=1;j<sWArr[i].length;j++){
			if(sWArr[i][j]){

				sWArr[i][j][0] = sWArr[i][j][0].split(':');
				sWArr[i][j][1] = sWArr[i][j][1] ? sWArr[i][j][1].split(':') : [0,0,0];
				
				//timeFrom[0]
				//console.log('W',sWArr[i][j]);
				
				sWArr[i][j][0][0] = parseInt(sWArr[i][j][0][0]) || 0;
				if(sWArr[i][j][0].length > 1)
					sWArr[i][j][0][1] = parseInt(sWArr[i][j][0][1]) || 0;
				if(sWArr[i][j][0].length > 2)
					sWArr[i][j][0][2] = parseInt(sWArr[i][j][0][2]) || 0;
				
				
				if(sWArr[i][j].length < 2)
					sWArr[i][j][1] = [0];
				
				sWArr[i][j][1][0] = parseInt(sWArr[i][j][1][0]) || 0;
				if(sWArr[i][j][1].length > 1)
					sWArr[i][j][1][1] = parseInt(sWArr[i][j][1][1]) || 0;
				if(sWArr[i][j][1].length > 2)
					sWArr[i][j][1][2] = parseInt(sWArr[i][j][1][2]) || 0;
				
			}
		}
		sWArr[i][0][0] = parseInt(sWArr[i][0][0]) || 0;
		if(sWArr[i][0].length > 1)
			sWArr[i][0][1] = parseInt(sWArr[i][0][1]) || 0;
	}
	
	return sWArr;
	
}



////////////////////////////////////////////////////////////////
///////////////////////LOADING//////////////////////////////////
////////////////////////////////////////////////////////////////
loading.prototype.generate = function(tmpl,background){
	if(!tmpl)
		tmpl = IMM.L_DARK;
	if(tmpl == IMM.L_DARK){
		tmpl = '#4f5467';
		if(!background)
			background = '#fff';
	}
	else if(tmpl == IMM.L_LIGHT){
		tmpl = '#fff';
		if(!background)
			background = '#4f5467';
	}
	if(!background)
		background = '#fff';
	
	var setobj = {
		border: function(el){
			el.style.borderColor = tmpl;
		},
		color: function(el){
			el.style.color = background;
		}
	};
	
	return new IMM.T('span.imm-loading-container.imm-loading-generated > b.imm-loading^$border > i^$border > em^$color <, em^$color',setobj);
}


////////////////////////////////////////////////////////////////
///////////////////////SLIDER///////////////////////////////////
////////////////////////////////////////////////////////////////
slider.prototype.activate = function(){
	var o = this._o;
	this._o.SLIDER = this;
	var self = this;
	
	var val = +o.value || 0;
	this.step = +o.dataset.step || 1;
	this.min = +o.dataset.min || 0;
	this.max = +o.dataset.max || 100;
	this.default = +o.dataset.default || this.min;
	this._catchEvent = true;
	
	var disabled = o.hasAttribute('disabled');
	this.disab = disabled;
	
	var bblock = document.createElement('div');
	if(this.disab)
		bblock.classList.add('disabled');
	bblock.classList.add('imm-slider-block');
	bblock.innerHTML = '<div class="imm-slider-in">'+
			'<div class="imm-slider-line-block">'+
				'<div class="imm-slider-line">'+
					'<div class="imm-slider-line-in"></div>'+
				'</div>'+
			'</div>'+
			'<div class="imm-slider-controls">'+
				'<div class="imm-slider-controls-in">'+
					''+
				'</div>'+
			'</div>'+
		'</div>';
	
	this.block = bblock;
	this.html = bblock;
	this.lBlock = bblock.getElementsByClassName("imm-slider-line-in")[0];
	this.cBlock = bblock.getElementsByClassName("imm-slider-controls-in")[0];
	
	this._controls = [];
	var c = this._createControl();
	this._controls.push(c);
	this.set(val);
	
	o.classList.add('dnone');
	o.parentNode.insertBefore(bblock,o);
	o.addEventListener('change',this._change,false);
	
	this.lBlock.addEventListener('mousedown',function(e){
		if(self.disab)
			return;
		e.preventDefault();
		self._cMM(e,self._controls[0]);
		window.addEventListener('mousemove',_cMM,false);
		window.addEventListener('mouseup',_cMU,false);
	},false);
	
	function _cMM(e){
		self._cMM(e,self._controls[0]);
	}
	function _cMU(e){
		window.removeEventListener('mousemove',_cMM,false);
		window.removeEventListener('mouseup',_cMU,false);
		self._render();
	}
}
slider.prototype.set = function(ob,val){
	if(arguments.length < 2){
		val = ob;
		ob = this._controls[0];
	}
	this._set(val);
	this._render();
};
slider.prototype._change = function(e){
	if(this._catchEvent)
		this.fixValue();
}
slider.prototype._createControl = function(){
	
	var self = this;
	
	var block = this.block;
	var controlsBlock = this.cBlock;
	var lineBlock = this.lBlock;
	
	var cC = createC();
	var cL = createL();
	
	cC.addEventListener('mousedown',function(e){
		if(self.disab)
			return;
		e.preventDefault();
		window.addEventListener('mousemove',_cMM,false);
		window.addEventListener('mouseup',_cMU,false);
	},false);
	
	controlsBlock.appendChild(cC);
	lineBlock.appendChild(cL);
	
	var obj = {
		_control: cC,
		_line: cL,
		_set: function(val){ self._set(this,val); },
		_render: function(coof){ self._render(this,coof); },
		
		set: function(val){ self.set(this,val); }
	};
	
	return obj;
	
	function createC(){
		var d = document.createElement('div');
		d.classList.add('imm-sl-ctrl');
		d.innerHTML = '<div></div><span></span>';
		return d;
	}
	
	function createL(){
		var d = document.createElement('div');
		d.classList.add('imm-sl-line');
		d.innerHTML = '<div></div>';
		return d;
	}
	
	function _cMM(e){
		self._cMM(e,obj);
	}
	function _cMU(e){
		window.removeEventListener('mousemove',_cMM,false);
		window.removeEventListener('mouseup',_cMU,false);
		obj._render();
	}
}
slider.prototype._initChange = function(){
	this._catchEvent = false;
	var element = this._o;
	if ("createEvent" in document) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", false, true);
		element.dispatchEvent(evt);
	}
	else
		element.fireEvent("onchange");
	this._catchEvent = true;
}
slider.prototype._cMM = function(e,el){
	var lBlock = this.lBlock;
	
	var x = e.clientX - lBlock.getBoundingClientRect().left;
	var coof = x/lBlock.offsetWidth;
	
	var val = coof*(this.max-this.min)+this.min;
	
	el._set(val);
	el._render(coof);
}
slider.prototype._render = function(ob,coof){
	if(arguments.length < 2){
		coof = ob;
		ob = this._controls[0];
	}
	if(!coof)
		coof = this._toCoof();
	coof = Math.max(Math.min(coof,1),0);
	//var coof = (val-this.min)/(this.max-this.min);
	var c = ob._control;
	var l = ob._line;
	c.style.left = coof*100+'%';
	l.style.width = coof*100+'%';
}
slider.prototype._toCoof = function(val){
	if(!val)
		val = +this._o.value || this.default;
	return (val-this.min)/(this.max-this.min);
}
slider.prototype._set = function(ob,val){
	if(arguments.length < 2){
		val = ob;
		ob = this._controls[0];
	}
	var c = ob._control;
	var l = ob._line;
	val = this._fixValue(val);
	//var coof = (val-this.min)/(this.max-this.min);
	//c.style.left = coof*100+'%';
	//l.style.width = coof*100+'%';
	c.getElementsByTagName('span')[0].innerHTML = val;
	this._o.value = val;
	this._initChange();
}
slider.prototype._fixValue = function(v){
	var o = this._o;
	var val = parseFloat(v ? v : o.value);
	
	val = parseFloat((Math.round(val/this.step)*this.step).toFixed(10));
	
	if(val > this.max)
		val = this.max;
	if(val < this.min)
		val = this.min;
	/*
	var ff = parseFloat((val%this.step).toFixed(10));
	val -= ff;
	*/
	if(!v)
		this.value = val;
	return val;
}


//////////////////////////////////////////////////////////////////
///////////////////////ANIMATE////////////////////////////////////
//////////////////////////////////////////////////////////////////
animate.activate = function(time,fn,callback){
	requestAnimationFrame(calc);
	var nt = 0;
	var dvcoof = (1000/60);
	function calc(){
		if(nt < time){
			callback(Math[fn](nt,0,1,time));
			nt+=dvcoof;
			requestAnimationFrame(calc);
		}
		else{
			nt = time;
			callback(1);
		}
	}
}


//////////////////////////////////////////////////////////////////
///////////////////////TEMPLATE///////////////////////////////////
//////////////////////////////////////////////////////////////////
templater.prototype.parse = function(str,obj){
	
	if(!str)
		str = '';
	
	this.str = str;
	this.fn = obj;
	
	var d = document.createDocumentFragment();
	
	
	var p = d;
	var s = -1;
	var l = '>';
	var i;
	
	var op = {
		'.':function(){
			var name = this._getName(s,i);
			if(!name)
				return;
			p.classList.add(name);
		},
		'#':function(){
			var name = this._getName(s,i);
			if(!name)
				return;
			p.id = name;
		},
		'[':function(){
			var name = this._getName(s,i-1);
			if(!name)
				return;
			var arr = name.split('=');
			var attr = arr[1].replace(/\"/g,'');
			if(attr[0] == '$')
				attr = obj[attr.substr(1)];
			p.setAttribute(arr[0],attr);
		},
		',':function(){
			p = p.parentNode;
			fnn.call(this);
		},
		'<':function(){
			p = p.parentNode;
			fnn.call(this);
		},
		'%':function(){
			var name = this._getName(s,i);
			if(!name)
				return;
			var el = document.createTextNode(name);
			p.appendChild(el);
			p = el;
		},
		'^':function(){
			var name = this._getName(s,i);
			if(typeof name == 'function')
				name.call(this,p);
		},
		'>':fnn,
		']':fnn,
	};
	
	for(i=0;i<str.length;i++){
		var c = str[i];
		if(op[c] !== undefined){
			//debugger;
			op[l].call(this);
			l = c;
			s = i;
		}
	}
	op[l].call(this);
	
	return d;
	
	function fnn(){
		var name = this._getName(s,i);
		if(!name)
			return;
		var el;
		if(typeof name == 'object')
			el = name;
		else if(name.charAt(0) == '%')
			el = document.createTextNode(name.substr(1));
		else
			el = document.createElement(name);
		p.appendChild(el);
		if(el.constructor.name == 'DocumentFragment')
			p = el.lastElementChild;
		else
			p = el;
	}
}
templater.prototype.EL = function(options){
	var el = document.createElement(options.t);
	this._applyOptions(el,options);
}
templater.prototype._getName = function(start,end){
	start++;
	var name = this.str.substr(start,end ? end-start : undefined).trim();
	if(name.charAt(0) == '$'){
		name = name.substr(1);
		//return (typeof this.fn[name] == 'function') ? this.fn[name](this._p) : this.fn[name];
		return this.fn[name];
	}
	else
		return name;
}
templater.prototype._applyOptions = function(el,opt){
	if(!opt)
		opt = {};
	if(opt.className || opt.class)
		el.className = opt.class || opt.className;
	if(opt.id)
		el.id = opt.id;
	if(opt.attr || opt.attrs || opt.att){
		var attrs = opt.attrs || opt.attr || opt.att || {};
		for(var i in attrs)
			el.setAttribute(i,attrs[i]);
	}
	if(opt.type)
		el.type = opt.type;
	if(opt.placeholder)
		el.placeholder = opt.placeholder;
	if(opt.value)
		el.value = opt.value;
}








Imm.prototype.parseDates = function(pBlock){
	if(!pBlock)
		pBlock = document;
	
	var addDates = document.getElementsByClassName('imm-datepicker');
	
	for(var i=0;i<addDates.length;i++){
		
		var date = new IMM.DATEPICKER(addDates[i]);
		
	}
}
Imm.prototype.parseTabs = function(pBlock){
	
	if(!pBlock)
		pBlock = document;
	
	var tabsArr = this.all.tabs;
	
	var allTabs = document.getElementsByClassName('imm-tabs');
	
	for(var i=0;i<allTabs.length;i++){
		
		var tab = new IMM.TAB(allTabs[i]);
		
	}
}
Imm.prototype.parseInps = function(pBlock){
	
	if(!pBlock)
		pBlock = document;
	
	var allInps = pBlock.getElementsByClassName("imm-input");
	for(var i=0;i<allInps.length;i++){
		//alert('Y');
		var inp = new IMM.INP(allInps[i]);
	}
}
Imm.prototype.parseSels = function(pBlock){
	
	if(!pBlock)
		pBlock = document;
	
	var allInps = pBlock.getElementsByClassName("imm-select");
	for(var i=0;i<allInps.length;i++){
		//alert('Y');
		var sel = new IMM.SEL(allInps[i]);
	}
}
Imm.prototype.parseRads = function(pBlock){
	
	if(!pBlock)
		pBlock = document;
	
	var allRads = pBlock.getElementsByClassName("imm-radio");
	var first = '';
	for(var i=0;i<allRads.length;i++){
		if(first != allRads[i].name){
			//alert('R');
			first = allRads[i].name;
			var rad = new IMM.RADIO(allRads[i].name);
		}
	}
}
Imm.prototype.parseChecks = function(pBlock){
	
	if(!pBlock)
		pBlock = document;
	
	var allChecks = pBlock.getElementsByClassName("imm-check");
	for(var i=0;i<allChecks.length;i++){
		var check = new IMM.CHECK(allChecks[i]);
	}
}
Imm.prototype.parseScrolls = function(pBlock){
	
	var alertSome = 0;
	if(pBlock === 1){
		pBlock = null;
		alertSome = 1;
	}
	
	if(!pBlock)
		pBlock = document;
	
	var allScrolls = pBlock.getElementsByClassName("imm-scroll");
	for(var i=0;i<allScrolls.length;i++){
		//alert(i);
		if(!allScrolls[i].o)
			var scroll = new IMM.SCROLL(allScrolls[i]);
	}
}
Imm.prototype.parseNumbers = function(pBlock){
	if(!pBlock)
		pBlock = document;
	var allNumbers = pBlock.getElementsByClassName("imm-number");
	for(var i=0;i<allNumbers.length;i++){
		var number = new IMM.NUMBER(allNumbers[i]);
	}
}
Imm.prototype.parseColors = function(pBlock){
	if(!pBlock)
		pBlock = document;
	var allColors = pBlock.getElementsByClassName("imm-color");
	for(var i=0;i<allColors.length;i++){
		var color = new IMM.COLOR(allColors[i]);
	}
}
Imm.prototype.parseWorktimes = function(pBlock){
	if(!pBlock)
		pBlock = document;
	var allWT = pBlock.getElementsByClassName("imm-worktime");
	for(var i=0;i<allWT.length;i++){
		var wt = new IMM.WORKTIME(allWT[i]);
	}
}
Imm.prototype.parseSliders = function(pBlock){
	if(!pBlock)
		pBlock = document;
	var allWT = pBlock.getElementsByClassName("imm-slider");
	for(var i=0;i<allWT.length;i++){
		var wt = new IMM.SLIDER(allWT[i]);
	}
}

Imm.prototype.mobileCheck = function(){
	var _this = this;
    var check = false;
    var a = navigator.userAgent||navigator.vendor||window.opera;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){check = true;}
    this.mobile = check;
	//this.mobile = false;
	this.supportsPassive = false;
	try {
	  var opts = Object.defineProperty({}, 'passive', {
		get: function() {
		  _this.supportsPassive = true;
		}
	  });
	  window.addEventListener("testPassive", null, opts);
	  window.removeEventListener("testPassive", null, opts);
	} catch (e) {}
	// Use our detect's results. passive applied if supported, capture will be false either way.
	//elem.addEventListener('touchstart', fn, supportsPassive ? { passive: true } : false); 
}

IMM.mobileCheck();




Imm.prototype.parseAll = function(pBlock){
	if(!pBlock)
		pBlock = document;
	
	IMM.parseTabs(pBlock);
	IMM.parseInps(pBlock);
	IMM.parseSels(pBlock);
	IMM.parseChecks(pBlock);
	IMM.parseScrolls(pBlock);
	IMM.parseRads(pBlock);
	IMM.parseDates(pBlock);
	IMM.parseNumbers(pBlock);
	IMM.parseColors(pBlock);
	IMM.parseWorktimes(pBlock);
	IMM.parseSliders(pBlock);
}


	/*IMM.parseTabs();
	IMM.parseInps();
	IMM.parseSels();
	IMM.parseChecks();*/
	//IMM.parseScrolls();
	/*
addEventListener('load',function(){
	IMM.parseRads();
},false);
*/

//IMM TABS