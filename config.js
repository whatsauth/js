import { IsMobile,getParamsfromURL } from "./whatsauth.js"

export const DefaultFailer = (_) => {
    alert("maaaf kakak, jangan lupa Swalnya dimasukkan ke html............")
}


export let wauthparam={
    redirect : "./auth",
    auth_ws : "d3NzOi8vYXV0aC51bGJpLmFjLmlkL3dzL3doYXRzYXV0aC9xcg==",
    keyword : "aHR0cHM6Ly93YS5tZS82MjgxMTIwMDAyNzk/dGV4dD13aDR0NWF1dGgw",
    domaincookie : window.location.host,
    interval : 30,
    maxqrwait : 90,
    tokencookiehourslifetime : 2,
    id_qr : "whatsauthqr",
    id_counter : "whatsauthcounter",
    tokencookiename : "login",
    apphost : btoa(document.location.href),
    rto :0,
    countdown:0,
    wsocket:0,
    mobile:IsMobile(),
    urlgetparams:getParamsfromURL(),
    jsonres:null,
    uuid:null,
    waurl:null
}

export let autoinjector = {
    auth_ws : "d3M6Ly8xMjcuMC4wLjE6Nzk3OS9hcGkvdjIvd3Mvc2lw",
    domaincookie : window.location.host,
    using_click: true,
    id_form_user : 'username',
    id_form_password : 'password',
    id_form : 'loginform',
    id_button : 'login',
    interval : 30,
    tokencookiehourslifetime : 2,
    tokencookiename : "login",
    apphost : btoa(document.location.href),
    mobile:IsMobile(),
    urlgetparams:getParamsfromURL(),
    failer: DefaultFailer,
}

export const SwalChecker = () => {
    if (typeof Swal == "undefined"){
        alert("maaaf kakak, jangan lupa Swalnya dimasukkan ke html............")
    }
}
