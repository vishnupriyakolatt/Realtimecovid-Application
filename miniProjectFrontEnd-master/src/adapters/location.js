import { axiosCalls } from './axiosCalls'

const locationURLs = {
    poll: "/location/poll"
}

// let config = {
//     headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('token')
//     }
// }
export const polllocation = async () => {



    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const payload = { latitude, longitude }
        console.log(payload)

        let { data: { status } } = await axiosCalls("post", locationURLs.poll, payload, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
        console.log("location: ")
        // console.log(payload)

        console.log(status)
    }

    function error() {
        console.log('Unable to retrieve your location')
    }

    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser')
    } else {
        console.log('Locating…')
        navigator.geolocation.getCurrentPosition(success, error)
    }



    console.log("poll")

}

export const getlocation = async () => {
    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const payload = { latitude, longitude }
        console.log(payload)

        let { data: { status } } = await axiosCalls("post", locationURLs.poll, payload, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
        console.log("location: ")
        // console.log(payload)

        console.log(status)
    }

    function error() {
        console.log('Unable to retrieve your location')
    }

    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser')
    } else {
        console.log('Locating…')
        navigator.geolocation.getCurrentPosition(success, error)
    }
}