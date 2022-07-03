import { PassParams } from './../../mpw';
import { makeAutoObservable } from "mobx";
import { Site } from "./site";
import { makePersistable } from 'mobx-persist-store';

export class User {
    name: string
    sites: Map<string, Site> = new Map();

    constructor(name: string) {
        this.name = name;
        makeAutoObservable(this);
        // makePersistable(this, { name: 'UserStore', properties: ['name', 'sites'], storage: window.localStorage });
    }

    addSite(param: PassParams) {
        console.log('aaaa')
        const site = new Site(param);
        const key = site.toString();
        if (this.sites.has(key)) {
            return;
        }
        this.sites.set(key, site);
    }
}