import { makeAutoObservable } from 'mobx';
import { PassParams } from './../../mpw';
import { Template } from "../../mpw"
import { makePersistable } from 'mobx-persist-store';

export class Site implements PassParams {
    site: string
    counter: number
    template: Template
    context?: string
    NS?: string
    constructor(param: PassParams) {
        this.site = param.site;
        this.counter = param.counter;
        this.template = param.template;
        this.context = param.context;
        this.NS = param.NS;
        makeAutoObservable(this);
        // makePersistable(this, { name: 'SiteStore', properties: ['site', 'counter', 'template', 'context', 'NS'], storage: window.localStorage });
    }

    toString(): string {
        return this.site + this.counter + this.template + this.context + this.NS;
    }
}