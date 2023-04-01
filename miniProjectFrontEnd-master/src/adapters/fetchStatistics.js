import { axiosCalls } from './axiosCalls'

// const config = {
//     headers: {
//         Authorization: 'Bearer ' + localStorage.getItem("token")
//     }
// }

const baseURL = 'https://api.covid19api.com'
const fetchStatiURLs = {
    fetchCountries: '/country/fetchCountries',
    fetchHistoric: '/dayone/country/',
    fetchCurrent: '/summary',

}
export const fetchCountries = async () => {


    return (await axiosCalls("get", fetchStatiURLs.fetchCountries, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    }))

}
export const fetchCurrent = async () => {
    let { data } = await axiosCalls("get", `${baseURL}${fetchStatiURLs.fetchCurrent}`)

    if (data) {
        const { Global, Countries } = data

        //Global summary
        let { TotalConfirmed, TotalDeaths, TotalRecovered, Date } = Global
        let ActiveCases = TotalConfirmed - TotalDeaths - TotalRecovered
        const globalSummary = {
            TotalConfirmed,
            TotalDeaths,
            TotalRecovered,
            ActiveCases,
            Date
        }

        //Country summary
        const countrySummary = await [...Countries].map(country => {

            let { Country, Slug, TotalConfirmed, TotalDeaths, TotalRecovered, Date } = country
            let ActiveCases = TotalConfirmed - TotalDeaths - TotalRecovered

            return {
                Country,
                Slug,
                TotalConfirmed,
                TotalDeaths,
                TotalRecovered,
                ActiveCases,
                Date
            };
        });
        return ({ globalSummary, countrySummary });
    }
    else { return null }

}
export const fetchHistoric = async (Slug) => {

    const { data } = await axiosCalls("get", `${baseURL}${fetchStatiURLs.fetchHistoric}${Slug}`)
    return data

}