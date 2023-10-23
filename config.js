export let wauthparam={
    id_user:"user_name",
    id_pass:"user_pass",
    id_form:"loginform",
    id_button:"login",
    using_click : true,
    auth_ws : "d3NzOi8vYXV0aC51bGJpLmFjLmlkL3dzL3doYXRzYXV0aC9xcg==",
    keyword : 'aHR0cHM6Ly93YS5tZS82Mjg3NzUyMDAwMzAwP3RleHQ9d2g0dDVhdXRoMA==',
    interval : 30,
    maxqrwait : 90,
    tokencookiehourslifetime : 2,
    id_qr : "whatsauthqr",
    id_counter : "whatsauthcounter",
    tokencookiename : "login",
    apphost : btoa(document.location.protocol + '//' +document.location.host+document.location.pathname),
    rto :0,
    countdown:0,
    wsocket:0,
    mobile:false,
    urlgetparams:new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      }),
    jsonres:null,
    uuid:null,
    waurl:null
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    wauthparam.mobile = true;
  }else{
    wauthparam.mobile = false;
  }

wauthparam.urlgetparams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
