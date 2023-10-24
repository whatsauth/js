import {refreshbutton} from "./template.js";
import qrcode  from 'https://cdn.skypack.dev/qrcode-generator-es6';

function connectWS(wauthparam,id) {
    return new Promise(function(resolve, reject) {
        let wsconn = new WebSocket(atob(wauthparam.auth_ws));
        wsconn.onopen = () => {
          wsconn.send(id);
          console.log("connected and set id");
          resolve(wsconn);
        };
        wsconn.onerror = (err) => {
          console.log("socket error rejected");
          reject(err);
        };
        wsconn.onclose = (evt) => {
          console.log("connection closed");
        };
        wsconn.onmessage = (evt) => {
          let messages = evt.data;
          console.log("incoming message");
          catcher(wauthparam,messages);
        };
  
    });
  }

function openWebSocketSetId(wauthparam,id){
    if (window["WebSocket"]) { //check browser support
        connectWS(wauthparam,id).then((server) => {
            wauthparam.wsocket=server;
        }).catch((err) => {
        console.log("socket error id : "+id);
        });
    } else {
        alert("Please Update Your browser to the latest version.");
    }
}

function closeWebSocket(wauthparam){
    if (wauthparam.wsocket !== 0){
        wauthparam.wsocket.close();
    }
}

function sendMessagetoWebSocket(msg){
    if (wsocket.readyState === WebSocket.OPEN){
        wsocket.send(msg);
    }
}

function generatePassword() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.";
    var passwordLength = 17;
    var password = "";
    for (let i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
        }
    return password;
}

function generateUUID(wauthparam){
    let wuid;
    if (window.location.search === ''){  
        let uuid=crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+wauthparam.apphost;
        if (wauthparam.mobile){
            wuid = "m."+uuid;
        }else{
            wuid = "d."+uuid;
        }
    }else{
        if (wauthparam.mobile){
            wuid=wauthparam.urlgetparams.uuid;
        }
    }
    return wuid;
}


const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export async function qrController(wauthparam) {
    for (let i = 1; i <= wauthparam.maxqrwait; i++) {
        await sleepNow(1000);
        setCounterandQR(wauthparam);
    }
    var svg = document.getElementById(wauthparam.id_qr);
    svg.innerHTML=refreshbutton;
    document.getElementById(wauthparam.id_counter).innerHTML = "Refresh Your Browser to get QR";
}

function setCounterandQR(wauthparam){
    document.getElementById(wauthparam.id_counter).innerHTML = wauthparam.countdown;
    if (wauthparam.countdown === 0) {
        closeWebSocket(wauthparam);
        wauthparam.countdown=wauthparam.interval;
        let uuid = generateUUID(wauthparam);
        let waurl=atob(wauthparam.keyword)+uuid;
        showQR(waurl,wauthparam);
        openWebSocketSetId(wauthparam,uuid);
    }
    wauthparam.countdown--;
}

function makeQrCode(text,wauthparam){
    const qrc = new qrcode(0, 'H');
    qrc.addData(text);
    qrc.make();
    let qr = qrc.createSvgTag({});
    var svg = document.getElementById(wauthparam.id_qr);
    svg.innerHTML=qr;
}

function showQR(text,wauthparam){
    if (typeof text === 'string' && text.length === 0) {
        document.getElementById('qrcode').style.display = 'none';
    } else {
        makeQrCode(text,wauthparam);
    }
}

function setCookieWithExpireHour(cname, cvalue, exhour) {
    const d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function deleteCookie(cname) {
    document.cookie = cname + "= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function fillformLogin(resjson){
    document.getElementById(id_user).value = resjson.user_name;
    document.getElementById(id_pass).value = resjson.user_pass;
}

function submitLogin(){
    document.getElementById(id_qr).innerHTML = "Success Login, Please Wait...";
    if (using_click) {
        document.getElementById(id_button).click();
    }else{
        document.getElementById(id_form).submit();
    }
}

function catcher(wauthparam,result){
    if (result.length > 2){
        jsonres = JSON.parse(result);
        console.log("catcher runner");
        console.log(jsonres);
        setCookieWithExpireHour(wauthparam.tokencookiename,jsonres.login,wauthparam.tokencookiehourslifetime);
        fillformLogin(jsonres);
        submitLogin();
    }
}


export function IsMobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function getParamsfromURL(){
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
}