/**
 * Website: http://twos.in/
 *
 * Licensed under The Twos Studio License ( http://twos.in/ )
 * Redistributions of files must retain the above copyright notice.
 *
 * @author Immortal <Immortal0ua@gmail.com>
 * @version 1.1
 */

Math.easeInOutExpo = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
    t--;
    return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};
Math.linearTween = function (t, b, c, d) {
    return c*t/d + b;
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
Math.easeOutExpo = function (t, b, c, d) {
    return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};


var getAbsPos = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};



/*
addEventListener('resize',function(){
    resizeBigImage();
},false);*/


function showBubbles(idb){


    var images = document.getElementById(idb).getAttribute('data-imgs').split("|");
    var imagesMini = document.getElementById(idb).getAttribute('data-imgs-mini').split("|");
    var imagesDesc = document.getElementById(idb).getAttribute('data-desc').split("|");

    var all_bubbles;
    var nowBB = 0;

    var compBub;
    var wWidth;
    var bWidth;


    var activeteChangeImg = 1;


    var divBack = document.createElement('div');
    divBack.className = 'show-back-full active';
    divBack.innerHTML = '<div class="ts_loading">'+
    '<div class="ts_loaddiv">'+
        '<div class="ts_loadcircle ts_loadc1"></div>'+
        '<div class="ts_loadcircle ts_loadc2"></div>'+
        '<div class="ts_loadcircle ts_loadc3"></div>'+
        '<div class="ts_loadcircle ts_loadc4"></div>'+
        '<div class="ts_loadcircle ts_loadc5"></div>'+
    '</div>'+
    '</div><div class="bigBlock active"></div><div class="flatBack"></div>';

    document.body.appendChild(divBack);

    //var parDiv = document.getElementsByClassName("ts_loaddiv")[0].parentNode;
    //parDiv.innerHTML = 'LOL';

    function animateParam(block,param,val,dem,time,prepare,prepfn){

        var blockComp = window.getComputedStyle(block, null);
        var oldVal = parseFloat(blockComp[param]);
        var coIters = time/(1000/60);

        var iterVal = (val-oldVal)/coIters;

        var nowVal = parseFloat(oldVal);

        //alert(oldVal+' '+iterVal+' '+nowVal);
        var nowIterStep=0;
        //block.style[param] = nowVal;
        var doCycle = 1;

        (function() {
            nowIterStep++;
            //alert(1);
            nowVal += iterVal;

            //alert(nowVal);

            if(Math.abs(val-nowVal) <= 0.001){
                nowVal = val;
            }

            block.style[param] = nowVal+dem;

            if(prepare && Math.abs(prepare-nowVal) <= Math.abs(iterVal)+0.001 ){
                doCycle = 0;
                prepfn();
            }

            if(nowIterStep<coIters && doCycle)
                setTimeout(arguments.callee,1000/60);

        })();

    }


    function animateP(block,params,time,fn){

        var funArgs = arguments;

        var fnn = fn || 0;
        var fuFunc;



        var blockComp = window.getComputedStyle(block, null);

        var coIters = time/(1000/60);

        //alert(coIters);

        var param;

        var arrParPlus = [];
        var arrParNow = [];

        for (param in params) {
            var oldVal = parseFloat(blockComp[param]);

            if(param == 'borderRadius'){
                oldVal = parseFloat(blockComp.borderBottomLeftRadius);
            }

            var vals = params[param];
            //var iterVal = (vals[0]-oldVal)/coIters;
            arrParPlus.push((vals[0]-oldVal));
            arrParNow.push(oldVal);
        }




        //var nowVal = parseFloat(oldVal);

        //alert(oldVal+' '+iterVal+' '+nowVal);
        var nowIterStep=0;
        //block.style[param] = nowVal;
        var doCycle = 1;

        (function() {
            nowIterStep++;
            //alert(1);

            var nI = 0;
            for (param in params) {
                //arrParNow[nI] += arrParPlus[nI];
                if(params[param][2] == 0)
                    fuFunc = 'linearTween';
                if(params[param][2] == 1)
                    fuFunc = 'easeInOutExpo';
                if(params[param][2] == 2)
                    fuFunc = 'easeInQuart';
                if(params[param][2] == 3)
                    fuFunc = 'easeOutQuart';
                if(params[param][2] == 5)
                    fuFunc = 'easeOutExpo';



                var outVal = Math[fuFunc]((time/coIters)*nowIterStep,arrParNow[nI],arrParPlus[nI],time);

                block.style[param] = outVal+params[param][1];
                nI++;
            }

            //block.style[param] = nowVal+dem;



            if(nowIterStep<coIters && doCycle)
                setTimeout(arguments.callee,1000/60);
            else if(funArgs[4]) funArgs[4]();


        })();

    }



    function addImageInBuble(bub,img){
        var bubIn = document.createElement('div');
        var bubInUp = document.createElement('div');
        bubIn.className = 'bubIn';
        bubInUp.className = 'bubInUp';
        bubIn.style.backgroundImage = 'url('+img+')';

        bub.appendChild(bubIn);
        bub.appendChild(bubInUp);

        animateParam(bubInUp,'opacity',0.5,'',500);
    }

    function updateLeftPos(res){


        nowBB++;

        all_bubbles = document.getElementsByClassName('img_bubbles');

        if(res)
            nowBB = all_bubbles.length;

        compBub = window.getComputedStyle(all_bubbles[0], null);

        wWidth = document.getElementsByClassName("show-back-full")[0].clientWidth;
        bWidth = parseFloat(all_bubbles[0].offsetWidth) + parseFloat(compBub.marginLeft) + parseFloat(compBub.marginRight);

        var allBubWidth = bWidth*nowBB;
        var firstOffset = (wWidth-allBubWidth)/2;

        //alert(wWidth+' '+bWidth);
        var i;
        for(i=0;i<nowBB;i++){

            if(!res)
                all_bubbles[i].className = 'img_bubbles after';


            if(!res) {
                animateP(all_bubbles[i], {left: [(firstOffset + i * bWidth), 'px', 0]}, 100, 1);
                if (all_bubbles[i].children.length < 1)
                    addImageInBuble(all_bubbles[i], imagesMini[i+1]);
            }
            else{
                all_bubbles[i].style.left = (firstOffset + i * bWidth)+'px';
            }

        }

    }




    function resizeBigImage(anim){


        updateLeftPos(1);

        var bigB = document.getElementsByClassName('bigBlock')[0];


        var leftRoll = document.getElementsByClassName("bubble-move left")[0];
        var rightRoll = document.getElementsByClassName("bubble-move right")[0];
        var closeRoll = document.getElementsByClassName("bubble-close")[0];

        var bigWH = {w:bigB.offsetWidth,h:bigB.offsetHeight,wh:bigB.offsetWidth/bigB.offsetHeight};

        var imgWH = {wh:parseFloat(bigB.getAttribute("data-wh"))};

        var newH;
        var newW;
        var newLR;
        var newTB;

        if(bigWH.wh>imgWH.wh){
            //alert(1);
            newH = bigWH.h;
            newW = bigWH.h*imgWH.wh;
            newLR = (bigWH.w - newW)/2;
            newTB = 0;
        }
        else{
            //alert(2);
            newW = bigWH.w;
            newH = bigWH.w/imgWH.wh;
            newLR = 0;
            newTB = (bigWH.h-newH)/2;
        }

        if(leftRoll && rightRoll && closeRoll){
            leftRoll.style.top = newTB+'px';
            leftRoll.style.bottom = newTB+'px';
            rightRoll.style.top = newTB+'px';
            rightRoll.style.bottom = newTB+'px';
            closeRoll.style.left = newLR+'px';
            closeRoll.style.right = newLR+'px';

            rightRoll.style.width = newLR+100+'px';
            leftRoll.style.width = newLR+100+'px';
            closeRoll.style.height = newTB+50+'px';
        }

        var jImg = bigB.children[0];
        jImg.style.left = newLR+'px';
        jImg.style.right = newLR+'px';
        jImg.style.top = newTB+'px';
        jImg.style.bottom = newTB+'px';

        //animateP(bigB.children[0],{left:[newLR,'px',anmFN],right:[newLR,'px',anmFN],top:[newTB,'px',anmFN],bottom:[newTB,'px',anmFN],borderRadius:[0,'px',anmFN]},400,1);

        //var bigImgWH = parseFloat(document.getElementsByClassName("bigBlock")[0].getAttribute("data-wh"));

    }

    window.onresize = function(){
        resizeBigImage();
    };


    function changeBubleImage(id){


        var imgBubbles = document.getElementsByClassName("img_bubbles");

        var imgTo;

        /*
        for(var m=0;m<imgBubbles.length;m++){
            if(imgBubbles[m].getAttribute('data-i') == id){
                imgTo = imgBubbles[m];
                break;
            }

        }*/

        imgTo = document.getElementsByClassName('actImg')[0];


        var whCoof;

        var bigB = document.getElementsByClassName('bigBlock')[0];


        var bigWH = {w:bigB.offsetWidth,h:bigB.offsetHeight,wh:bigB.offsetWidth/bigB.offsetHeight};
        var imgWH;

        var nImg = new Image();
        nImg.onload = function(){
            imgWH = {w:this.width,h:this.height,wh:this.width/this.height};

            var newH;
            var newW;
            var newLR;
            var newTB;

            if(bigWH.wh>imgWH.wh){
                //alert(1);
                newH = bigWH.h;
                newW = bigWH.h*imgWH.wh;
                newLR = (bigWH.w - newW)/2;
                newTB = 0;
            }
            else{
                //alert(2);
                newW = bigWH.w;
                newH = bigWH.w/imgWH.wh;
                newLR = 0;
                newTB = (bigWH.h-newH)/2;
            }

            //alert(bigB.innerHTML);

            /*
            bigB.children[0].style.left = Math.abs(newLR)+'px';
            bigB.children[0].style.right = Math.abs(newLR)+'px';
            bigB.children[0].style.top = Math.abs(newTB)+'px';
            bigB.children[0].style.bottom = Math.abs(newTB)+'px';*/

            bigB.children[0].innerHTML = '<div class="actImgOnTop"></div>';

            var anmFN = 1;

            bigB.children[0].style.borderRadius = 1000+'px';
            animateP(bigB.children[0],{left:[newLR,'px',anmFN],right:[newLR,'px',anmFN],top:[newTB,'px',anmFN],bottom:[newTB,'px',anmFN],borderRadius:[1,'px',anmFN],marginLeft:[0,'px',anmFN],marginTop:[0,'px',anmFN]},400,1);



            bigB.children[0].style.width = 'auto';
            bigB.children[0].style.height = 'auto';
            bigB.setAttribute('data-wh',imgWH.wh);

            setTimeout(function(){

                var leftRoll = document.createElement('div');
                leftRoll.className = 'bubble-move left hidded';
                leftRoll.style.top = newTB+'px';
                leftRoll.style.bottom = newTB+'px';
                leftRoll.onclick = function(){
                    nextBubbleImage(-1);
                };

                var rightRoll = document.createElement('div');
                rightRoll.className = 'bubble-move right hidded';
                rightRoll.style.top = newTB+'px';
                rightRoll.style.bottom = newTB+'px';
                rightRoll.onclick = function(){
                    nextBubbleImage(1);
                };

                var closeRoll = document.createElement('div');
                closeRoll.className = 'bubble-close';
                closeRoll.style.left = newLR+'px';
                closeRoll.style.right = newLR+'px';
                closeRoll.onclick = function(){
                    setBubblesOnclick('lol');
                };


                //closeRoll.style.height = newTB+50+'px';

                var bBl = document.getElementsByClassName("bigBlock")[0];

                bBl.appendChild(leftRoll);
                bBl.appendChild(rightRoll);
                bBl.appendChild(closeRoll);


                animateP(rightRoll,{width:[newLR+100,'px',5]},200,1);
                animateP(leftRoll,{width:[newLR+100,'px',5]},200,1);
                animateP(closeRoll,{height:[newTB+50,'px',5]},200,1);

                var descInfo = document.createElement('div');
                descInfo.className = 'after';
                descInfo.innerHTML = imgTo.getAttribute('data-desc');


                bigB.children[0].appendChild(nImg);
                if(descInfo.innerHTML.trim() != '' && descInfo.innerHTML.trim() != 'undefined')
                    bigB.children[0].appendChild(descInfo);
                animateP(bigB.children[0].children[0],{opacity:[0,'',0]},200,1);
            },350);






        };
        nImg.src = imgTo.getAttribute('data-src');
    }



    function loadingComplite(){


        ///document.body.style.overflow = 'hidden';
        document.body.classList.add('b-over-hide');

        var bblenn = document.getElementsByClassName("ts_loadcircle").length;



        if(bblenn>images.length){

            //alert(1);

            var imDiff = bblenn-images.length;

            for(var d=0;d<imDiff;d++){

                var forDel = document.getElementsByClassName("ts_loadcircle")[1];
                forDel.parentNode.removeChild(forDel);
            }
        }

        //bubLen = all_bubbles.length;
        //////////////////////////////////////////////////////////////////////

        divBack.classList.add('faded');

        divBack.children[0].className = 'ts_loading complite';

        ////////////////////////////BIG BLOCK
        var bigBlock = document.getElementsByClassName("ts_loadc1")[0];
        bigBlock.className = 'actImg';
        bigBlock.setAttribute('data-src',images[0]);
        bigBlock.setAttribute('data-src-full',imagesMini[0]);
        bigBlock.setAttribute('data-i',0+'');
        bigBlock.setAttribute('data-desc',imagesDesc[0]);



        //bigBlock.innerHTML = '<img src="'+images[0]+'">';
        bigBlock.parentNode.parentNode.parentNode.children[1].appendChild(bigBlock);

        setTimeout(function(){
            bigBlock.classList.add('active');
        },100);





        all_bubbles = document.getElementsByClassName('ts_loadcircle');

        var loadDiv = document.getElementsByClassName("ts_loaddiv")[0];


        var bubLen = all_bubbles.length;

        nowBB = bubLen;



        for(var i=0;i<bubLen;i++){

            all_bubbles[0].setAttribute('data-src',images[i+1]);
            all_bubbles[0].setAttribute('data-src-full',imagesMini[i+1]);
            all_bubbles[0].setAttribute('data-desc',imagesDesc[i+1]);
            all_bubbles[0].setAttribute('data-i',i+'');
            all_bubbles[0].className = 'img_bubbles';



        }

        changeBubleImage(0);


        //var blocks = '<div class="bubble-move left hidded"></div><div class="bubble-move right hidded"></div>';



        setTimeout(function(){
            all_bubbles = document.getElementsByClassName("img_bubbles");
            bubLen = all_bubbles.length;


            //alert(bubLen+' '+images.length);



            //alert(bubLen);
            compBub = window.getComputedStyle(all_bubbles[0], null);

            wWidth = document.getElementsByClassName("show-back-full")[0].clientWidth;
            bWidth = parseFloat(all_bubbles[0].offsetWidth) + parseFloat(compBub.marginLeft) + parseFloat(compBub.marginRight);

            var allBubWidth = bWidth*bubLen;
            var firstOffset = (wWidth-allBubWidth)/2;

            //alert(wWidth+' '+bWidth);
            var i;
            for(i=0;i<bubLen;i++){
                all_bubbles[i].className = 'img_bubbles after';
                all_bubbles[i].style.left = (firstOffset+i*bWidth)+'px';

                if(all_bubbles[i].children.length < 1)
                    addImageInBuble(all_bubbles[i],imagesMini[i+1]);
                //bubInUp.style.opacity = 0.5;

            }

            //i++;

            (function() {
                if (i < images.length-1) {

                    var newBub = document.createElement('div');
                    newBub.setAttribute('data-src',images[i+1]);
                    newBub.setAttribute('data-src-full',imagesMini[i+1]);
                    newBub.setAttribute('data-desc',imagesDesc[i+1]);
                    newBub.setAttribute('data-i',i+'');
                    newBub.className = 'img_bubbles after';
                    newBub.style.left = wWidth + 'px';

                    var allBBB = document.getElementsByClassName("img_bubbles");
                    var lastBComp = window.getComputedStyle(allBBB[allBBB.length-1],null);
                    var lastLeft = parseFloat(lastBComp.left)+bWidth;

                    loadDiv.appendChild(newBub);


                    //alert(nowBB);





                    //all_bubbles[nowBB-1].id = 'LOL';
                    //alert(lastLeft);


                    animateParam(newBub,'left',0,'px',450,lastLeft,updateLeftPos);

                    i++;

                    setTimeout(arguments.callee,200);
                }
                else{
                    var allBubb = document.getElementsByClassName("img_bubbles");
                    for(var m=0;m<allBubb.length;m++){
                        allBubb[m].onclick = function(){
                            setBubblesOnclick(this);
                        };
                        allBubb[m].onmouseover = function(){
                            //alert(1);
                            animateP(this.children[1],{opacity:[0,'',0]},100,1);
                        };
                        allBubb[m].onmouseout = function(){
                            animateP(this.children[1],{opacity:[0.5,'',0]},100,1);
                        };
                    }
                }
            })();
        },500);
    }

    function nextBubbleImage(v){



        var actImg = document.getElementsByClassName("actImg")[0];
        var di = parseInt(actImg.getAttribute('data-i'));
        var bubbles = document.getElementsByClassName('img_bubbles');

        if(bubbles.length > 0) {

            di += v;
            if (di < 0)
                di = bubbles.length - 1;
            if (di > bubbles.length - 1)
                di = 0;

            var bl;

            for (var i = 0; i < bubbles.length; i++) {
                if (bubbles[i].getAttribute('data-i') == di) {
                    bl = bubbles[i];
                    break;
                }
            }

            setBubblesOnclick(bl);
        }

    }

    function setBubblesOnclick(el){
        //alert(el.getAttribute('data-src'));

        if(activeteChangeImg) {



            var bMoveLeft = document.getElementsByClassName('bubble-move left')[0];
            var bMoveRight = document.getElementsByClassName('bubble-move right')[0];
            var closeBubble = document.getElementsByClassName('bubble-close')[0];

            if(bMoveLeft && bMoveRight && closeBubble) {

                activeteChangeImg = 0;

                animateP(bMoveLeft, {width: [0, 'px', 5]}, 200, 1, function () {
                    bMoveLeft.parentNode.removeChild(bMoveLeft);
                });

                animateP(bMoveRight, {width: [0, 'px', 5]}, 200, 1, function () {
                    bMoveRight.parentNode.removeChild(bMoveRight);
                });

                animateP(closeBubble, {height: [0, 'px', 5]}, 200, 1, function () {
                    closeBubble.parentNode.removeChild(closeBubble);
                });


                if(typeof el == 'string'){
                    var actImgObj = document.getElementsByClassName('actImg')[0];
                    var flatDiv = document.getElementsByClassName('flatBack')[0];

                    var aPos = getAbsPos(actImgObj);
                    var aDems = {w: actImgObj.offsetWidth, h: actImgObj.offsetHeight};

                    var loadDiv = document.getElementsByClassName("ts_loading")[0];
                    var loadOffsetT = loadDiv.offsetHeight+actImgObj.parentNode.offsetHeight+110;


                    //alert(loadOffsetT);
                    /*
                    for(var k=0;k<loadDiv.children.length;k++){
                        animateP(loadDiv[k],{top:[parseFloat(loadDiv.offsetHeight),'px',5]},350,1);
                    }
                    */


                    flatDiv.classList.add('active');
                    flatDiv.appendChild(actImgObj);
                    actImgObj.style.left = aPos.left + 'px';
                    actImgObj.style.top = aPos.top + 'px';
                    actImgObj.style.width = aDems.w + 'px';
                    actImgObj.style.height = aDems.h + 'px';

                    animateP(actImgObj.children[0], {opacity: [1, '', 1]}, 200, 1, function () {
                        actImgObj.children[1].parentNode.removeChild(actImgObj.children[1]);
                    });

                    var cntr = {top: flatDiv.offsetHeight / 2, left: flatDiv.offsetWidth / 2};

                    animateP(actImgObj, {
                        width: [0, 'px', 1],
                        height: [0, 'px', 1],
                        left: [cntr.left, 'px', 1],
                        top: [cntr.top, 'px', 1],
                        borderRadius: [1000, 'px', 1]
                    }, 350, 1);

                    animateP(loadDiv,{opacity:[0,'',5]},350,1);

                    var showBackFull = document.getElementsByClassName("show-back-full")[0];

                    showBackFull.classList.remove('faded');

                    setTimeout(function(){
                        showBackFull.parentNode.removeChild(showBackFull);
                        document.body.classList.remove('b-over-hide');
                    },500);
                }
                else {

                    var actImgObj = document.getElementsByClassName('actImg')[0];

                    var elComputed = window.getComputedStyle(el, null);

                    var bPos = getAbsPos(el);
                    var aPos = getAbsPos(actImgObj);
                    var aDems = {w: actImgObj.offsetWidth, h: actImgObj.offsetHeight};

                    var flatDiv = document.getElementsByClassName('flatBack')[0];


                    flatDiv.classList.add('active');
                    flatDiv.appendChild(el);
                    el.style.left = bPos.left - parseFloat(elComputed.marginLeft) + 'px';
                    el.style.top = bPos.top + 'px';
                    //el.style.margin = 0;
                    flatDiv.appendChild(actImgObj);
                    actImgObj.style.left = aPos.left + 'px';
                    actImgObj.style.top = aPos.top + 'px';
                    actImgObj.style.width = aDems.w + 'px';
                    actImgObj.style.height = aDems.h + 'px';

                    actImgObj.setAttribute('data-i', el.getAttribute('data-id'));


                    animateP(actImgObj.children[0], {opacity: [1, '', 1]}, 200, 1, function () {
                        actImgObj.children[1].parentNode.removeChild(actImgObj.children[1]);
                        animateP(el.children[1], {opacity: [0, '', 1]}, 250);

                        var cntr = {top: flatDiv.offsetHeight / 2, left: flatDiv.offsetWidth / 2};

                        animateP(actImgObj, {
                            width: [40, 'px', 1],
                            height: [40, 'px', 1],
                            left: [cntr.left, 'px', 1],
                            top: [cntr.top, 'px', 1],
                            borderRadius: [1000, 'px', 1]
                        }, 350, 1, function () {

                            animateP(el, {top: [cntr.top - 20, 'px', 1], left: [cntr.left - 20, 'px', 1]}, 250, 1);
                            animateP(actImgObj, {
                                top: [bPos.top, 'px', 1],
                                left: [bPos.left, 'px', 1]
                            }, 250, 1, function () {


                                actImgObj.style.top = cntr.top + 'px';
                                actImgObj.style.left = cntr.left + 'px';

                                el.style.top = bPos.top + 'px';
                                el.style.left = bPos.left - parseFloat(elComputed.marginLeft) + 'px';
                                el.children[1].style.opacity = 1;


                                var allBubs = document.getElementsByClassName('img_bubbles');
                                var bubId = el.getAttribute('data-i');

                                if (bubId < allBubs.length - 1) {
                                    document.getElementsByClassName('ts_loading complite')[0].children[0].insertBefore(el, allBubs[bubId]);
                                }
                                else {
                                    document.getElementsByClassName('ts_loading complite')[0].children[0].appendChild(el);
                                }
                                el.style.top = 0;

                                document.getElementsByClassName('bigBlock')[0].appendChild(actImgObj);
                                actImgObj.style.left = 50 + '%';
                                actImgObj.style.top = 50 + '%';
                                actImgObj.style.bottom = 50 + '%';
                                actImgObj.style.right = 50 + '%';
                                actImgObj.style.marginLeft = 0 + 'px';
                                actImgObj.style.marginTop = 0 + 'px';


                                actImgObj.removeChild(actImgObj.children[0]);

                                var chDataSrc = el.getAttribute('data-src');
                                var chDataSrcFull = el.getAttribute('data-src-full');
                                var chDataDesc = el.getAttribute('data-desc');

                                el.setAttribute('data-src', actImgObj.getAttribute('data-src'));
                                el.setAttribute('data-src-full', actImgObj.getAttribute('data-src-full'));
                                el.setAttribute('data-desc', actImgObj.getAttribute('data-desc'));

                                actImgObj.setAttribute('data-src', chDataSrc);
                                actImgObj.setAttribute('data-src-full', chDataSrcFull);
                                actImgObj.setAttribute('data-desc', chDataDesc);
                                actImgObj.setAttribute('data-i', el.getAttribute('data-i'));

                                changeBubleImage(chDataSrc);

                                el.children[0].style.backgroundImage = 'url(' + el.getAttribute('data-src') + ')';


                                animateP(el.children[1], {opacity: [0.5, '', 1]}, 500, 1);

                                flatDiv.classList.remove('active');

                                activeteChangeImg = 1;


                            });
                        });
                    });
                }
            }
        }


    }


    //setTimeout(function() {

    var coLoaded = 0;

    var started = 0;

    for(var r=0;r<images.length;r++){



        (function(){
            var img = new Image();
            img.onload = function(){
                coLoaded++;

                //alert(1);

                if(coLoaded == images.length + imagesMini.length && !started){
                    started = 1;
                    loadingComplite();
                }
            };

            img.src = images[r];
        })();

        (function(){
            var imgg = new Image();
            imgg.onload = function(){
                coLoaded++;

                //alert(1);

                if(coLoaded == images.length + imagesMini.length && !started){
                    started = 1;
                    loadingComplite();
                }
            };

            imgg.src = imagesMini[r];
        })();
    }

    setTimeout(function(){
        if(!started){
            started = 1;

            loadingComplite();

        }
    },3000);





    //},2000);





    //alert(images[0]);


}