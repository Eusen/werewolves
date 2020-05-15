import * as Http2 from 'http';
import * as Koa from 'koa';
import * as SocketIO from 'socket.io';

export const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const http = Http2.createServer(app.callback());

const io = SocketIO(http);

http.listen(3000, '0.0.0.0', () => {
  console.log('Server start on http://localhost:3000');
});

io.on("connection", (socket) => {
  console.log(`${socket.id} - ${socket.client.id} - ${socket.conn.id} connected`);
  socket.on('chat', (msg) => {
    console.log('msg', msg);
  });
});
