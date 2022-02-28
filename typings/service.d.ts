
      import 'xioo';
      
          import WxInfo from '../app/server/service/auth/info';
        
          import WxAuth from '../app/server/service/auth/user';
        
          import Helper from '../app/server/service/common/Helper';
        
          import Query from '../app/server/service/common/Query';
        
          import Upload from '../app/server/service/common/Upload';
        
          import Catalog from '../app/pages/Catalog/service/Catalog';
        
          import DaokeShare from '../app/pages/DaokeShare/service/DaokeShare';
        
          import LoginService from '../app/pages/Login/service/LoginService';
        
          import Workbench from '../app/pages/Workbench/service/Workbench';
        
      declare module 'xioo' {
        
        export interface IService {
          
        WxInfo: WxInfo
      
        WxAuth: WxAuth
      
        Helper: Helper
      
        Query: Query
      
        Upload: Upload
      
        Catalog: Catalog
      
        DaokeShare: DaokeShare
      
        LoginService: LoginService
      
        Workbench: Workbench
      
        }
      }
    