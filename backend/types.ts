// deno-lint-ignore-file no-explicit-any
import { DataBase } from './db.ts';

type User = {
  username: string,
  socket: any,
};

type Maybe<T> = {

  v: boolean,
  c: T

};

export { DataBase };
export type { Maybe, User };
