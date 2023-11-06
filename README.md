# WhatsAuth ES6+ VanillaJS

Dibangun menggunakan Vanilla JS ES6+. Panduan VanillaJS ES6+ ada [disini](https://vanillajskit.github.io/)  

## Langkah implementasi
Untuk implementasi Single Sign On berbasis QRCode langkahnya adalah:  
1. Buat file bernama index.js yang isinya:
Pilih dahulu js rilis terbaru [di sini](https://cdn.jsdelivr.net/gh/whatsauth/js/)

```js
//import js whatsauth yang terbaru
import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.7/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.7/config.js";

//definisikan url wss dan keyword menggunakan base64
wauthparam.auth_ws="d3NzOi8vYXBpLndhLm15LmlkL3dzL3doYXRzYXV0aC9wdWJsaWM=";
wauthparam.keyword="aHR0cHM6Ly93YS5tZS82MjgzMTMxODk1MDAwP3RleHQ9d2g0dDVhdXRoMA==";

//delete cookies session and call whatsauth qrController
deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);
```

2. Buat file HTML yang isinya: 

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

<script src="index.js" type="module"></script>
</body>
</html>
```
untuk file css contoh bisa diambil di [sini](./style.css)

3. Silahkan lakukan kustomasi HTML, CSS sendiri

## Release

```sh
git tag v0.0.1
git push origin --tags
```
