import { PassParams } from './../mpw';
import { makeAutoObservable, runInAction } from "mobx"
import { makePersistable } from "mobx-persist-store";
import { User } from "./entity/user"
import { Site } from './entity/site';

export class Store {
    users: Map<string, User> = new Map();
    currentUser?: string
    isLogin = false
    constructor() {
        makeAutoObservable(this);
        // makePersistable(this, { name: 'SampleStore', properties: ['users', 'currentUser'], storage: window.localStorage });
    }
    login(name: string) {
        runInAction(()=>{
            if (!this.users.has(name)) {
                this.users.set(name, new User(name));
            }
            this.currentUser = name;
            this.isLogin = true;
        })
    }
    logout() {
        this.isLogin = false;
    }
}