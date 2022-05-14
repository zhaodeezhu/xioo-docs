import { Middleware, MiddleClass, Middle } from 'xioo';

@MiddleClass()
export default class Server extends Middleware {
  @Middle('front')
  async acompress() {
    const { ctx, next } = this;
    console.log('我是中间件我执行了------->')
    await next();
  }
}