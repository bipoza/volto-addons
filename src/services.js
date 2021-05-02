import axios from 'axios';
import { API_ENDPOINT, DB_KEYS, AWESOME_VOLTO_MD_ENDPOINT, CATEGORIES } from './constants';
// import { getObject, setObject } from './utils';
import MarkdownIt from 'markdown-it';

export default function getAddons() {
    axios.get(AWESOME_VOLTO_MD_ENDPOINT).then(res => {
        console.log("RES: ", res.data);

        const md = new MarkdownIt();
        let result = md.parse(res.data);
        result = result.filter(item => item.type === "inline")
        let addons = [];

        let from_index = result.findIndex(x => x.content === 'Addons');
        let to_index = result.findIndex(x => x.content === 'Plone addons for Volto');


        CATEGORIES.forEach(category => {
            let category_index = result.findIndex(x => x.content === category.name);

            result = result.slice(category_index);
            console.log("Result: ", result);
            let category_data = {
                name: result[0].content,
                description: result[1].content,
                data: []
            }
            let map_data_content = result.filter(item => item.level === 3);
            console.log("map_data_content: ", map_data_content);
            map_data_content.forEach(item => {
                // console.log("ITEM: ", item)

                let addon_info={
                    title: item?.children?.[1]?.content,
                    description: item?.children?.length >= 4 ? item?.children?.[3]?.content.replace(' - ', '') : null,
                    url: item?.children?.[0]?.attrs?.[0]?.[1]
                }
                console.log("addon_info: ", addon_info)
                
                category_data.data.push(addon_info);
            });
            // debugger
            addons.push(category_data);
            console.log("ADDONS: ", addons);

        });
    }).catch(err => {
        // dispatch(getMoviesListFailure(err.message));
    });
}