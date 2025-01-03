// deno-lint-ignore-file no-explicit-any
import { DataBase, Maybe, User } from './types.ts';
import { uidv4 } from './imports.ts';

const logged_users: { [id: string] : User } = {};

function set_up_sockets(sio_server: any, db: DataBase) {

    sio_server.on('connection', (socket: any) => {

        const socket_ID: string = generate_random_uid();

        socket.on('login_request', async (username:string, password:string) => {

            const auth_request_maybe: Maybe<any> = await db.auth_user(username, password);
            if(!auth_request_maybe.v) { socket.emit('login_failed'); return; };
      
            const auth_data = auth_request_maybe.c['record'];
            const user: User = {
              username: auth_data['username'],
              socket: socket,
            };
      
            logged_users[socket_ID] = user;
            socket.emit('login_sucess', auth_data);
      
          });
      
          socket.on('signin_request', async (username:string, password:string) => {
      
            const db_request_data = {
              'password': password,
              'passwordConfirm': password,
              'username': username,
              'email': '',
              'emailVisibility': false,
              'verified': false,
            };
      
            const signin_request_maybe: Maybe<any> = await db.sign_in_user(db_request_data);
            if(!signin_request_maybe.v) { socket.emit('signin_failed'); return; };
      
            socket.emit('signin_sucess', signin_request_maybe.c);
      
          });

    });

};

function generate_random_uid() {
    return `SOCKET_${uidv4()}-${Math.random()*Math.pow(10,18)}`;
};

export { set_up_sockets };