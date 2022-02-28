import * as childProcess from 'child_process';
import App, { Helper } from 'xioo';

// 先去生成声明文件，在去构建
Helper.makeType('service', 'service');

childProcess.fork('./app/server/index', {
  env: {
    ...process.env,
    RUN_ENV: process.env.RUN_ENV ? process.env.RUN_ENV : 'dev' // 传了env以后控制台输出颜色就失效了，应该是process.env中有东西控制打印的颜色
  }
});