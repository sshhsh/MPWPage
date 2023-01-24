import { makeAutoObservable } from "mobx";
import { PassParams } from "./../../mpw";
import { Template } from "../../mpw";

export class Site implements PassParams {
  site: string;
  counter: number;
  template: Template;
  context?: string;
  NS?: string;
  constructor(param: PassParams) {
    this.site = param.site;
    this.counter = param.counter;
    this.template = param.template;
    this.context = param.context;
    this.NS = param.NS;
    makeAutoObservable(this);
  }

  toString(): string {
    return this.site + this.counter + this.template + this.context + this.NS;
  }

  setSite(site: string) {
    this.site = site;
  }

  setCounter(counter: number) {
    this.counter = counter;
  }

  setTemplate(template: Template) {
    this.template = template;
  }
}
