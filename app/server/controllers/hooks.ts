import { Controller, Route, Post } from 'xioo';
import child_process from 'child_process';

async function exec(commond?, params?, cwd = process.cwd()) {
  const ls = child_process.spawn(commond, params, {
    cwd: cwd
  })

  return new Promise((resolve, reject) => {
    ls.stdout.on('data', (data) => {
      console.log(`${data}`)
    })
    ls.stderr.on('data', (data) => {
      console.log(`${data}`)
    })
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(code);
    });
  })
}


@Route('/api/docs/hooks')
export default class Hooks extends Controller {
  @Post('/test')
  async getTest() {
    const { ctx } = this;
    console.log(ctx.headers);
    const authToken = ctx.headers['x-auth-token'];
    if (authToken !== '123456') {
      return {
        status: -1,
        message: '未构建'
      }
    }
    const funcs = [
      ['git', ['pull']],
      ['npm', ['install']],
      ['npm', ['run', 'server:build']],
      ['npm', ['run', 'view:build']],
      ['npm', ['run', 'stop']],
      ['npm', ['run', 'start']]
    ]
    function appBuild() {
      const func = funcs.shift();
      if (!func) {
        console.log('构建成功------------------->') 
        return;
      }
      exec(...func).then(res => {
        if(res !== 0) {
          console.log('异常终止----------->')
          return;
        }
        appBuild();
      })
    }
  
    appBuild();

    return {
      status: 0,
      message: '执行成功'
    }
  }
}