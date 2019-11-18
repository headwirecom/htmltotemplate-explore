const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');

const from = 'bem';
const to = "htl";
const component = "download";

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
const out = $('body').html().trim().replace(/;APOS;/g, "'");

// output result
console.log(out);