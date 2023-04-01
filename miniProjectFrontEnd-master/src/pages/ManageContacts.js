//hooks
import { useState, useEffect, useContext } from 'react'

//context
import { MainContext } from '../context/maincontext'

//adapters
import { createContact, fetchContacts, removeContact } from '../adapters/managecontacts'

//css
import styles from './ManageInstitution.module.css'
import backbutton from '../images/backButton2.png';

import { Loader } from '../components/loader/Loader'


export default function Managecontact(props) {
    //context
    let { tokenVerified, isLogin, userRole } = useContext(MainContext)


    //states
    const [option, setoption] = useState(null)
    const [value, setvalue] = useState({ contactName: '', contactNumber: '' })
    const [showClear, setshowClear] = useState(false)
    const [contacts, setcontacts] = useState(null)
    const [removecontacts, setremovecontacts] = useState([])

    console.log(removecontacts)
    //effects
    useEffect(() => {
        if (value.contactName === '' &&
            value.contactNumber === '') {
            setshowClear(false)
        }
    }, [value])

    useEffect(async () => {
        if (option === "view") {
            let data = await fetchContacts()
            if (data) {
                setcontacts(data)
                console.log(contacts)
            }
        }

    }, [option, setremovecontacts, removecontacts])

    //handleChange
    const handleChange = (event) => {
        setshowClear(true)
        setvalue({ ...value, [event.target.name]: event.target.value })
    }
    const clearFields = () => {
        setvalue({ contactName: '', contactNumber: '', statusTxt: '' })

    }

    //handleCheckbox
    const handleRemoveCheckbox = (event) => {
        let { target: { checked, name } } = event
        if (checked) {
            setremovecontacts([...removecontacts, name])
        }
        else if (!checked) {
            setremovecontacts(
                removecontacts.filter(
                    (ele) => {
                        return ele !== name
                    }
                )
            )

        }
        console.log(`${event.target.name} : ${event.target.checked} `)
    }
    //handleOnsubmit
    const handleAddOnsubmit = async () => {
        try {
            let { contactName, contactNumber } = value
            let { status } = await createContact({ contactName, contactNumber })
            setvalue({ statusTxt: status })
            console.log(status)
        }
        catch (err) {
            console.log(err)
        }


    }
    const handleRemoveSubmit = async () => {
        try {
            if (removecontacts) {
                let data = await removeContact({ removecontacts })
                setremovecontacts([])
                console.log(data)

            }
        }
        catch (err) {
            console.log(err)
        }

    }

    if ((tokenVerified === true || isLogin === true) && userRole === "admin") {
        if (option === null) {
            return (
                <div className={styles.blockbuttoncontainer}>
                    <button className={styles.block1} onClick={() => setoption("add")}>Add contact</button>
                    <button className={styles.block2} onClick={() => setoption("view")}>View contact</button>
                </div>
            )
        }
        else if (option === "add") {
            return (
                <div className={styles.container}>
                    {/*<button onClick={() => setoption(null)}>Back</button>*/}
                    <img className={styles.backbutton} src={backbutton} alt="back" onClick={() => { setoption(null) }} />

                    <div>
                        <label>Contact Name</label>
                        <input name="contactName" type="text" value={value.contactName}
                            onChange={(event) => handleChange(event)}></input>


                        <label>Contact Number</label>
                        <textarea name="contactNumber" value={value.contactNumber}
                            onChange={(event) => handleChange(event)}></textarea>

                        {showClear ?
                            (<button onClick={() => {
                                clearFields()
                            }}>clear Fields</button>) : null
                        }

                        <input type="submit" onClick={(event) => handleAddOnsubmit(event)}></input>
                        <h4>{value.statusTxt}</h4>

                    </div>
                </div>
            )
        }
        else if (option === "view") {

            if (contacts) {
                return (
                    <div className={styles.container}>
                        <img className={styles.backbutton} src={backbutton} alt="back" onClick={() => { setoption(null) }} />
                        <table className={styles.institutionsTbl} >
                            <tbody >
                                <tr>
                                    <th  >Contact name</th >
                                    <th >Contact details</th>
                                    <th >Mark to remove</th>

                                </tr>
                                {contacts.map((contact) => {
                                    return (
                                        <tr key={contact._id}>
                                            <td>{contact.ContactName}</td>
                                            <td>{contact.ContactNumber}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <input name={contact._id} type="checkbox" onChange={(event) => handleRemoveCheckbox(event)}></input>
                                            </td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                        <button className={styles.savechanges} onClick={() => handleRemoveSubmit()}>Save changes</button>



                    </div>
                )
            }
            else {
                return <Loader centerit={true} />

            }
        }
    }
    else {
        return (<div>Invalid entry</div>)
    }
}