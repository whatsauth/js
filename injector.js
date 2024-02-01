const getCookie = (cname) => {
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

/**
 * Sets a cookie with a specified expiration time and domain.
 *
 * @param {String} cname - The name of the cookie.
 * @param {String} cvalue - The value of the cookie.
 * @param {String} domain - The domain where the cookie is valid.
 * @param {Number} exhour - The number of hours until the cookie expires.
 */
export const setCookieWithExpireHourSubDomain = (cname, cvalue, domain, exhour) => {
    const d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    const expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain="+ domain +";path=/";
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