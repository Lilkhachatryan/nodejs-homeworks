const fs = require('fs');

const config = (path) => {
    try {
        data = fs.readFileSync(path).toString();
        let regex = /(\w+)=((\d+)|.+)/g;

        data.replace(regex, function(str, field, value, s) {
            process.env[field] = s ? Number(s) : value;
        });
    } catch (e) {
        throw e;
    }
};

module.exports = {
    config
};
