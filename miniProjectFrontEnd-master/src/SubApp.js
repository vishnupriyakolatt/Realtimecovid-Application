//hooks
import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//pages
import Home from './pages/Home';
import News from './pages/News';
import Statistics from './pages/Statistics';
import ManagePatients from './pages/ManagePatients';
import ManageInstitution from './pages/ManageInstitution';
import NearbyInstitutions from './pages/NearbyInstitutions';
import ManageUsers from './pages/ManageUsers';
import Profile from './pages/Profile';
import NearbyPatients from './pages/NearbyPatients';
import ManageContacts from './pages/ManageContacts';
import ManageNews from './pages/ManageNews';
import Patients from './pages/Patients';
import MedicalCentres from './pages/MedicalCentres';
import Contacts from './pages/Contacts';







//context
import { MainContext } from './context/maincontext'

//custom components
import Navbar from './components/navbar/Navbar';
import { AuthForm } from './components/authUI/authForm'
import { ProtectedRoute } from "./components/protectedRoute/protected.route";


//adapters
import { verifyAccessTkn } from './adapters/verifyToken'
import { polllocation } from './adapters/location'



export default function SubApp() {
    let { isLogin,
        tokenVerified, settokenVerified,
        handleToken,
        setusername,
        setuserRole, userRole,
        settimeoutID } = useContext(MainContext)

    useEffect(async () => {
        let tokenRes = handleToken("read")
        if (tokenRes) {
            let verify = await verifyAccessTkn(tokenRes)
            if (verify) {
                let { username, userRole, action } = verify
                settokenVerified(action)
                setusername(username)
                setuserRole(userRole)
                if (userRole === "patient")
                    polllocation()
            }


        }

    }, [])
    useEffect(async () => {
        if (userRole === "patient") {
            //polllocation
            settimeoutID(setInterval(() => {
                console.log("from subapp")
                polllocation()
            }, 10000))
        }
    }, [userRole, setuserRole])

    //checking 
    console.log("isLogin :" + isLogin)
    console.log("tokenVerified :" + tokenVerified)


    return (tokenVerified || isLogin) ? (<>
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Home} />
                <ProtectedRoute exact path='/news' component={News} />
                <ProtectedRoute exact path='/statistics' component={Statistics} />
                <ProtectedRoute exact path='/managepatients' component={ManagePatients} />
                <ProtectedRoute exact path='/manageinstitution' component={ManageInstitution} />
                <ProtectedRoute exact path='/nearbyinstitutions' component={NearbyInstitutions} />
                <ProtectedRoute exact path='/manageusers' component={ManageUsers} />
                <ProtectedRoute exact path='/profile' component={Profile} />
                <ProtectedRoute exact path='/nearbypatients' component={NearbyPatients} />
                <ProtectedRoute exact path='/managecontacts' component={ManageContacts} />
                <ProtectedRoute exact path='/managenews' component={ManageNews} />
                <ProtectedRoute exact path='/patients' component={Patients} />
                <ProtectedRoute exact path='/institutions' component={MedicalCentres} />
                <ProtectedRoute exact path='/contacts' component={Contacts} />



                <Route path="/" render={() => <div >404 NOT FOUND</div>} />

            </Switch>
        </Router>
    </>
    ) : <AuthForm authMethod="Login" />


}