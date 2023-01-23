import { PassParams } from './../mpw';
import { makeAutoObservable, runInAction } from "mobx"
import { makePersistable } from "mobx-persist-store";
import { User } from "./entity/user"
import { Site } from './entity/site';
import { replacer, reviver } from './serialization';

export class Store {
    users: [string, User][] = [];
    currentUser?: string
    isLogin = false
    constructor() {
        makeAutoObservable(this);
        makePersistable<this, keyof this>(this, { name: 'SampleStore', properties: [
            "currentUser",
            {
                key: "users",
                serialize: (value) => {
                    return JSON.stringify(value, replacer);
                },
                deserialize: (value) => {
                    return JSON.parse(value, reviver);
                },
            },
        ], storage: window.localStorage });
    }
    login(name: string) {
        runInAction(()=>{
            if (!new Map(this.users).has(name)) {
                this.users.push([name, new User(name)]);
            }
            this.currentUser = name;
            this.isLogin = true;
        })
    }
    logout() {
        this.isLogin = false;
    }
}
