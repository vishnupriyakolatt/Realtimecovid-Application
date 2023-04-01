import { axiosCalls } from './axiosCalls'
// const config = {
//     headers: {
//         Authorization: 'Bearer ' + localStorage.getItem("token")
//     }
// }
const ManagePatientsLinks = {
    fetchBasicUsers: '/users/basicusers',
    fetchPatientUsers: '/users/patientusers',

    sentPatients: '/users/sentpatients',
    sentUsers: '/users/sentusers',
    fetchPatientsNearby: '/users/patientsnearby',
    fetchAllPatients: '/users/allpatients'

}

export const fetchBasicUsers = async () => {


    let { data } = await axiosCalls("get", ManagePatientsLinks.fetchBasicUsers, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside fetchBasicUsers adapter")
    console.log(data)
    return data

}
export const fetchPatientUsers = async () => {


    let { data } = await axiosCalls("get", ManagePatientsLinks.fetchPatientUsers, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside fetchPatientUsers adapter")
    console.log(data)
    return data

}

export const sentPatients = async (payload) => {


    let { data } = await axiosCalls("post", ManagePatientsLinks.sentPatients, payload, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside sentPatients adapter")
    console.log(data)
    // return data

}
export const sentUsers = async (payload) => {


    let { data } = await axiosCalls("post", ManagePatientsLinks.sentUsers, payload, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside sentUsers adapter")
    console.log(data)
    // return data

}
export const fetchPatientsNearby = async () => {

    // console.log(payload)
    let { data } = await axiosCalls("get", ManagePatientsLinks.fetchPatientsNearby, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    if (data) {
        let { status, patients } = data
        console.log("inside fetchPatientsNearby adapter")
        console.log(status)
        console.log(patients)
        return patients

    }


}
export const fetchAllPatients = async () => {

    // console.log(payload)
    let { data } = await axiosCalls("get", ManagePatientsLinks.fetchAllPatients, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    if (data) {
        let { status, patients } = data
        console.log("inside fetchPatientsNearby adapter")
        console.log(status)
        console.log(patients)
        return patients

    }


}