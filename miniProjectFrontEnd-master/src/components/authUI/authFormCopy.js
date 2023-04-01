import React, { useState, useContext } from 'react';

import authFormStyle from './authForm.module.css';

import { auth } from '../../adapters/auth'
import { useForm } from '../../general/HandleChanges'

//main context
import { MainContext } from '../../context/maincontext'

const AuthForm = (props) => {

    let { setusername, setisLogin } = useContext(MainContext)
    const [value, handleChange] = useForm(
        {
            username: '',
            password: '',
            authMethod: props.authMethod
        })

    const [authMessage, setauthMessage] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();
        let { data: { status, accessToken, username } } = await auth(value)
        setauthMessage(status)
        if (value.authMethod === "Login") {
            setusername(username)
            setisLogin(true)
            localStorage.setItem("token", accessToken)
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

