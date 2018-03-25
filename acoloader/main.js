
function getSettings(l){
	var allSet = document.getElementsByClassName("l-set");
	for(let i=0;i<allSet.length;i++){
		let o = allSet[i];
		let fname = o.dataset.name;
		let ftype = o.dataset.type;
		let mw = o.dataset.mw;
		let typename = ftype == 'public' ? 'settings' : '_settings';
		let val = valSearch(l[typename],fname);
		o.value = mw ? window[mw](val) : val;
		o.addEventListener('change',function(){
			setVal(this,l);
		},false);
	}
}

function valSearch(obj,val,set){
	var varr = val.split('.');
	var so = obj;
	while(varr.length){
		if(set != void 0 && varr.length == 1){
			so[varr.shift()] = set;
			return;
		}
		let f = varr.shift();
		so = so[f];
	}
	return so;
}

function setVal(el,l){
	let fname = el.dataset.name;
	let ftype = el.dataset.type;
	let mw = el.dataset.mw;
	let typename = ftype == 'public' ? 'settings' : '_settings';
	let val = el.value;
	if(mw)
		val = window[mw](val,1);
	valSearch(l[typename],fname,val);
}

function convertNums(val,r){
	return parseFloat(val);
}

function convertToDeg(val,r){
	if(r) 
		return parseInt(val)/180*Math.PI;
	return 180/Math.PI*parseFloat(val);
}

var bNoise = document.getElementsByClassName("set-noise")[0];
var blockNoise = document.getElementsByClassName("noise")[0];
var bBg = document.getElementsByClassName("set-bg")[0];
var blockBg = document.getElementsByClassName("load-bg")[0];

bNoise.addEventListener('change',function(){
	blockNoise.style.opacity = this.value;
},false);
bBg.addEventListener('change',function(){
	blockBg.style.backgroundColor = this.value;
},false);
