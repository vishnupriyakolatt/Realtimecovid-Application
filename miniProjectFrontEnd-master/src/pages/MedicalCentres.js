import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../context/maincontext'
import styles from './patient.module.css'
import { fetchInstitutionsNearby } from '../adapters/manageinstitution'

function MedicalCentres() {
    let { tokenVerified, isLogin } = useContext(MainContext)

    const [institutions, setinstitutions] = useState(null)
    useEffect(async () => {
        let data = await fetchInstitutionsNearby()
        if (data) {
            setinstitutions(data)
            console.log(institutions)
        }
    }, [])
    if (tokenVerified === true || isLogin === true) {
        return (
            <div className={styles.container}>
                <table className={styles.patientsTbl} >
                    <tbody >
                        <tr>
                            <th  >Sl.No</th >
                            <th >Institution</th>
                            <th >Contact Info</th>


                        </tr>
                        {institutions ? institutions.map((institute, id) => {
                            return (
                                <tr key={institute._id}>
                                    <td>{id + 1}</td>
                                    <td>{institute.instituteName}</td>
                                    <td>{institute.contactInfo}</td>
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
export default MedicalCentres;
