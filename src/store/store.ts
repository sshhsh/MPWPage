import { PassParams, Template } from "./../mpw";
import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { User } from "./entity/user";
import { Site } from "./entity/site";
import { replacer, reviver } from "./serialization";

export enum LoginState {
  LoggedIn,
  NotLoggedIn,
  Loading,
}

export class Store {
  users: [string, User][] = [];
  currentUser?: string;
  currentSite: Site = new Site({
    site: "",
    counter: 1,
    template: Template.long,
  });
  isLogin: LoginState = LoginState.NotLoggedIn;
  constructor() {
    makeAutoObservable(this);
    makePersistable<this, keyof this>(this, {
      name: "SampleStore",
      properties: [
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
      ],
      storage: window.localStorage,
    });
  }
  startLogin() {
    this.isLogin = LoginState.Loading;
  }
  login(name: string) {
    runInAction(() => {
      if (!new Map(this.users).has(name)) {
        this.users.push([name, new User(name)]);
      }
      this.currentUser = name;
      this.isLogin = LoginState.LoggedIn;
    });
  }
  logout() {
    this.isLogin = LoginState.NotLoggedIn;
  }
  showSite(site: Site) {
    this.currentSite = site;
  }
}
