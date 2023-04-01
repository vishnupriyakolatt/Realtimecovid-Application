import { axiosCalls } from './axiosCalls'

const ManageInstitutionLinks = {
    createInstitution: '/institutions/createInstitution',
    fetchInstitutionsNearby: '/institutions/fetchInstitutionsNearby',
    fetchInstitutionsbyHealth: '/institutions/fetchInstitutionsbyHealth',
    removeInstitution: '/institutions/deleteInstitutions',


}
export const createInstitution = async (payload) => {


    let { data } = await axiosCalls("post", ManageInstitutionLinks.createInstitution, payload, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside createInstitution adapter")
    console.log(data.status)
    return data

}
export const fetchInstitutionsbyHealth = async () => {


    let { data: { status, institutions } } = await axiosCalls("get", ManageInstitutionLinks.fetchInstitutionsbyHealth, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside fetchInstitutionsbyHealth adapter")
    console.log(status)
    return institutions

}
export const removeInstitution = async (payload) => {


    let { data } = await axiosCalls("post", ManageInstitutionLinks.removeInstitution, payload, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside removeInstitution adapter")
    console.log(data)
    // return data

}

export const fetchInstitutionsNearby = async () => {

    // console.log(payload)
    let { data } = await axiosCalls("get", ManageInstitutionLinks.fetchInstitutionsNearby, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    if (data) {
        let { status, institutions } = data
        console.log("inside fetchInstitutionsNearby adapter")
        console.log(status)
        console.log(institutions)
        return institutions

    }


}