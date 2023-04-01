import axios from "axios";

function axiosCalls(method, url, payload = null, options = null) {

    if (method === "post") {
        if (options) {
            return postCall(url, payload, options)
        }
        else {
            return postCall(url, payload)
        }
    }
    else if (method === "get") {
        if (payload) {
            return getCall(url, payload)//this is done bcoz of default parameters rule
        }
        else {
            return getCall(url)
        }
    }
    else {
        return "invalid method of call"

    }


}


async function postCall(url, payload, options = null) {
    try {

        const response = options ? await axios.post(url, payload, options) : await axios.post(url, payload)


        console.log(response);
        return response

    } catch (error) {
        console.error(error);
        return error

    }
}

async function getCall(url, payload = null) {
    try {

        const response = payload ? await axios.get(url, payload) : await axios.get(url)

        // console.log(response.data.status);
        return response

    } catch (error) {
        console.error(error);
        return error

    }
}

export { axiosCalls }