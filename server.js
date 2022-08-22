const Koa = require('koa');
const Router = require('@koa/router');
const multer = require('@koa/multer');
var cors = require('koa-cors');

const app = new Koa();
app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
      // if (ctx.url === '/test') {
      //     return '*'; // 允许来自所有域名请求
      // }
      return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

const router = new Router();
const upload = multer({
  dest: 'uploads/'
}); // note you can pass `multer` options here

// add a route for uploading multiple files
router.post(
  '/upload',
  upload.fields([
    {
      name: 'avatar',
      maxCount: 5
    }
  ]),
  (ctx) => {
    console.log('ctx.request.files', ctx.request.files);
    console.log('ctx.files', ctx.files);
    console.log('ctx.request.body', ctx.request.body);
    console.log(ctx.request.files);
    let r = ctx.request.files.avatar.map((item) => ({
      url: item.path,
      name: item.originalname
    }));
    ctx.body = r;
  }
);

// add the router to our app
app.use(router.routes());
app.use(router.allowedMethods()); // 响应options方法，告诉它所支持的请求方法, 相应地返回405(不允许)和501(没实现)

// start the server
app.listen(3000);
