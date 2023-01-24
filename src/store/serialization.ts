import { User } from './entity/user';
import { Site } from './entity/site';
import { isObservableMap } from 'mobx';

export function store(obj: any): any {
    JSON.parse(JSON.stringify(obj, replacer));
}

export function restore(obj: any): any {
    JSON.parse(JSON.stringify(obj), reviver);
}

export function replacer(key: string, value: any): any {
    if (value instanceof User) {
        return {
            dataType: "$$user",
            value: Object.fromEntries(Object.entries(value)),
        };
    } else if (value instanceof Site) {
        return {
            dataType: "$$site",
            value: Object.fromEntries(Object.entries(value)),
        };
    } else if (isObservableMap(value)) {
        return {
            dataType: "$$map",
            value: Array.from(value.entries()),
        };
    } else {
        return value;
    }
}

export function reviver(key: string, value: any): any {
    if(typeof value !== 'object' && value === null) {
        return value;
    } else if (value.dataType === '$$user') {
        return new User(value.value.name, value.value.sites);
    } else if (value.dataType === '$$site') {
        return new Site(value.value);
    } else if (value.dataType === '$$map') {
        return new Map(value.value);
    } else {
        return value;
    }
}
