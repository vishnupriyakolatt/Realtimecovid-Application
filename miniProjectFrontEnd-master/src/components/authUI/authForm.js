//hooks
import React, { useState, useContext } from 'react';
import { useForm } from '../../general/HandleChanges'

//context
import { MainContext } from '../../context/maincontext'

//css
import authFormStyle from './authForm.module.css';

//adapter
import { auth } from '../../adapters/auth'
import { polllocation } from '../../adapters/location'

const AuthForm = () => {

    let { setusername, handleToken, setisLogin, setuserRole } = useContext(MainContext)

    const [value, handleChange] = useForm(
        {
            username: '',
            password: '',
            authMethod: "Login"
        })

    const [authMessage, setauthMessage] = useState('')

    async function handleSubmit(event) {

        event.preventDefault();
        let { data } = await auth(value)
        let { status, accessToken, username, userRole } = data

        if (data) {
            setauthMessage(status)

            if (value.authMethod === "Login") {
                setusername(username)

                if (accessToken) {
                    handleToken("set", accessToken)
                    setisLogin(true)
                    setuserRole(userRole)
                    if (userRole === "patient") {
                        console.log("from authform")
                        polllocation()

                    }
                }
                else {
                    console.log("accessToken is empty")
                }
            }

        }

    }

    return (
        <div className={authFormStyle.container}>

            <h1 className={authFormStyle.heading}>{value.authMethod}</h1>

            <form className={authFormStyle.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    className={authFormStyle.field}
                    placeholder="username"
                    value={value.username}
                    onChange={
                        (event) => handleChange(event)
                    }
                    required
                />

                <input
                    type="password"
                    name="password"
                    className={authFormStyle.field}
                    placeholder="Password"
                    value={value.password}
                    onChange={
                        (event) => handleChange(event)
                    }
                    required
                />
                <div className={authFormStyle.radioGrp} >
                    <input
                        type="radio"
                        value="Login"
                        name="authMethod"
                        checked={value.authMethod === "Login"}
                        onChange={(event) => handleChange(event)}
                        className={authFormStyle.radio}
                    />
                    Login
                    <input
                        type="radio"
                        value="Register"
                        name="authMethod"
                        checked={value.authMethod === "Register"}
                        onChange={(event) => handleChange(event)}
                        className={authFormStyle.radio}
                    />
                    Register

                </div>


                <button className={authFormStyle.btn} type="submit">
                    Submit
                </button>

                <h4 className={authFormStyle.loginStat}>
                    {authMessage}
                </h4>
            </form>
        </div >)
}

export { AuthForm }