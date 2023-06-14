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

function closeWebSocket(){
if (wsocket !== 0){
    wsocket.close();
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

function generateUUID(){
let wuid;
if (urlgetparams.uuid == null){
    uuid=crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+apphost;
    if (mobile){
    wuid = "m."+uuid;
    }else{
    wuid = "d."+uuid;
    }
}else{
    if (mobile){
    wuid=urlgetparams.uuid;
    }
}
return wuid;
}

export function qrController() {
setCounterandQR();
rto++;
if (rto < maxqrwait){
    setTimeout('qrController()',1000);
}else{
    var svg = document.getElementById(id_qr);
    svg.innerHTML=refreshbutton;
    document.getElementById(id_counter).innerHTML = "Refresh Your Browser to get QR";
}
}

function setCounterandQR(){
document.getElementById(id_counter).innerHTML = countdown;
if (countdown === 0) {
    closeWebSocket();
    countdown=interval;
    uuid = generateUUID();
    waurl=atob(keyword)+uuid;
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

