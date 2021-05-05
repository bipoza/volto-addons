const axios = require('axios');
const GITHUB_API = "https://api.github.com/repos";


const getAddonsMoreInfo = (addons_cache) => {
    return new Promise((resolve, reject) => {
        addons_cache.forEach(addons_category => {
            addons_category.data.forEach(addon => {
                let domain = (new URL(addon.url));
                let repo_domain = domain.protocol + '//' + domain.hostname + (domain.port ? ':' + domain.port : '')
                let repo_full_name = addon.url.replace(repo_domain, '');
                console.log("repo_full_name: ", repo_full_name)
                axios.get(GITHUB_API + repo_full_name, { Accept: 'application/vnd.github.v3+json' }).then(async res => {
                    addon['stars'] = res.stargazers_count;
                    // console.log("API RESULT: ", res)
                    // resolve(await scrapeMarkdownToJson(res.data))
                }).catch(err => {
                    console.log("ERROR: ", err)
                   
                });
            })
            console.log(addons_category)
            //    let repo_full_name =  addon.url.substring(this.href.lastIndexOf('/') + 2)

            // axios.get(GITHUB_API+repo_full_name).then(async res => {
            //     // resolve(await scrapeMarkdownToJson(res.data))
            // }).catch(err => {
            //     reject(err.message);
            // });
        })
        // console.log("ADDONS STARS: ", addons_cache)
    });
}

exports.getAddonsMoreInfo = getAddonsMoreInfo;