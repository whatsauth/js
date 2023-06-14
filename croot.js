function connect(id) {
    return new Promise(function(resolve, reject) {
        let wsconn = new WebSocket(atob(auth_ws));
        wsconn.onopen = function() {
          wsconn.send(id);
          console.log("connected and set id");
          resolve(wsconn);
        };
        wsconn.onerror = function(err) {
          console.log("socket error rejected");
          reject(err);
        };
        wsconn.onclose = function (evt) {
          console.log("connection closed");
        };
        wsconn.onmessage = function (evt) {
          let messages = evt.data;
          console.log("incoming message");
          catcher(messages);
        };
  
    });
  }

function openWebSocketSetId(id){
if (window["WebSocket"]) { //check browser support
    connect(id).then(function(server) {
    wsocket=server;
    }).catch(function(err) {
    console.log("socket error");
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
var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.";
var passwordLength = 17;
var password = "";
for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
    }
return password;
}

function generateUUID(wauthparam){
let wuid;
if (wauthparam.urlgetparams.uuid === undefined){
    uuid=crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+apphost;
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

export function qrController(wauthparam) {
setCounterandQR(wauthparam);
wauthparam.rto++;
if (wauthparam.rto < wauthparam.maxqrwait){
    setTimeout('qrController(wauthparam)',1000);
}else{
    var svg = document.getElementById(wauthparam.id_qr);
    svg.innerHTML=wauthparam.refreshbutton;
    document.getElementById(wauthparam.id_counter).innerHTML = "Refresh Your Browser to get QR";
}
}

function setCounterandQR(wauthparam){
document.getElementById(wauthparam.id_counter).innerHTML = wauthparam.countdown;
if (wauthparam.countdown === 0) {
    closeWebSocket(wauthparam);
    wauthparam.countdown=wauthparam.interval;
    uuid = generateUUID(wauthparam);
    waurl=atob(wauthparam.keyword)+uuid;
    showQR(waurl);
    openWebSocketSetId(uuid);
}
countdown--;
}

function makeQrCode(text){
qr = QRCode.generateSVG(text, {
    ecclevel: "M",
    fillcolor: "#FFFFFF",
    textcolor: "#000000",
    margin: 4,
    modulesize: 8
});
var svg = document.getElementById(id_qr);
    svg.replaceChild(qr,svg.firstElementChild);
}

function showQR(text){
if (typeof text === 'string' && text.length === 0) {
    document.getElementById('qrcode').style.display = 'none';
} else {
    makeQrCode(text);
}
}

function setCookieWithExpireDay(cname, cvalue, exdays) {
const d = new Date();
d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
let expires = "expires="+d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setCookieWithExpireHour(cname, cvalue, exhour) {
const d = new Date();
d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
let expires = "expires="+d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setCookieWithExpireSecond(cname, cvalue, exsecs) {
const d = new Date();
d.setTime(d.getTime() + (exsecs * 1000));
let expires = "expires="+d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function deleteCookie(cname) {
document.cookie = cname + "= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(cname) {
let name = cname + "=";
let ca = document.cookie.split(';');
for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
    c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
    }
}
return "";
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

function catcher(result){
if (result.length > 2){
    jsonres = JSON.parse(result);
    console.log("catcher runner");
    console.log(jsonres);
    setCookieWithExpireHour(tokencookiename,jsonres.login,tokencookiehourslifetime);
    fillformLogin(jsonres);
    submitLogin();
}
}

