import { axiosCalls } from './axiosCalls'

const ManageUsersLinks = {
    fetchUsers: '/users/fetchusers',
    updateUsers: '/users/updateusers',
    whoami: '/users/whoami'

}

export const fetchUsers = async () => {


    let { data } = await axiosCalls("get", ManageUsersLinks.fetchUsers, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside fetchUsers adapter")

    return data

}
export const updateUsers = async (payload) => {


    let { data } = await axiosCalls("post", ManageUsersLinks.updateUsers, payload, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    console.log("inside updateUsers adapter")
    console.log(data)
    return data

}

