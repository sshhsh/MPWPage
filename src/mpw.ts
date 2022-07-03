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
  counter: number;
  context?: string;
  template: Template;
  NS?: string;
}


export async function login(params: UserParams): Promise<void> {
  await go;
  wasmLogin(params.name, params.password);
}

export function generate(params: PassParams): string {
  return wasmGenerate(params.site, params.counter ?? 0, params.context ?? '', params.template ?? Template.long, params.NS ?? '');
}

export enum Template {
  maximum = 'maximum',
  long = 'long',
  medium = 'medium',
  basic = 'basic',
  short = 'short',
  pin = 'pin',
  name = 'name',
  phrase = 'phrase',
}