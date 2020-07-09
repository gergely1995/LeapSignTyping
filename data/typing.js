/*!
 * LeapSignTyping
 * https://github.com/gergely1995/LeapSignTyping/
 *
 * Copyright 2020 Gergely Szentgyörgyi
 * Released under the Apache-2.0 license
 * https://github.com/gergely1995/LeapSignTyping/blob/master/LICENSE
 */

var controller = new Leap.Controller({enableGestures: true});


var AO=[[false,null,null],[["a","b","c","d","e"],["f","g","h","i","j"],["k","l","m","n","o"],["p","q","r","s","t"],["u","v","w","x","y"],["z"]]];//[toggle,selection],[alphabet]
var txt="";
var sn=[false,false,null];
var tt=null;
var okct=false;//toggle options
var obt=[false,null];//toggle,prev

function timeT(frame){
//    if(tt==null){tt=Date.now();}
//    if(Date.now()-tt>1000){return true;}
    if(AO[0][0]==false&&tt==null){tt=frame.timestamp;}
//    console.log(frame.timestamp-tt);
    if(frame.timestamp-tt>1000000){tt=null; return true;}
    return false;
}

function signToInt(frame){
    var hand=frame.hands[0]
    //            if(){}
    if(AO[0][0]==false){//fingers to numbers
        console.log(hand.thumb.extended+"|"+hand.indexFinger.extended+"|"+hand.middleFinger.extended+"|"+hand.ringFinger.extended+"|"+hand.pinky.extended);
        if(timeT(frame)==true){
            //            tt==null;
            /*5*/if(hand.thumb.extended&&hand.indexFinger.extended&&hand.middleFinger.extended&&hand.ringFinger.extended&&hand.pinky.extended){
                AO[0][0]=true;
                console.log(5);
                return 5;
            }
            /*4*/else if(!hand.thumb.extended&&hand.indexFinger.extended&&hand.middleFinger.extended&&hand.ringFinger.extended&&hand.pinky.extended){
                AO[0][0]=true;
                console.log(4);
                return 4;
            }
            /*3*/else if(hand.thumb.extended&&hand.indexFinger.extended&&hand.middleFinger.extended&&!hand.ringFinger.extended&&!hand.pinky.extended){
                AO[0][0]=true;
                console.log(3);
                return 3;
            }
            /*2*/else if(!hand.thumb.extended&&hand.indexFinger.extended&&hand.middleFinger.extended&&!hand.ringFinger.extended&&!hand.pinky.extended){
                AO[0][0]=true;
                console.log(2);
                return 2;
            }
            /*1*/else if(!hand.thumb.extended&&hand.indexFinger.extended&&!hand.middleFinger.extended&&!hand.ringFinger.extended&&!hand.pinky.extended){
                AO[0][0]=true;
                console.log(1);
                return 1;
            }
//            /*6*/else if(!hand.thumb.extended&&!hand.indexFinger.extended&&!hand.middleFinger.extended&&!hand.ringFinger.extended&&hand.pinky.extended){
            /*6*/else if(!hand.thumb.extended&&!hand.indexFinger.extended&&!hand.middleFinger.extended&&!hand.ringFinger.extended&&hand.pinky.direction[0]>0.1){
                AO[0][0]=true;
                console.log(6);
                return 6;
            }
        }
        //            }else if(!hand.indexFinger.extended&&!hand.middleFinger.extended&&!hand.ringFinger.extended&&!hand.pinky.extended&&!hand.thumb.extended){AO[0][0]=false;AO[0][1]=null;AO[0][2]=null;}
    }else if(!hand.indexFinger.extended&&!hand.middleFinger.extended&&!hand.ringFinger.extended&&!hand.pinky.extended&&!hand.thumb.extended){AO[0][0]=false;console.log("reset");}
    return null;
}
function OKbkspc(hand){
    var OKdir=0.2;
    var NOdir=-0.2;
    if(obt[0]==false&&hand.thumb.extended&&hand.grabStrength==1&&!hand.indexFinger.extended&&!hand.middleFinger.extended&&!hand.ringFinger.extended&&!hand.pinky.extended){//ok sign
        if(obt[1]==null){obt[1]=hand.direction[0];}
        if(hand.direction[0]>obt[1]+OKdir){//up
            obt[0]=true;
            console.log("OK");
            return "OK";
        }else if(hand.direction[0]<obt[1]+NOdir){//down
            obt[0]=true;
            console.log("backspace");
            return "backspace";
        }
//    }else if(obt[0]==true&&hand.grabStrength==0){obt[0]=false;obt[1]=null;return "reset";}//reset
    }else if(obt[0]==true&&(!hand.indexFinger.extended&&!hand.middleFinger.extended&&!hand.ringFinger.extended&&!hand.pinky.extended&&!hand.thumb.extended)){obt[0]=false;obt[1]=null;return "reset";}//reset
    return null;
}
function swipeN(hand){
    if(hand.grabStrength==1){
        if(sn[2]==null){sn[2]=hand.palmPosition[0];}
        else{
            if(hand.palmPosition[0]<sn[2]){sn[2]=null;sn[1]=false;}
        }
        if(sn[2]!=null){if(sn[1]==false){if(hand.palmPosition[0]<-100){sn[1]=true;}}else if(hand.palmPosition[0]>100){sn[1]=false;return true;console.log(txt);}}
    }
}


controller.loop(function(frame) {
    if(frame.hands.length>0){
        if(swipeN(frame.hands[0])==true){console.log("space");txt+=" ";}
        var tmp=signToInt(frame);
        if(tmp!=null){
//            console.log(tmp);
            if(AO[0][1]==null){AO[0][1]=tmp-1;}
            else if(AO[0][1]!=null&&AO[0][2]==null){AO[0][2]=tmp-1;}
            if(AO[0][1]!=null&&AO[0][2]==null){
//                console.log(AO[0][1]);
//                if(document.getElementById("AO_"+AO[0][1]+"_"+i)){
//                    for(var i=0; i<AO[1][AO[0][1]].length; i++){document.getElementById("AO_"+AO[0][1]+"_"+i).style["color"]="black";}
                for(var i=0; i<AO[1][AO[0][1]].length; i++){
                    document.getElementById("AO_"+AO[0][1]+"_"+i).style["color"]="white";
//                    document.getElementById("AO_"+AO[0][1]+"_"+i).style["background-color"]="#34363A";
                    document.getElementById("AO_"+AO[0][1]+"_"+i).style["background-color"]="gray";
                }
//                }
                console.log(AO[1][AO[0][1]]);
            }else if(AO[0][1]!=null&&AO[0][2]!=null){
//                console.log(AO[0][2]);
                console.log(AO[1][AO[0][1]][AO[0][2]]);
//                if(document.getElementById("AO_"+AO[0][1]+"_"+i)){
//                    document.getElementById("AO_"+AO[0][1]+"_"+AO[0][2]).style["color"]="red";
//                if(AO[0][2]>AO[1][AO[0][1]].length-1){AO[0][2]=AO[1][AO[0][1]].length-1;}
                if(AO[0][2]>AO[1][AO[0][1]].length-1){AO[0][2]=null;}else{
                    document.getElementById("AO_"+AO[0][1]+"_"+AO[0][2]).style["color"]="white";
                    document.getElementById("AO_"+AO[0][1]+"_"+AO[0][2]).style["background-color"]="#34363A";
                }
//                }
            }
        }
        switch(OKbkspc(frame.hands[0])){
            case "OK":
                if(AO[0][1]!=null){
//                if(document.getElementById("AO_"+AO[0][1]+"_"+i)){
//                    for(var i=0; i<AO[1][AO[0][1]].length; i++){document.getElementById("AO_"+AO[0][1]+"_"+i).style["color"]="gray";}
                    for(var i=0; i<AO[1][AO[0][1]].length; i++){
                        document.getElementById("AO_"+AO[0][1]+"_"+i).style["color"]="gray";
                        document.getElementById("AO_"+AO[0][1]+"_"+i).style["background-color"]="";
                    }
//                }
                if(AO[1][AO[0][1]][AO[0][2]]){txt+=AO[1][AO[0][1]][AO[0][2]];}
                AO[0][1]=null;AO[0][2]=null;
                console.log(txt);
                document.getElementById("typed").remove();
                document.getElementById("header").insertAdjacentHTML('afterbegin',''
                                                                     +'<p id="typed" style="color:white; text-align:center;">'+txt+'</p>'
                                                                     );
                }
                break;
            case "backspace":
                if(AO[0][1]!=null){
//                if(document.getElementById("AO_"+AO[0][1]+"_"+i)){
//                    for(var i=0; i<AO[1][AO[0][1]].length; i++){document.getElementById("AO_"+AO[0][1]+"_"+i).style["color"]="gray";}
                    for(var i=0; i<AO[1][AO[0][1]].length; i++){
                        document.getElementById("AO_"+AO[0][1]+"_"+i).style["color"]="gray";
                        document.getElementById("AO_"+AO[0][1]+"_"+i).style["background-color"]="";
                    }
//                }
                }else if(AO[0][1]==null){
                    if(txt.length>0){txt=txt.slice(0,txt.length-1);}
                    document.getElementById("typed").remove();
                    document.getElementById("header").insertAdjacentHTML('afterbegin',''
                                                                         +'<p id="typed" style="color:white; text-align:center;">'+txt+'</p>'
                                                                         );
                }
                AO[0][1]=null;AO[0][2]=null;
                console.log(txt);
                break;
        }
    }
});
controller.on('ready', function() {
    console.log("ready");
});
controller.on('connect', function() {
    console.log("connect");
});
controller.on('disconnect', function() {
    console.log("disconnect");
});
controller.on('focus', function() {
    console.log("focus");
});
controller.on('blur', function() {
    console.log("blur");
});
controller.on('deviceConnected', function() {
    console.log("deviceConnected");
});
controller.on('deviceDisconnected', function() {
    console.log("deviceDisconnected");
});

