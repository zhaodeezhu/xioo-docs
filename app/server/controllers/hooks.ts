import { Controller, Route, Post } from 'xioo';
import child_process from 'child_process';

async function exec(commond?, params?, cwd = process.cwd()) {
  console.log(process.cwd())

  let ls = null;
  try {
    ls = child_process.spawn(commond, params, {
      cwd: cwd
    })
  } catch(e) {
    console.log(e);
    return -1;
  }

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
    ls.on('error', (error) => {
      console.log(error);
    })
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
      ['npm', ['i']],
      ['npm', ['run', 'server:build']],
      ['npm', ['run', 'view:build']],
      ['npm', ['run', 'restart']]
    ]
    function appBuild() {
      const func = funcs.shift();
      if (!func) {
        console.log('构建成功------------------>') 
        return;
      }
      exec(...func).then(res => {
        if(res !== 0) {
          console.log('异常终止---------------->')
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