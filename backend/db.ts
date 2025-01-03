// deno-lint-ignore-file no-explicit-any
import { Pocketbase } from './imports.ts';
import { Maybe } from './types.ts';

class DataBase {

    pb: Pocketbase;
  
    constructor(db_url: string) { this.pb = new Pocketbase(db_url) };
  
    async auth_user(username: string, password: string) : Promise<Maybe<any>> {
      try {
        const result: Maybe<object> = {v:true, c: await this.pb.collection('users').authWithPassword(username, password)};
        return result;
      } catch (error: any) {
        const result: Maybe<Error> = {v:false, c: new Error(error)};
        return result;
      }
    };
  
    async sign_in_user(user_data: object) : Promise<Maybe<any>> {
      try {
        const result: Maybe<object> = {v:true, c: await this.pb.collection('users').create(user_data)};
        return result;
      } catch (error: any) {
        const result: Maybe<Error> = {v:false, c:new Error(error)};
        return result;
      }
    };
  
  };
  
  export { DataBase };