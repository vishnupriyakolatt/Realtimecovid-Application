import { axiosCalls } from './axiosCalls'


export const verifyAccessTkn = async (token) => {
    const linkToVerifyToken = '/token/verify'

    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    let { data: { status, action, username, userRole } } = await axiosCalls("get", linkToVerifyToken, config)
    console.log(`inside verifyToken ${action} ${status} ${username} ${userRole}`)
    return { action, username, userRole }

}

