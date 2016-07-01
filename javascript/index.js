document.addEventListener("DOMContentLoaded",function(){

    var banner=getEle(".banner")[0],
        bannerLi=getEle(".banner_img li",banner),
        classArr=[],
        NewEle=getEle(".d_new")[0],
        NewUl=getEle("ul",NewEle)[0],
        NewList=getEle("li",NewEle),
        timer,
        NewiNow=0;

    //°ó¶¨resize£»
    for(var i=0;i<bannerLi.length;i++){
        classArr.push(bannerLi[i].className);
    }
    banner.addEventListener("touchstart",function(ev){
        var startX=ev.targetTouches[0].pageX;
        document.addEventListener("touchemove",move,false);
        document.addEventListener("touchend",end,false);
        function move(ev){
            ev.stopPropagation();
            ev.preventDefault();
        }
        function end(ev){
            var endX=ev.changedTouches[0].pageX;
            var dis=Math.abs(startX-endX);
            console.log(startX,endX);
            if(dis>100){
                if(startX>endX && dis>100){
                    classArr.unshift(classArr.pop());
                    addClass()
                }else if(startX<endX && dis>100){

                    classArr.push(classArr.shift());
                    addClass()
                }
            }
            document.removeEventListener("touchemove",move);
            document.removeEventListener("touchend",end);
        }
        function addClass(){

            for(var i=0;i<classArr.length;i++){
                bannerLi[i].className='';
                bannerLi[i].classList.add(classArr[i]);
            }
        }
    },false);

    clearInterval(timer);

    timer=setInterval(function(){
        NewiNow++;
        newTab();

    },2000);
    function newTab(){

        if(NewiNow>NewList.length-1)NewiNow=0;
        console.log(NewiNow*NewList[0].offsetHeight);
        NewUl.style.webkitTransform="translate(0,"+-NewiNow*NewList[0].offsetHeight+"px)";

    }


function getStyle(obj,style){
    return obj.currentStyle[style];
}
function getEle(child,parent){
    var parent=parent||document;
    return parent.querySelectorAll(child);
}
},false);