# WhatsAuth ES6+ Vanilla
ES6 JS Module, how to use. Create index.js file:
```js
import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.0.9/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.0.9/config.js";


deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);
```
in your html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsAuth Demo Application</title>
    <link href="style.css" rel="stylesheet">
</head>
<body>

    

    <div id="hasphonenumber" class="w-full h-screen bg-blue-100 flex items-center justify-center">
        <div class="w-96 bg-white rounded-xl">
            <p class="font-bold text-center mb-4" id="useracclog">useragent</p>
            <div class="flex justify-center mt-2 mb-4" id="whatsauthqr">
                <div></div>
            </div>
            <p class="font-bold text-center mb-4" id="whatsauthcounter">counter</p>
            <p class="font-bold text-center mb-4" id="logs">log</p>
        </div>
    </div>

    <form id="loginform" onsubmit="event.preventDefault();">
        <input type="hidden" name="user_name" id="user_name" value="">
        <input type="hidden" name="user_pass" id="user_pass" value="">
        <input type="hidden" name="remember_me" value="y">
        <button id="login" name="login" value="Login" class="button">Login</button>
    </form>


    <script>
        document.getElementById("useracclog").innerHTML = navigator.userAgent;
    </script>
<script src="index.js" type="module"></script>
</body>
</html>
```


## Release
```sh
git tag v0.0.1
git push origin --tags
```