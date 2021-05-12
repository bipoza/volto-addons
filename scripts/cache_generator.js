const { getAwesomeVoltoToJSON } = require('./addons_md_scrapper');
// const { getAddonsMoreInfo } = require('./get_addons_more_info');
const { getTimestamp } = require('./utils');


const generateCache = () => {
    return new Promise((resolve, reject) => {
        getAwesomeVoltoToJSON().then(json => {
            var fs = require('fs');
            fs.writeFile("../cache/cache.json", JSON.stringify({ last_update: getTimestamp(), data: json }, null, 4), (err) => {
                if (err) { console.error(err); reject(); return; };
                console.log("File has been created");
                resolve()
            });
        });
    });
}


exports.generateCache = generateCache;