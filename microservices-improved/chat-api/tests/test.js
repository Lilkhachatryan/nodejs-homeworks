const path = require('path');
const Mocha = require('mocha');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const rootTest = new Mocha();

// npm test ping/ping_test.js
// npm test ping

const myArgs = process.argv.slice(2);

(async () => {
    if(!myArgs[0]) return 'no provided folder';

    if (myArgs[0].includes('.js')) {
        rootTest.addFile(
            path.join(__dirname, myArgs[0])
        );
    } else {
        const directoryPath = path.join(__dirname, myArgs[0]);

        try {
            const names = await readdir(directoryPath);
            names.forEach(function (file) {
                console.log('names',path.join(directoryPath, file));

                rootTest.addFile(path.join(directoryPath, file));
            });
        } catch (e) {
            return console.log('no such directory: ' + e);
        }
    }

    rootTest.run((failed_count) => {
        if (failed_count !== 0) {
            return console.log(':(');
        }

        console.log('Done :)');
    });
})();
