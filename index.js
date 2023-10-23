import {qrController,deleteCookie} from "./whatsauth.js";
import { wauthparam } from "./config.js";


deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);