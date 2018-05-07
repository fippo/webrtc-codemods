/*
 * extract script content from a series of html files, run a
 * jscodeshift codemod on them and overwrite the original file.
 */
const fs = require('fs');
const {execFileSync} = require('child_process');
const match = /(<script?>)([\s\S]*?)(<\/script>)/gi;

const codemod = process.argv[2]; // 'wpt-async-test'; // wpt-pass-test';
const filenames = process.argv.slice(3);
filenames.forEach((filename) => {
    const originalContent = fs.readFileSync(filename, 'utf-8');
    const script = match.exec(originalContent);
    if (!script) return;
    const scriptFilename = filename + '.codemod.js';
    const scriptFile = fs.writeFileSync(scriptFilename, script[2]);
    // exec jscodeshift
    const output = execFileSync('./node_modules/.bin/jscodeshift', ['-t', codemod, scriptFilename]);
    console.log(filename, output.toString()); // output jscodeshift output.
    // read back file, resubstitute
    const newScript = fs.readFileSync(scriptFilename, 'utf-8').toString();

    // const modifiedContent = originalContent.replace(script[0], script[1] + newScript + script[script.length - 1]);
    const modifiedContent = originalContent.split(script[0]).join(script[1] + newScript + script[script.length - 1]);
    fs.writeFileSync(filename, modifiedContent);
    fs.unlinkSync(scriptFilename);
});
