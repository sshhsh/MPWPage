import { PassParams } from './../../mpw';
import { makeAutoObservable } from "mobx";
import { Site } from "./site";
import { makePersistable } from 'mobx-persist-store';

export class User {
    name: string
    sites: [string, Site][];

    constructor(name: string, sites: [string, Site][] = []) {
        this.name = name;
        this.sites = sites;
        makeAutoObservable(this);
        // makePersistable(this, { name: 'UserStore', properties: ['name', 'sites'], storage: window.localStorage });
    }

    addSite(param: PassParams) {
        console.log('aaaa')
        const site = new Site(param);
        const key = site.toString();
        if (new Map(this.sites).has(key)) {
            return;
        }
        this.sites.push([key, site]);
    }
}