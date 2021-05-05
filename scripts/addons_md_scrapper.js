const axios = require('axios');
const MarkdownIt = require('markdown-it');

const AWESOME_VOLTO_MD_ENDPOINT = "https://raw.githubusercontent.com/collective/awesome-volto/master/README.md";


const TAKE_README_PIECE = {
    from: 'Addons',
    to: 'Plone addons for Volto'
};

const getAwesomeVoltoToJSON = () => { 
    return new Promise((resolve, reject) => {
        axios.get(AWESOME_VOLTO_MD_ENDPOINT).then(async res => {
            resolve(await scrapeMarkdownToJson(res.data))
        }).catch(err => {
            reject(err.message);
        });
    });
}

function scrapeMarkdownToJson(readme_data) {
    return new Promise((resolve, reject) => {
        const md = new MarkdownIt();
        let result = md.parse(readme_data);
        result = result.filter(item => item.type === "inline")
        let addons = [];
        let from_index = result.findIndex(x => x.content === TAKE_README_PIECE.from);
        let to_index = result.findIndex(x => x.content === TAKE_README_PIECE.to);
        result = result.slice(from_index, to_index).filter((x) => x.level === 1 || x.level === 3);
        console.log("Result: ", result);

        let category_count = 0;
        for (let i = 0; i < result.length; i++) {
            console.log("result: ", result[i])
            if (result[i].level === 1) {
                let category = {
                    title: result[i]?.content,
                    description: result[i + 1]?.content,
                    data: []
                }
                addons.push(category)
                i++;
                category_count++;
            }
            else if (result[i].level === 3) {
                let addon_info = {
                    title: result[i]?.children?.[1]?.content || result[i]?.content,
                    description: result[i]?.children?.length >= 4 ? result[i]?.children?.[3]?.content.replace(/ - | – /gi, '') : null,
                    url: result[i]?.children?.[0]?.attrs?.[0]?.[1] || result[i]?.content
                }
                addons[category_count - 1].data.push(addon_info)
            }
        };
        console.log("ADDONS: ", addons);
        resolve(addons);
    });

}

exports.getAwesomeVoltoToJSON = getAwesomeVoltoToJSON;