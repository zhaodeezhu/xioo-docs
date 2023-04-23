import { XiooConfig, IServerConfig } from 'xioo';  
export = class Config implements IServerConfig {
  httpServer: XiooConfig.IHtppServer = {
    port: 2323
  }

  openResource = {
    openPath: 'package/public',
    options: {
      maxAge: 60 * 60 * 1000 * 2
    }
  }
}