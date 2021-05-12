const {getAwesomeVoltoToJSON} = require('./addons_md_scrapper');
const {getAddonsMoreInfo} = require('./get_addons_more_info');
const {getTimestamp} = require('./utils');
function generateCache() {
    getAwesomeVoltoToJSON().then(json => {
        // getAddonsMoreInfo(json).then(res=>{
// console.log("RES: ", res)
        // })
        var fs = require('fs');
        fs.writeFile("./cache.json", JSON.stringify({last_update:getTimestamp(), data:json}, null, 4), (err) => {
            if (err) {  console.error(err);  return; };
            console.log("File has been created");
        });
    // })
});
}


generateCache();