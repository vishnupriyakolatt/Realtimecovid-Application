//hooks
import React, { createContext, useState } from 'react'

const MainContext = createContext()

const MainProvider = (props) => {

    //states in context
    const [username, setusername] = useState(null)
    const [isLogin, setisLogin] = useState(false)
    const [tokenVerified, settokenVerified] = useState(null)
    const [userRole, setuserRole] = useState(null)
    const [timeoutID, settimeoutID] = useState(null)
    console.log(userRole)


    //handling tokens
    const handleToken = (operation, token = null) => {
        if (operation === "set" && token) {
            localStorage.setItem("token", token)
            console.log("token is set")
        }
        else if (operation === "read") {

            let tkn = localStorage.getItem("token");
            console.log("token is read: " + tkn)
            return tkn

        }
        else if (operation === "clear") {
            localStorage.removeItem("token");
            settokenVerified(false)
            setisLogin(false)
            setusername('')
            console.log("token is cleared ")
            if (userRole === "patient") {
                console.log("from maincontext")
                clearInterval(timeoutID)
            }

        }

    }

    return (
        <MainContext.Provider value={{
            username, setusername,
            isLogin, setisLogin,
            handleToken,
            tokenVerified, settokenVerified,
            userRole, setuserRole,
            timeoutID, settimeoutID
        }}>
            {props.children}
        </MainContext.Provider>
    )
}

export { MainContext, MainProvider };