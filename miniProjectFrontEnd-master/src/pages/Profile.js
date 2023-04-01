import React, { useContext } from 'react';
import { MainContext } from '../context/maincontext'
import styles from './profile.module.css'
import profilePic from '../images/profilePic.png'
import checkbadge from '../images/checkbadge.png'

function Profile() {
    let { tokenVerified, isLogin, username, userRole } = useContext(MainContext)


    if (tokenVerified === true || isLogin === true) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.upperContainer}>
                        <div className={styles.imageContainer}>
                            <img className={styles.pfImage} src={profilePic} alt="profile pic" width="100px" height="100px" />
                        </div>
                    </div>
                    <div className={styles.lowerContainer}>
                        <h2>{username}</h2>
                        <div className={styles.description}>
                            <p>Welcome to your profile.</p>
                            <p> You are {userRole === "admin" ? " an " : " a "}{userRole + " "}user.</p>
                        </div>

                        <img className={styles.badgeImage} src={checkbadge} alt="profile pic" />

                    </div>
                </div>
            </div>)
    }
    else {
        return (<div>Invalid entry</div>)
    }
}
export default Profile;
// <div className={styles.container}>
//             <div >
//                 <img src={profilePic} className={styles.pfpic} alt="profile pic" />
//                 <br />
//                 <h1>{username}</h1></div>
//             <br />
//             <h2>Welcome to your profile. You are {userRole === "admin" ? " an " : " a "}{userRole + " "}user.</h2>


//         </div>