//hooks
import { useState, useEffect } from 'react'

//adapters
import { fetchBasicUsers, sentPatients, sentUsers, fetchPatientUsers } from '../adapters/managepatients'

//css
import styles from './managepatients.module.css'

//images
import backbutton from '../images/backButton2.png';


export default function ManagePatients() {

    //states
    const [option, setoption] = useState(null)
    const [basicUsers, setbasicUsers] = useState(null)
    const [patientUsers, setpatientUsers] = useState(null)

    const [addPatients, setaddPatients] = useState([])
    const [removePatients, setremovePatients] = useState([])

    //effects
    useEffect(async () => {
        try {
            if (option === "add") {
                let data = await fetchBasicUsers()
                if (data) {
                    let { docs } = data
                    setbasicUsers(docs)
                    console.log(basicUsers)
                }

            }
            else if (option === "remove") {
                let data = await fetchPatientUsers()
                if (data) {
                    let { docs } = data
                    setpatientUsers(docs)
                    console.log(patientUsers)
                }
            }
        }
        catch (err) {
            console.log(err)
        }

    }, [setoption, option, setbasicUsers, setpatientUsers])
    console.log(removePatients)

    //handleCheckbox
    const handleAddCheckbox = (event) => {

        let { target: { checked, name } } = event
        if (checked) {
            setaddPatients([...addPatients, name])
        }
        else if (!checked) {
            setaddPatients(
                addPatients.filter(
                    (ele) => {
                        return ele !== name
                    }
                )
            )

        }
        console.log(`${event.target.name} : ${event.target.checked} `)
    }

    const handleRemoveCheckbox = (event) => {

        let { target: { checked, name } } = event
        if (checked) {
            setremovePatients([...removePatients, name])
        }
        else if (!checked) {
            setremovePatients(
                removePatients.filter(
                    (ele) => {
                        return ele !== name
                    }
                )
            )

        }
        console.log(`${event.target.name} : ${event.target.checked} `)
    }
    //handle submit
    const handleAddSubmit = () => {
        if (addPatients) {
            sentPatients({ addPatients })
            setbasicUsers(
                basicUsers.filter(
                    (ele) => {
                        return !addPatients.includes(ele._id)
                    }
                )
            )
            setaddPatients([])
        }
    }
    const handleRemoveSubmit = () => {
        if (addPatients) {
            sentUsers({ removePatients })
            setpatientUsers(
                patientUsers.filter(
                    (ele) => {
                        return !removePatients.includes(ele._id)
                    }
                )
            )
            setremovePatients([])
        }
    }

    if (option === null) {
        return (

            <div className={styles.blockbuttoncontainer}>
                <button className={styles.block1} onClick={() => { setoption("add") }}>Add patient</button>
                <button className={styles.block2} onClick={() => { setoption("remove") }}>Remove patient</button>

            </div>
        )
    }
    else if (option === "add") {
        return (
            <div className={styles.container}>
                <img className={styles.backbutton} src={backbutton} alt="back" onClick={() => { setoption(null) }} />
                {/*<button className={styles.backbutton} onClick={() => { setoption(null) }}>&#8249;</button>*/}

                <table className={styles.users} >
                    <tbody >
                        <tr>
                            <th  >User</th ><th >Mark as patient</th>
                        </tr>
                        {basicUsers ? basicUsers.map((basicUser) => {
                            return (
                                <tr key={basicUser._id}>
                                    <td>{basicUser.username}</td>
                                    <td>
                                        <input name={basicUser._id} type="checkbox" onChange={(event) => handleAddCheckbox(event)}></input>
                                    </td>
                                </tr>)
                        }) : null}
                    </tbody>
                </table>

                <input type="submit" onClick={() => handleAddSubmit()}></input>
            </div >)
    }
    else if (option === "remove") {
        return (
            <div className={styles.container}>
                <img className={styles.backbutton} src={backbutton} alt="back" onClick={() => { setoption(null) }} />

                {/*<button className={styles.backbutton} onClick={() => { setoption(null) }}>Back</button>*/}

                <table className={styles.users} >
                    <tbody >
                        <tr>
                            <th  >User</th ><th >Remove patient</th>
                        </tr>
                        {patientUsers ? patientUsers.map((patientUser) => {
                            return (
                                <tr key={patientUser._id}>
                                    <td>{patientUser.username}</td>
                                    <td>
                                        <input name={patientUser._id} type="checkbox" onChange={(event) => handleRemoveCheckbox(event)}></input>
                                    </td>
                                </tr>)
                        }) : null}

                    </tbody>
                </table>

                <button className={styles.savechanges} onClick={() => handleRemoveSubmit()}>Save changes</button>
            </div >)
    }
}