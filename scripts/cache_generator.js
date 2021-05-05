const {getAwesomeVoltoToJSON} = require('./addons_md_scrapper');

function generateCache() {
    console.log(getAwesomeVoltoToJSON)
    getAwesomeVoltoToJSON().then(json => {
        var fs = require('fs');
        fs.writeFile("./cache.json", JSON.stringify(json, null, 4), (err) => {
            if (err) {  console.error(err);  return; };
            console.log("File has been created");
        });
    })
}


generateCache();