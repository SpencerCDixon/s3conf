const fs    = require('fs');
const path  = require('path');
const rl    = require('readline-sync');
const chalk = require('chalk');

// Utility Functions
const prompt = s => chalk.cyan(s);
const success = s => chalk.green(s);
const info = s => chalk.white(s);

// Configuration
const CONFIG_PATH = path.resolve(process.env.HOME, '.s3cfg');
const accessKey = rl.question(prompt('access_key: '));
const secretKey = rl.question(prompt('secret_key: '));

// Reset the access keys
let content = fs.readFileSync(CONFIG_PATH, 'utf8').toString().split('\n');
const accessIndex = content.findIndex(str => /access_key/.test(str));
const secretIndex = content.findIndex(str => /secret_key/.test(str));
content[accessIndex] = `access_key = ${accessKey}`;
content[secretIndex] = `secret_key = ${secretKey}`;

// Write new file
console.log(info('Writing your new secrets into the config file located at:'), CONFIG_PATH);
fs.writeFileSync(CONFIG_PATH, content.join('\n'), 'utf8');
console.log(success('Successfully updated access keys.'));
