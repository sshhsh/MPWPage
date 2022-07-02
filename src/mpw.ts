export interface UserParams {
  name: string;
  password: string;
  version?: number;
}

export interface PassParams {
  site: string;
  counter?: number;
  context?: null | string;
  template?: string;
  NS?: string;
}

const worker = new Worker(new URL("./mpw/worker.js", import.meta.url), { type: 'module' });
const callbackMap: Map<number, (res: string) => void> = new Map();
worker.onmessage = (ev) => {
  const { id, res } = ev.data;
  callbackMap.get(id)?.(res);
  callbackMap.delete(id);
};

let id = 0;
function genID(): number {
  if (id >= Number.MAX_SAFE_INTEGER) {
    id = 0;
  }
  return id++;
}
async function postMessage(params: UserParams | PassParams): Promise<string> {
  const id = genID();
  return new Promise((resolve) => {
    callbackMap.set(id, (res) => {
      resolve(res);
    })
    worker.postMessage({id, ...params});
  });
}

export async function login(params: UserParams): Promise<void> {
  await postMessage(params);
}

export async function generate(params: PassParams): Promise<string> {
  return await postMessage(params);
}
