const Koa = require('koa');
const KoaRouter = require('koa-router');
// const json = require('koa-json');
const app = new Koa();
const path = require('path')
const router = new KoaRouter();
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const things = ['My family', 'Programming', 'Music']  // This would be replace with a real DB

// app.use(json()); // Renders JSON with formatting
app.use(bodyParser());

app.context.user = "Brad";

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExtension: 'html',
  cache: false,
  debug: false
});

router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

async function index(ctx) {
  await ctx.render('index', {
    title: 'Things/Stuffs I Love:',
    things: things
  });
}

async function showAdd(ctx) {
  await ctx.render('add');
}

async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}`));
router.get('/test2/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`));

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log('Server started at: http://localhost:3000/'));

// https://www.youtube.com/watch?v=z84uTk5zmak 25:49
// https://www.tutorialspoint.com/koajs/index.htm