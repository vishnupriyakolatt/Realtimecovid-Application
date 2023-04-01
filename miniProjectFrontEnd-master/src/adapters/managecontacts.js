import { axiosCalls } from './axiosCalls'


const ManageContactLinks = {
    createContact: '/contacts/createcontact',
    fetchContacts: '/contacts/fetchcontacts',
    removeContact: '/contacts/removecontact'


}
export const createContact = async (payload) => {


    let { data } = await axiosCalls("post", ManageContactLinks.createContact, payload, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside createContact adapter")
    console.log(data.status)
    return data

}
export const fetchContacts = async () => {


    let { data: { status, contacts } } = await axiosCalls("get", ManageContactLinks.fetchContacts, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside fetchContacts adapter")
    console.log(status)
    return contacts

}
export const removeContact = async (payload) => {


    let { data } = await axiosCalls("post", ManageContactLinks.removeContact, payload, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside removeContact adapter")
    console.log(data)
    // return data

}