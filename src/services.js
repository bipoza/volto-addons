import axios from 'axios';
import { API_ENDPOINT, DB_KEYS, AWESOME_VOLTO_MD_ENDPOINT, CATEGORIES } from './constants';
// import { getObject, setObject } from './utils';
import MarkdownIt from 'markdown-it';

export default function getAddons() {
    axios.get(AWESOME_VOLTO_MD_ENDPOINT).then(res => {
        // console.log("RES: ", res.data);
        const md = new MarkdownIt();
        let result = md.parse(res.data);
        result = result.filter(item => item.type === "inline")
        let addons = [];
        let from_index = result.findIndex(x => x.content === 'Addons');
        let to_index = result.findIndex(x => x.content === 'Plone addons for Volto');
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
                addons[category_count-1].data.push(addon_info)
            }
        };
        console.log("ADDONS: ", addons);
        // console.log("ADDONS: ", addons);
        // let category_data = {
        //     name: result[0].content,
        //     description: result[1].content,
        //     data: []
        // }
        // let map_data_content = result.filter(item => item.level === 3);
        // console.log("map_data_content: ", map_data_content);
        // map_data_content.forEach(item => {
        //     let addon_info = {
        //         title: item?.children?.[1]?.content,
        //         description: item?.children?.length >= 4 ? item?.children?.[3]?.content.replace(' - ', '') : null,
        //         url: item?.children?.[0]?.attrs?.[0]?.[1]
        //     }
        //     console.log("addon_info: ", addon_info)
        //     category_data.data.push(addon_info);
        // });
        // debugger
        // addons.push(category_data);
        // console.log("ADDONS: ", addons);
        // });
    }).catch(err => {
        // dispatch(getMoviesListFailure(err.message));
    });
}