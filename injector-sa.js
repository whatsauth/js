function IsMobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getParamsfromURL(){
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}

const SwalChecker = () => {
    if (typeof Swal == "undefined"){
        alert("maaaf kakak, jangan lupa Swalnya dimasukkan ke html............")
    }
}


const DefaultFailer = (_) => {
    alert("maaaf kakak, jangan lupa Swalnya dimasukkan ke html............")
}


/**
 *
 * @param {Object} wauthparam - The configuration object for the WebSocket connection and form manipulation.
 * @param {String} wauthparam.auth_ws - The WebSocket connection string, base64 encoded.
 * @param {String} wauthparam.domaincookie - The domain for the cookie.
 * @param {Boolean} wauthparam.using_click - Determines whether to click the button or submit the form.
 * @param {String} wauthparam.id_form_user - The id of the username input field in the form.
 * @param {String} wauthparam.id_form_password - The id of the password input field in the form.
 * @param {String} wauthparam.id_form - The id of the form to be submitted.
 * @param {String} wauthparam.id_button - The id of the button to be clicked.
 * @param {Number} wauthparam.interval - The interval for the WebSocket connection.
 * @param {Number} wauthparam.tokencookiehourslifetime - The lifetime of the cookie in hours.
 * @param {String} wauthparam.tokencookiename - The name of the cookie.
 * @param {String} wauthparam.apphost - The host of the application, base64 encoded.
 * @param {Boolean} wauthparam.mobile - Determines whether the user is on a mobile device.
 * @param {Object} wauthparam.urlgetparams - The parameters from the URL.
 * @param {String}  result - json response from server
 * @param {Function} wauthparam.failer - function to be called when failed
 */
const catcher = (wauthparam, result) => {
    const jsonres = JSON.parse(result);

    if (jsonres.user_name == null && jsonres.user_pass == null) {
        wauthparam.failer();
    }

    setCookieWithExpireHourSubDomain(wauthparam.tokencookiename, jsonres.login, wauthparam.domaincookie, wauthparam.tokencookiehourslifetime);
    fillformLogin(jsonres, wauthparam.id_form_user, wauthparam.id_form_password);
    submitLogin(wauthparam.using_click, wauthparam.id_button, wauthparam.id_form);
}

/**
 * @param {Boolean} using_click - Determines whether to click the button or submit the form.
 * @param {String} id_button - The id of the button to be clicked.
 * @param {String} id_form - The id of the form to be submitted.
 */
const submitLogin = (using_click, id_button, id_form) => {
    if (using_click) {
        document.getElementById(id_button).click();
    } else {
        document.getElementById(id_form).submit();
    }
}

/**
 * @param {Object} resjson - The response object from the server.
 * @param {String} id_user - The id of the username input field in the form.
 * @param {String} id_pass - The id of the password input field in the form.
 */
const fillformLogin = (resjson, id_user, id_pass) => {
    document.getElementById(id_user).value = resjson.user_name;
    document.getElementById(id_pass).value = resjson.user_pass;
}

/**
 * @param {Object} wauthparam - The configuration object for the WebSocket connection and form manipulation.
 * @param {String} wauthparam.auth_ws - The WebSocket connection string, base64 encoded.
 * @param {String} wauthparam.domaincookie - The domain for the cookie.
 * @param {Boolean} wauthparam.using_click - Determines whether to click the button or submit the form.
 * @param {String} wauthparam.id_form_user - The id of the username input field in the form.
 * @param {String} wauthparam.id_form_password - The id of the password input field in the form.
 * @param {String} wauthparam.id_form - The id of the form to be submitted.
 * @param {String} wauthparam.id_button - The id of the button to be clicked.
 * @param {Number} wauthparam.interval - The interval for the WebSocket connection.
 * @param {Number} wauthparam.tokencookiehourslifetime - The lifetime of the cookie in hours.
 * @param {String} wauthparam.tokencookiename - The name of the cookie.
 * @param {String} wauthparam.apphost - The host of the application, base64 encoded.
 * @param {Boolean} wauthparam.mobile - Determines whether the user is on a mobile device.
 * @param {Object} wauthparam.urlgetparams - The parameters from the URL.
 * @param {String} id - The unique identifier for the WebSocket connection.
 */
const connectWS = (wauthparam, id) => {
    return new Promise((resolve, reject) => {
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
        wsconn.onclose = (_) => {
            console.log("connection closed");
        };
        wsconn.onmessage = (evt) => {
            let messages = evt.data;
            console.log("incoming message");
            catcher(wauthparam, messages);
        };

    });
}

/**
 * @param {Object} wauthparam - The configuration object for the WebSocket connection and form manipulation.
 * @param {String} wauthparam.auth_ws - The WebSocket connection string, base64 encoded.
 * @param {String} wauthparam.domaincookie - The domain for the cookie.
 * @param {Boolean} wauthparam.using_click - Determines whether to click the button or submit the form.
 * @param {String} wauthparam.id_form_user - The id of the username input field in the form.
 * @param {String} wauthparam.id_form_password - The id of the password input field in the form.
 * @param {String} wauthparam.id_form - The id of the form to be submitted.
 * @param {String} wauthparam.id_button - The id of the button to be clicked.
 * @param {Number} wauthparam.interval - The interval for the WebSocket connection.
 * @param {Number} wauthparam.tokencookiehourslifetime - The lifetime of the cookie in hours.
 * @param {String} wauthparam.tokencookiename - The name of the cookie.
 * @param {String} wauthparam.apphost - The host of the application, base64 encoded.
 * @param {Boolean} wauthparam.mobile - Determines whether the user is on a mobile device.
 * @param {Object} wauthparam.urlgetparams - The parameters from the URL.
 * @param {String} id - The unique identifier for the WebSocket connection.
 */
const openWebSocketSetId = (wauthparam, id) => {
    if (window["WebSocket"]) { //check browser support
        connectWS(wauthparam, id).then((server) => {
            wauthparam.wsocket = server;
        }).catch((err) => {
            console.log("socket error id : " + id + "with err" + err);
        });
    } else {
        alert("Please Update Your browser to the latest version.");
    }
}

/**
 * @param {Object} wauthparam - The configuration object for the WebSocket connection and form manipulation.
 * @param {String} wauthparam.auth_ws - The WebSocket connection string, base64 encoded.
 * @param {String} wauthparam.domaincookie - The domain for the cookie.
 * @param {Boolean} wauthparam.using_click - Determines whether to click the button or submit the form.
 * @param {String} wauthparam.id_form_user - The id of the username input field in the form.
 * @param {String} wauthparam.id_form_password - The id of the password input field in the form.
 * @param {String} wauthparam.id_form - The id of the form to be submitted.
 * @param {String} wauthparam.id_button - The id of the button to be clicked.
 * @param {Number} wauthparam.interval - The interval for the WebSocket connection.
 * @param {Number} wauthparam.tokencookiehourslifetime - The lifetime of the cookie in hours.
 * @param {String} wauthparam.tokencookiename - The name of the cookie.
 * @param {String} wauthparam.apphost - The host of the application, base64 encoded.
 * @param {Boolean} wauthparam.mobile - Determines whether the user is on a mobile device.
 * @param {Object} wauthparam.urlgetparams - The parameters from the URL.
 * @return string
 */
const generateUUID = async (wauthparam) => {
    let wuid = "";

    const tokenCookie = await getCookie(wauthparam.tokencookiename);

    if (tokenCookie !== "" && tokenCookie !== "undefined") {
        wuid = tokenCookie;
        return wuid;
    }

    if (wauthparam.mobile) {
        wuid = wauthparam.urlgetparams.uuid;
    }

    return wuid;
}


let autoinjector = {
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


/**
 * @param {Object} config - The configuration object for the WebSocket connection and form manipulation.
 * @param {String} config.auth_ws - The WebSocket connection string, base64 encoded.
 * @param {String} config.domaincookie - The domain for the cookie.
 * @param {Boolean} config.using_click - Determines whether to click the button or submit the form.
 * @param {String} config.id_form_user - The id of the username input field in the form.
 * @param {String} config.id_form_password - The id of the password input field in the form.
 * @param {String} config.id_form - The id of the form to be submitted.
 * @param {String} config.id_button - The id of the button to be clicked.
 * @param {Number} config.interval - The interval for the WebSocket connection.
 * @param {Number} config.tokencookiehourslifetime - The lifetime of the cookie in hours.
 * @param {String} config.tokencookiename - The name of the cookie.
 * @param {String} config.apphost - The host of the application, base64 encoded.
 * @param {Boolean} config.mobile - Determines whether the user is on a mobile device.
 * @param {Object} config.urlgetparams - The parameters from the URL.
 */
export const Entrypoint = async (config) => {
    const uid = await generateUUID(config);
    if (uid === "") {
        return
    }

    openWebSocketSetId(config, uid);
}

Entrypoint(autoinjector);