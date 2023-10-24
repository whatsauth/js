# WhatsAuth ES6+ Vanilla
ES6 JS Module, how to use
```js
import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.0.9/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.0.9/config.js";


deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);
```


## Release
```sh
git tag v0.0.1
git push origin --tags
```