import {qrController,deleteCookie, getParamsfromURL} from "./whatsauth.js";
import { wauthparam } from "./config.js";

const main = async () => {
    const uuidParam = await getParamsfromURL().uuid
    if ( uuidParam !== "") {
        if (uuidParam.slice(0, 2) !== "v4") {
            qrController(wauthparam);
            return;
        }
        setCookieWithExpireHour(wauthparam.tokencookiename, uuidParam, wauthparam.tokencookiehourslifetime);

        return;
    }

    
    deleteCookie(wauthparam.tokencookiename);
    qrController(wauthparam);
}


main();
