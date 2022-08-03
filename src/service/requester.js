export const request = async (url,method,data) => {
    const options = {}

    if (method !== "GET"){
        options.method = method;
        options.headers = {
            'Content-type': 'Application/json'
        }
        options.body = JSON.stringify(data);
    }
    const response = await fetch(url,options);
    const result = await response.json();

    if (response.ok){
        return result;
    }else {
        throw result;
    }
}