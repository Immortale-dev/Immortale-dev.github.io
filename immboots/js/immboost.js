

addEventListener('DOMContentLoaded',function(){

},false);

//ALL IMM COMPONENTS
var Imm = function(){
	
	this.all = {
		tabs:[]
	};
	
}

var IMM = new Imm();

Imm.prototype.TAB = function(tab){
	this._o = tab;
	this.activate();
}

Imm.prototype.INP = function(inp){
	this._o = inp;
	this.activate();
}

Imm.prototype.SEL = function(sel){
	this._o = sel;
	this.activate();
}

Imm.prototype.RADIO = function(rad){
	var allRads = document.getElementsByName(rad);
	this._o = allRads;
	this.activate();
}

Imm.prototype.CHECK = function(check){
	//var allRads = document.getElementsByName(rad);
	this._o = check;
	this.activate();
}
Imm.prototype.SCROLL = function(scroll,callback){
	this._o = scroll;
	this.activate(callback);
}
Imm.prototype.DATEPICKER = function(inp){
	this._o = inp;
	this.activate();
}
Imm.prototype.NUMBER = function(inp){
	this._o = inp;
	this.activate();
}
Imm.prototype.COLOR = function(inp){
	this._o = inp;
	this.activate();
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
	
	var self = this;
	var o = this._o;
	this._o.SCROLL = this;
	
	o.o = this;
	
	o.classList.add('no-scrollbars');
	
	var div = document.createElement('div');
	div.className = 'imm-scroll-in';
	
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
	
	
	
	o.addEventListener('mouseenter',function(event){
		if(this.clientHeight < this.children[0].offsetHeight){
			this.children[1].classList.add('active');
		}
		self._updateHandleHeight();
	},false);
	o.addEventListener('mouseleave',function(){
		this.children[1].classList.remove('active');
	},false);
	
	
	
	var scrollLineHand = o.children[1].children[0];
	var bodyBlock = o.children[0];
	
	var handleT = 0;
	var oldY;
	
	scrollLineHand.addEventListener('mousedown',function(event){
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
			
			scrollLineHand.style.top = self.nScr*self.scrollRatio+'px';
			bodyBlock.style.marginTop = -self.nScr+'px';
			
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
		event.preventDefault();
		//console.log(event);
		
		
		var delta = event.deltaY || event.detail || event.wheelDelta;
		
		if(delta > 0)
			delta = 120;
		if(delta < 0)
			delta = -120;
		
		var scrollLen = delta / 2;
		
		//if(o.clientHeight < o.children[0].offsetHeight){
		self.cScr += scrollLen;
	
		if(self.scrollDone === 0){
			self._makeScroll();
		}
		
		event.stopPropagation();
		
		//}
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
	
	
	window.addEventListener('resize',function(){ self._makeScroll(); self._updateHandleHeight(); },false);
	
	
}
scrolls.prototype.trigger = function(w){
	var self = this;
	self.cScr = w;
	if(self.scrollDone === 0){
		self._makeScroll();
	}
}
scrolls.prototype._updateHandleHeight = function(){
	var self = this;
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
		
		scrollHand.style.top = pScr*self.scrollRatio+'px';
		ul.children[0].style.marginTop = -pScr+'px';
		
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
			
			//console.log(ow,limW);
			
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
				arr[i].style.width = Math.ceil(reW)+'px';
				arr[i].style.height = Math.ceil(reW)+'px';
				arr[i].style.top = dy - Math.ceil(reW/2)+'px';
				arr[i].style.left = dx - Math.ceil(reW/2)+'px';
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
  var el = evt.target,
      x = 0,
      y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }

  x = evt.clientX - x;
  y = evt.clientY - y;

  return { x: x, y: y };
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
		o.id = o.getAttribute('name')+'_checkid';
	
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
		
		scrollHand.style.top = pScr*self.scrollRatio+'px';
		ul.children[0].style.marginTop = -pScr+'px';
		
		
		
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
		searchStr = headBlock.children[0].children[0].innerHTML.trim();
	
	
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
	
	
	var dataCount = o.hasAttribute('data-count') ? parseInt(o.getAttribute('data-count')) : 6;
	var dataSearch = o.hasAttribute('data-search') ? 1 : 0;
	var dataMulti = o.hasAttribute('multiple') ? 1 : 0;
	var dataDefaultSearch = o.hasAttribute('data-defaultsearch') ? o.getAttribute('data-defaultsearch') : 'Press Buttons To Search...';
	var labelText = o.hasAttribute('placeholder') ? o.getAttribute('placeholder') : '';
	

	var bblock = document.createElement('div');
	bblock.className = 'imm-select-base-block';
	if(dataMulti)
		bblock.classList.add('multiselect');
	bblock.setAttribute('tabindex','1');
	var labelDiv = '';
	if(labelText != ''){
		labelDiv = '<label class="">'+labelText+'</label>';
	}
	bblock.innerHTML = '<div class="imm-select-head-block"></div><div class="imm-select-body-block"><ul></ul><div class="scroll-line"><div class="scroll-line-hand"></div></div></div>'+labelDiv;
	
	var bodyBlock = bblock.children[1].children[0];
	var headBlock = bblock.children[0];
	
	
	if(dataSearch){
		//console.log(headBlock);
		headBlock.innerHTML = '<div data-default="'+dataDefaultSearch+'" class="imm-select-searchbar"><span class="def-search"></span></div>';
	}
	
	this.html = bblock;
	
	
	if(dataSearch){
		window.addEventListener('keydown',function(event){
			if(self.focused){
				if(event.keyCode == 8){
					event.preventDefault();
					var str = headBlock.children[0].children[0].innerHTML;
					headBlock.children[0].children[0].innerHTML = str.substr(0,str.length-1);
					self._filter();
				}
			}
		},false);
		window.addEventListener('keypress',function(event){
			if(self.focused){
				event.preventDefault();
				console.log(event);
				var l = String.fromCharCode(event.keyCode || event.charCode);
				headBlock.children[0].children[0].innerHTML += l;
				self._filter();
			}
		},false);
	}
	
	
	bblock.addEventListener('focus',function(){
		
		setTimeout(function(){ self.resized(); },300);
		headBlock.classList.add('active');
		self.focused = 1;
		
		if(dataSearch){
			headBlock.children[0].getElementsByClassName("def-search")[0].innerHTML = '';
			self._filter();
		}
		
		var absY = 0;
		var absH = document.body.offsetHeight || document.document.body.offsetHeight;
		bbP = bblock;
		do{
			if(bbP.classList.contains('imm-scroll-in')){
				absH = bbP.offsetHeight;
				break;
			}
			absY+=bbP.offsetTop;
		}while(bbP = bbP.offsetParent);
		
		
		
		//console.log(absH);
		

		
		
		
		/*var limit = dataCount;
		var elC = this.children[1].children[0].children.length;
		
		if(elC<limit)
			limit = elC;
		//console.log(absH+" "+(absY + (limit+1)*50));
		if(absY + (limit+1)*50 > absH){
			this.classList.add('inverted');
		}*/
		
		self._updateInterval = setInterval(function(){ self.resized(); },500);
		
	},false);
	bblock.addEventListener('blur',function(){
		
		var sblock = this;
		
		setTimeout(function(){
			sblock.classList.remove('inverted');
		},300);
		
		this.children[1].children[0].style.marginTop = 0;
		self.cScr = 0;
		self.nScr = 0;
		self.scrollDone = 0;
		self.focused = 0;
		self.html.getElementsByClassName("scroll-line")[0].classList.remove('active');
		self.html.getElementsByClassName("scroll-line")[0].children[0].style.top = 0;
		clearInterval(self._updateInterval);
		
		if(bodyBlock.getElementsByClassName('active').length){
			bblock.classList.add('items-selected');
		}
		else{
			bblock.classList.remove('items-selected');
		}
		
	},false);
	
	var scrollLineBlock = self.html.getElementsByClassName("scroll-line")[0];
	var scrollLineHand = scrollLineBlock.children[0];
	
	
	var handleT = 0;
	var oldY;
	scrollLineHand.addEventListener('mousedown',function(event){
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
			if(self.cScr > bodyBlock.offsetHeight - bodyBlock.parentNode.offsetHeight){
				self.cScr = bodyBlock.offsetHeight - bodyBlock.parentNode.offsetHeight;
			}
			
			
			self.nScr = self.cScr;
			
			scrollLineHand.style.top = self.nScr*self.scrollRatio+'px';
			bodyBlock.style.marginTop = -self.nScr+'px';
		}
		
		
	},false);
	
	window.addEventListener('mouseup',function(){
		handleT = 0;
	},false);
	
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
		event.preventDefault();
		console.log(event);
		
		
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
		// IE9+, FF17+, Ch31+
		bodyBlock.addEventListener("wheel", onWheel);
	  } else if ('onmousewheel' in document) {
		// устаревший вариант события
		bodyBlock.addEventListener("mousewheel", onWheel);
	  } else {
		// Firefox < 17
		bodyBlock.addEventListener("MozMousePixelScroll", onWheel);
	  }
	} else { // IE8-
	  bodyBlock.attachEvent("onmousewheel", onWheel);
	}
		
	
	
	
	var wasAct = 0;
	//alert(o.options.length);
	
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
	
	var labelText = inp.getAttribute('placeholder');
	inp.removeAttribute('placeholder');
	
	var label = document.createElement('label');
	label.innerHTML = labelText;
	
	inp.parentNode.insertBefore(div,inp);
	div.appendChild(inp);
	div.appendChild(label);
	
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
	o.value = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
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
		//alert(1);
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
	
	o.addEventListener('change',function(){ if(!self.pushed) idiv.children[0].innerHTML = this.value; self.val = parseInt(this.value); },false);
	o.addEventListener('keydown',function(){ var slf = this; setTimeout(function(){ filterN.call(slf); },0); },false);
	o.addEventListener('keypress',function(){ var slf = this; setTimeout(function(){ filterN.call(slf); },0); },false);
	//o.addEventListener('keydown',filterN,false);
	o.addEventListener('keyup',filterN,false);
	
	
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
	
	
	this._fMove = function(e){
		self._moveEvent.call(self,e);
	}
	this._fUp = function(e){
		self._upEvent.call(self,e);
	}
	this._fCm = function(e){
		self._contextEvent.call(self,e);
	}
	
	
	pdiv.addEventListener('mousedown',function(e){
		e.preventDefault();
		if(e.which != 1)
			return;
		self.pushed = 1;
		self.pos = {x:e.clientX,y:e.clientY};
		self.block.classList.add('active');
		window.addEventListener('mousemove',self._fMove,false);
		window.addEventListener('mouseup',self._fUp,false);
		window.addEventListener('contextmenu',self._fCm,false);
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
}
numbers.prototype._contextEvent = function(e){
	e.preventDefault();
	this.calcPicker(1);
}
numbers.prototype.createPickerPlace = function(){
	
	var sp = document.createElement('span');
	sp.classList.add('imm-number-pick-nb');
	
	var span = document.createElement('span');
	span.classList.add('imm-number-pick-n');
	
	sp.appendChild(span);
	
	var v = this.val;
	var di = document.createElement('i');
	di.innerHTML = v;
	di.classList.add('imm-number-pi');
	span.appendChild(di);
	//v += 4;
	for(var i=1;i<5;i++){
		di = document.createElement('i');
		di.classList.add('imm-number-pi');
		di.innerHTML = v+i*this.picked;
		span.appendChild(di);
		di = document.createElement('i');
		di.classList.add('imm-number-pi');
		di.innerHTML = v-i*this.picked;
		span.insertBefore(di,span.children[0]);
	}

	span.D = this.picked;	
	span.P = 0;
	
	return sp;
}
numbers.prototype.rebuildPicks = function(){
	for(var i=0;i<this.picker.children[0].children.length;i++){
		var pp = this.picker.children[0].children[i];
		var k = this.val-4*pp.D;
		for(var j=0;j<pp.children.length;j++){
			pp.children[j].innerHTML = k;
			k+=pp.D;
		}
	}
}
numbers.prototype.calcPicker = function(t){
	//var movedX = parseInt((this.cur.x-this.pos.x)/30);
	
	//console.log(this.pos.x);
	
	
	
	if(t){
	
		var p = parseInt(this.p);
		p ++;
		if(p < 0)
			p = this.maxp;
		if(p > this.maxp)
			p = 0;
		this.p = p;
		
		this.pos.x = this.cur.x;
		
		var num = Math.pow(10,p);
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
		//console.log(v+' '+this.picked+' '+parseFloat(v*this.picked));
		this.pos.y -= v*15;
		this.val = parseInt(this.val)+parseInt(v*this.picked);
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
		},0);
		setTimeout(function(){
			pd.removeChild(pdO);
		},200);
	}
	else{
		this.picker.appendChild(np);
	}
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
	
	this.opened = 0;
	
	this.block = nContainer;
	
	this.initColor(1);
	
	this.cLeftWidth = 10;
	this.cLeftHeight = 110;
	this.cRightWidth = 200;
	this.cRightHeight = 128;
	
	this.updateControlValues();
	
	o.addEventListener('change',function(){
		self.initColor(1);
		self.renderPicker();
	});
	
	o.addEventListener('keyup',function(){
		self.initColor();
		self.renderPicker();
	});
	
	o.addEventListener('blur',function(){
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
}
colors.prototype._crmm = function(e){

	var y = this._crmmO.v - (this._crmmO.y - e.pageY);
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
	//this.updateControls();
}
colors.prototype._clmm = function(e){
	var y = this._clmmO.vy + (this._clmmO.y - e.pageY);
	if(y < 0)
		y = 0;
	if(y > this._clmmO.my)
		y = this._clmmO.my;
	
	var x = this._clmmO.vx + (this._clmmO.x - e.pageX);
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

}
colors.prototype._clmu = function(e){
	window.removeEventListener('mousemove',this._clmmE,false);
	window.removeEventListener('mouseup',this._clmuE,false);
}
colors.prototype._cmmm = function(e){
	
	var y = this._cmmmO.v + (this._cmmmO.y - e.pageY);
	if(y < 0)
		y = 0;
	if(y > this._cmmmO.m)
		y = this._cmmmO.m;
	
	y/=this._cmmmO.m;
	
	y = parseInt(y*100)/100;
	
	this.acolor = y;
	
	this.updateColorFromControls();
	this.renderPicker();

}
colors.prototype._cmmu = function(e){
	window.removeEventListener('mousemove',this._cmmmE,false);
	window.removeEventListener('mouseup',this._cmmuE,false);
}
colors.prototype.updateColorFromControls = function(){
	
	var r = this.carr[0];
	var g = this.carr[1];
	var b = this.carr[2];
	
	
	
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
	
	this._o.value = this.color;
	
	this.updateIndec();
	
}
colors.prototype.updateIndec = function(){
	this.indec.style.backgroundColor = this.color;
};
colors.prototype.createBlock = function(){
	var div = document.createElement('div');
	div.classList.add('imm-color-pick-container');
	
	
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
  var el = evt.target,
      x = 0,
      y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }

  x = evt.clientX - x;
  y = evt.clientY - y;

  return { x: x, y: y };
}
colors.prototype.removeBlock = function(){
	if(this.colorContainer)
		this.colorContainer.parentNode.removeChild(this.colorContainer);
	this.colorContainer = null;
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
	
	if(mn == 1){
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