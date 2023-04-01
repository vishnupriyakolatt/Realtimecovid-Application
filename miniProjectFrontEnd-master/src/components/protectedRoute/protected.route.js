import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
// import auth from "./auth";
import { MainContext } from '../../context/maincontext'


export const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    let { isLogin, tokenVerified } = useContext(MainContext)
    return (

        <Route
            {...rest}
            render={props => {
                if (isLogin === true || tokenVerified === true) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};
