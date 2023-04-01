import { axiosCalls } from './axiosCalls'

const authURLs = {
    login: "/users/signin",
    register: "/users/create"
}

async function auth(data) {

    let { username, password, authMethod } = data
    if (authMethod === "Login") {
        return await login({ username, password })
    }
    else {
        return await register({ username, password })
    }
}


async function login(payload) {

    return (
        await axiosCalls("post", authURLs.login, payload)
    )
}
async function register(payload) {
    return (
        await axiosCalls("post", authURLs.register, payload)
    )
}

export { auth }