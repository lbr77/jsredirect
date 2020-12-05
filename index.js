'use strict';
//--------config here-----------
var config = {
  "siteName": "JS Redirect",
  "version": "0.0.0",
  "KVname": "test"
}
//------------------------------
// function mainHTML() {
//   const html = `  `
// }
var mainhtml=`
<!DOCTYPE html><html lang="zh-Hans"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><link rel="shortcut icon" type="image/x-icon" href="./2_files/20200503095152.png"><style>        html, body {            width: 100%;            margin: 0;        }            html {            height: 100%;        }            body {            min-height: 100%;            padding: 20px;            box-sizing: border-box;        }            p {            word-break: break-all;        }            @media (max-width: 500px) {            h1 {                margin-top: 80px;            }        }            .flex {            display: flex;            flex-direction: column;            justify-content: center;            align-items: center;        }</style><title>${config.siteName}</title></head><body class="flex"><h1 style="margin-bottom: 50px"><img src="https://cdn.jsdelivr.net/gh/lbr77/pictures@master/img/20201205134232.png" style="width: 1.5em;margin-right: .2em;vertical-align: bottom;">JS redirect</h1><div class="example"></div></form><p style="position: sticky;top: calc(100% - 2.5em);">项目基于Cloudflare Workers，开源于GitHub<a style="color: #3294ea" href="">lbr77</a></p></body></html>
`
// function getkey(key) {
//   res = config.KVname.get(key);
//   if(res === ""){
//     return false;
//   }
//   return true;
// }
function makeRes(body,status=200,headers={}){
  headers['access-control-allow-origin'] = '*';
  // headers['content-type'] = 'text/html';
  return new Response(body,{status,headers});
}
async function handleRequest(request) {
  let method = request.method;
  let url = new URL(request.url);
  if(url.pathname==='/'){
    return makeRes(mainhtml,200,{
      'content-type':'text/html'
    });
  }
  let key = url.pathname.substr(1);
  res = config.KVname.get(key);
  if(res === ""){
    return makeRes('404 not found',404);
  }
  return makeRes(makehtml())
}

addEventListener("fetch", async event => {
  event.respondWith(handleRequest(event.request))
})