const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const { Compiler } = require('@adobe/htlengine');

const from = 'bem';
const to = "htl";
const component = "download";

async function transpile(from, to, component) {

    console.log(`transpile from ${from} html template to ${to} for component ${component}`);

    const componentPath = path.join('.', 'fragments', component);

    console.log(`using files from ${componentPath}`);

    const source = fs.readFileSync(path.join(componentPath, `${from}-template.html`)).toString();
    const $ = cheerio.load(source);

    const transpiler = require('./'+componentPath+'/'+'transpile.js');
    const dsl = require('./dsl/'+to+'.js');
    const locators = require('./'+componentPath+'/'+from+'-locators.js');

    transpiler(dsl, $, locators);

    // string escape hack 
    const out = $('body').html().trim().replace(/;APOS;/g, "'").replace(/;QUOT;/g, '"');

    // output result
    return out;

}

async function compileHTL(code, model) {
    const compiler = new Compiler()
    .withOutputDirectory('')
    .includeRuntime(true)
    .withRuntimeVar(Object.keys(model));

    const js = await compiler.compileToString(code);

    return await eval(js)(model);
}


(async () => {
    const componentPath = path.join('.', 'fragments', component);
    const files = fs.readdirSync(componentPath);
    for(let i = 0; i < files.length; i++) {
        const file = files[i];
        if(file.startsWith('sample') && file.endsWith('.json')) {
            const model = fs.readJSONSync(path.join(componentPath, file));
            const htl = await transpile(from, to, component);
            const html = await compileHTL(htl, model);
            console.log(html);
        }
    }
})();