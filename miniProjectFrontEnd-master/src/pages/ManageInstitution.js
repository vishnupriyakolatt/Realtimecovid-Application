//hooks
import { useState, useEffect, useContext } from 'react'

//context
import { MainContext } from '../context/maincontext'

//adapters
import { createInstitution, fetchInstitutionsbyHealth, removeInstitution } from '../adapters/manageinstitution'

//css
import styles from './ManageInstitution.module.css'
import backbutton from '../images/backButton2.png';
export default function ManageInstitution(props) {
    //context
    let { tokenVerified, isLogin, userRole } = useContext(MainContext)


    //states
    const [option, setoption] = useState(null)
    const [value, setvalue] = useState({ instituteName: '', latitude: '', longitude: '', contactInfo: '' })
    const [showClear, setshowClear] = useState(false)
    const [institutions, setinstitutions] = useState(null)
    const [removeinstitutions, setremoveinstitutions] = useState([])

    console.log(removeinstitutions)
    //effects
    useEffect(() => {
        if (value.instituteName === '' &&
            value.latitude === '' &&
            value.longitude === '' &&
            value.contactInfo === '') {
            setshowClear(false)
        }
    }, [value])

    useEffect(async () => {
        if (option === "view") {
            let data = await fetchInstitutionsbyHealth()
            if (data) {
                setinstitutions(data)
            }
        }

    }, [option, setremoveinstitutions, removeinstitutions])

    //handleChange
    const handleChange = (event) => {
        setshowClear(true)
        setvalue({ ...value, [event.target.name]: event.target.value })
    }
    const clearFields = () => {
        setvalue({ instituteName: '', latitude: '', longitude: '', contactInfo: '', statusTxt: '' })

    }

    //handleCheckbox
    const handleRemoveCheckbox = (event) => {
        let { target: { checked, name } } = event
        if (checked) {
            setremoveinstitutions([...removeinstitutions, name])
        }
        else if (!checked) {
            setremoveinstitutions(
                removeinstitutions.filter(
                    (ele) => {
                        return ele !== name
                    }
                )
            )

        }
        console.log(`${event.target.name} : ${event.target.checked} `)
    }
    //handleOnsubmit
    const handleAddOnsubmit = async (event) => {
        try {
            let { instituteName, latitude, longitude, contactInfo } = value
            let { status } = await createInstitution({ instituteName, latitude, longitude, contactInfo })
            setvalue({ statusTxt: status })
            console.log(status)
        }
        catch (err) {
            console.log(err)
        }


    }
    const handleRemoveSubmit = async (event) => {
        try {
            if (removeinstitutions) {
                let data = await removeInstitution({ removeinstitutions })
                setremoveinstitutions([])
                console.log(data)

            }
        }
        catch (err) {
            console.log(err)
        }

    }

    if ((tokenVerified === true || isLogin === true) && userRole === "health") {
        if (option === null) {
            return (
                <div className={styles.blockbuttoncontainer}>
                    <button className={styles.block1} onClick={() => setoption("add")}>Add institution</button>
                    <button className={styles.block2} onClick={() => setoption("view")}>View institution</button>
                </div>
            )
        }
        else if (option === "add") {
            return (
                <div className={styles.container}>
                    {/*<button onClick={() => setoption(null)}>Back</button>*/}
                    <img className={styles.backbutton} src={backbutton} alt="back" onClick={() => { setoption(null) }} />

                    <div>
                        <label>Institution Name</label>
                        <input name="instituteName" type="text" value={value.instituteName}
                            onChange={(event) => handleChange(event)}></input>

                        <label>Latitude</label>
                        <input name="latitude" type="text" value={value.latitude}
                            onChange={(event) => handleChange(event)}></input>

                        <label>Longitude</label>
                        <input name="longitude" type="text" value={value.longitude}
                            onChange={(event) => handleChange(event)}></input>
                        {/*<input type="checkbox"></input>use current location*/}

                        <label>Contact Info</label>
                        <textarea name="contactInfo" value={value.contactInfo}
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
            return (
                <div className={styles.container}>
                    {/*<button onClick={() => setoption(null)}>Back</button>*/}
                    <img className={styles.backbutton} src={backbutton} alt="back" onClick={() => { setoption(null) }} />
                    <table className={styles.institutionsTbl} >
                        <tbody >
                            <tr>
                                <th  >Institution</th >
                                <th >Contact Info</th>
                                <th >Mark to remove</th>

                            </tr>
                            {institutions ? institutions.map((institution) => {
                                return (
                                    <tr key={institution._id}>
                                        <td>{institution.instituteName}</td>
                                        <td>{institution.contactInfo}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <input name={institution._id} type="checkbox" onChange={(event) => handleRemoveCheckbox(event)}></input>
                                        </td>
                                    </tr>)
                            }) : null}
                        </tbody>
                    </table>
                    <button className={styles.savechanges} onClick={() => handleRemoveSubmit()}>Save changes</button>

                </div>
            )
        }
    }
    else {
        return (<div>Invalid entry</div>)
    }
}