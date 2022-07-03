import init from './wasm/mpw.wasm?init'

const go = (async () => {
  const res = new Go();
  const ins = await init(res.importObject);
  res.run(ins);
})();

export interface UserParams {
  name: string;
  password: string;
}

export interface PassParams {
  site: string;
  counter?: number;
  context?: null | string;
  template?: string;
  NS?: string;
}


export async function login(params: UserParams): Promise<void> {
  await go;
  wasmLogin(params.name, params.password);
}

export async function generate(params: PassParams): Promise<string> {
  await go;
  return wasmGenerate(params.site, params.counter ?? 0, params.context ?? '', params.template ?? 'long', params.NS ?? '');
}

