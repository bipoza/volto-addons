const simpleGit = require('simple-git');
const git = simpleGit();
const { getTimestamp } = require('./utils');
const {generateCache} = require('./cache_generator');

generateCache().then(()=>{
    git.add("../cache/cache.json")
    .commit("Auto generated cache " + getTimestamp())
    .push("origin", "main")
})