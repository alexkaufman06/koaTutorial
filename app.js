const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const app = new Koa();
const path = require('path')
const router = new KoaRouter();
const render = require('koa-ejs');

// app.use(json());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExtension: 'html',
  cache: false,
  debug: false
});

router.get('/', async ctx => {
  await ctx.render('index');
});

router.get('/test', ctx => (ctx.body = "Hello Test"));

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log('Server started at: http://localhost:3000/'));

// https://www.youtube.com/watch?v=z84uTk5zmak 19:24
// https://www.tutorialspoint.com/koajs/index.htm