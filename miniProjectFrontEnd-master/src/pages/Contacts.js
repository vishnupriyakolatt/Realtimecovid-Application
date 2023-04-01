import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../context/maincontext'
import styles from './patient.module.css'
import { fetchContacts } from '../adapters/managecontacts'
import { Loader } from '../components/loader/Loader'
function Contacts() {
    let { tokenVerified, isLogin } = useContext(MainContext)

    const [contacts, setcontacts] = useState(null)
    useEffect(async () => {
        let data = await fetchContacts()
        if (data) {
            setcontacts(data)
            console.log(contacts)
        }
    }, [])
    if (tokenVerified === true || isLogin === true) {
        return contacts ? (
            <div className={styles.container}>
                <table className={styles.patientsTbl} >
                    <tbody >
                        <tr>
                            <th  >Sl.No</th >
                            <th >Contact name</th>
                            <th >Contact details</th>


                        </tr>
                        {contacts ? contacts.map((contact, id) => {
                            return (
                                <tr key={contact._id}>
                                    <td>{id + 1}</td>
                                    <td>{contact.ContactName}</td>
                                    <td>{contact.ContactNumber}</td>

                                </tr>)
                        }) : null}
                    </tbody>
                </table>

            </div>
        ) : <Loader centerit={false} />
    }
    else {
        return (<div>Invalid entry</div>)
    }
}
export default Contacts;
