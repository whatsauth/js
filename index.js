import {qrController,deleteCookie} from "./croot";



// /*config in html login page*/
const id_user = 'user_name';
const id_pass = 'user_pass';
const id_form = 'loginform';
const id_button = 'login';
const using_click = true;
// /*end of config in html login page*/

const auth_ws = 'd3NzOi8vYXV0aC51bGJpLmFjLmlkL3dzL3doYXRzYXV0aC9xcg==';
const keyword = 'aHR0cHM6Ly93YS5tZS82Mjg3NzUyMDAwMzAwP3RleHQ9d2g0dDVhdXRoMA==';

const interval = 30;
const maxqrwait = 90;
const tokencookiename = "login";
const tokencookiehourslifetime = 2;
const id_qr = "whatsauthqr";
const id_counter = "whatsauthcounter";

const apphost = btoa(document.location.protocol + '//' +document.location.host+document.location.pathname);
let jsonres;
let rto =0;
let countdown=0;
let uuid;
let wsocket=0;
let mobile;
let waurl;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    mobile = true;
  }else{
    mobile = false;
  }

const urlgetparams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

deleteCookie(tokencookiename);
qrController();