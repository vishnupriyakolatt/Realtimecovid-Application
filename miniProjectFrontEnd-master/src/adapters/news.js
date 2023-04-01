import { axiosCalls } from './axiosCalls'

const newsURLs = {
    createSource: "/news/createSource",
    fetchSource: '/news/fetchSource',
    removeSource: '/news/removeSource',
    fetchNews: "/news/fetchNews"
}

export const createSource = async (payload) => {


    let { data } = await axiosCalls("post", newsURLs.createSource, payload, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside createSource adapter")
    console.log(data.status)
    return data

}
export const fetchSource = async () => {


    let { data: { status, sources } } = await axiosCalls("get", newsURLs.fetchSource, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside fetchSource adapter")
    console.log(status)
    return sources

}
export const removeSource = async (payload) => {


    let { data } = await axiosCalls("post", newsURLs.removeSource, payload, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside removeSource adapter")
    console.log(data)
    // return data

}


export const fetchNews = async () => {
    let { data: { news } } = await axiosCalls("get", newsURLs.fetchNews, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    return news
}

