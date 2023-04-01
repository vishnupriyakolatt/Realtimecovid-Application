//hooks
import { useState, useEffect, useContext } from 'react'

//context
import { MainContext } from '../context/maincontext'

//adapters
import { createSource, fetchSource, removeSource } from '../adapters/news'

//css
import styles from './ManageInstitution.module.css'
import backbutton from '../images/backButton2.png';
export default function ManageNews(props) {
    //context
    let { tokenVerified, isLogin, userRole } = useContext(MainContext)


    //states
    const [option, setoption] = useState(null)
    const [value, setvalue] = useState({ sourceName: '', sourceLink: '' })
    const [showClear, setshowClear] = useState(false)
    const [sources, setsources] = useState(null)
    const [removesources, setremovesources] = useState([])

    console.log(removesources)
    //effects
    useEffect(() => {
        if (value.sourceName === '' &&
            value.sourceLink === '') {
            setshowClear(false)
        }
    }, [value])

    useEffect(async () => {
        if (option === "view") {
            let data = await fetchSource()
            if (data) {
                setsources(data)
                console.log(sources)
            }
        }

    }, [option, removesources, setremovesources])

    //handleChange
    const handleChange = (event) => {
        setshowClear(true)
        setvalue({ ...value, [event.target.name]: event.target.value })
    }
    const clearFields = () => {
        setvalue({ sourceName: '', sourceLink: '', statusTxt: '' })

    }

    //handleCheckbox
    const handleRemoveCheckbox = (event) => {
        let { target: { checked, name } } = event
        if (checked) {
            setremovesources([...removesources, name])
        }
        else if (!checked) {
            setremovesources(
                removesources.filter(
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
            let { sourceName, sourceLink } = value
            let { status } = await createSource({ sourceName, sourceLink })
            setvalue({ statusTxt: status })
            console.log(status)
        }
        catch (err) {
            console.log(err)
        }


    }
    const handleRemoveSubmit = async () => {
        try {
            if (removesources) {
                let data = await removeSource({ removesources })
                setremovesources([])
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
                    <button className={styles.block1} onClick={() => setoption("add")}>Add Source</button>
                    <button className={styles.block2} onClick={() => setoption("view")}>View Sources</button>
                </div>
            )
        }
        else if (option === "add") {
            return (
                <div className={styles.container}>
                    {/*<button onClick={() => setoption(null)}>Back</button>*/}
                    <img className={styles.backbutton} src={backbutton} alt="back" onClick={() => { setoption(null) }} />

                    <div>
                        <label>Source Name</label>
                        <input name="sourceName" type="text" value={value.sourceName}
                            onChange={(event) => handleChange(event)}></input>


                        <label>Source Link</label>
                        <textarea name="sourceLink" value={value.sourceLink}
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
                                <th  >Source name</th >
                                <th >Source link</th>
                                <th >Mark to remove</th>

                            </tr>
                            {sources ? sources.map((source) => {
                                return (
                                    <tr key={source._id}>
                                        <td>{source.sourceName}</td>
                                        <td>{source.sourceLink}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <input name={source._id} type="checkbox" onChange={(event) => handleRemoveCheckbox(event)}></input>
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