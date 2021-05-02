export const setObject = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getObject = async (key) => {
    const ret = await localStorage.getItem({ key: key });
    return JSON.parse(ret);
}