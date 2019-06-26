const Koa = require('koa');
const KoaRouter = require('koa-router');
// const json = require('koa-json');
const app = new Koa();
const path = require('path')
const router = new KoaRouter();
const render = require('koa-ejs');
const things = ['My family', 'Programming', 'Music']  // This would be replace with a real DB

// app.use(json());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExtension: 'html',
  cache: false,
  debug: false
});

router.get('/', async ctx => {
  await ctx.render('index', {
    title: 'Things/Stuffs I Love:',
    things: things
  });
});

router.get('/test', ctx => (ctx.body = "Hello Test"));

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log('Server started at: http://localhost:3000/'));

// https://www.youtube.com/watch?v=z84uTk5zmak 25:49
// https://www.tutorialspoint.com/koajs/index.htm