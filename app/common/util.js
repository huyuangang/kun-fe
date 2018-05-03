

export function getQueryParams(search) {
    search = search || location.search;
    if(!search) {
        return {}
    }
    search = search.slice(1);
    let sArr = search.split('&');
    let o = {};
    sArr.forEach(item => {
        let itemArr = item.split('=');
        o[itemArr[0]] = itemArr[1]
    });
    return o;
    
}