import { Todo } from "./todo";

export class User {
    constructor(
        public username: string,
        public password: string,
        public todos?: Todo[]
    ) {}

    




    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }
}
