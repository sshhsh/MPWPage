import './pbkdf2.js';
import './scrypt.js';
import './mpw.js';

let mpw;

onmessage = async function (e) {
  console.log("Worker: Message received from main script", e);
  const {
    id,
    name,
    password,
    version,
    site,
    counter,
    context,
    template,
    NS,
  } = e.data;
  if (name !== undefined && password !== undefined) {
    mpw = new self.MPW(name, password, version);
  }
  let res = '';
  if (mpw === undefined) {
    console.log('no mpw');
    this.postMessage({ id, res });
    return;
  }
  if (site !== undefined) {
    const res = await mpw.generate(site, counter, context, template, NS);
    console.log(res);
    this.postMessage({ id, res });
    return;
  }
  this.postMessage({ id, res });
};
