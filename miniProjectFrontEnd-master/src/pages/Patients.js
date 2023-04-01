import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../context/maincontext'
import styles from './patient.module.css'
import { fetchAllPatients } from '../adapters/managepatients'

function Patients() {
    let { tokenVerified, isLogin } = useContext(MainContext)

    const [patients, setpatients] = useState(null)
    useEffect(async () => {
        let data = await fetchAllPatients()
        if (data) {
            setpatients(data)
            console.log(patients)
        }
    }, [])
    if (tokenVerified === true || isLogin === true) {
        return (
            <div className={styles.container}>
                <table className={styles.patientsTbl} >
                    <tbody >
                        <tr>
                            <th  >Sl.No</th >
                            <th >Patient Name</th>

                        </tr>
                        {patients ? patients.map((patient, id) => {
                            return (
                                <tr key={patient._id}>
                                    <td>{id + 1}</td>
                                    <td>{patient.username}</td>

                                </tr>)
                        }) : null}
                    </tbody>
                </table>

            </div>
        )
    }
    else {
        return (<div>Invalid entry</div>)
    }
}
export default Patients;
