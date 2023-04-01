import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../context/maincontext'
import { fetchUsers, updateUsers } from '../adapters/manageusers'
import styles from './manageusers.module.css'

function ManageUsers() {
    let { tokenVerified, isLogin } = useContext(MainContext)

    //states
    const [users, setusers] = useState([])
    const [updatelist, setupdatelist] = useState([])
    const [statustxt, setstatustxt] = useState('')
    //effect
    useEffect(async () => {

        let { docs, status } = await fetchUsers()

        setusers(docs)
        console.log(status)

    }, [statustxt])
    const handleRole = (event) => {
        setstatustxt('')

        let { target: { name, value } } = event
        let filteredlist = []
        for (let i = 0; i < updatelist.length; i++) {
            if (updatelist[i]._id !== name) {
                filteredlist.push({ _id: updatelist[i]._id, role: updatelist[i].role })
            }
        }

        setupdatelist([...filteredlist, { _id: name, role: value }])

    }
    console.log(updatelist)

    const handleSave = async () => {
        if (updatelist) {
            let { status } = await updateUsers({ updatelist })
            console.log(status)
            setstatustxt(status)
        }
    }
    if (tokenVerified === true || isLogin === true) {
        return (<div className={styles.container}>

            <table className={styles.users} >
                <tbody >
                    <tr>
                        <th  >User</th ><th >Role</th><th >Change role</th>
                    </tr>
                    {users ? users.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>
                                    {user.role}
                                </td>
                                <td>

                                    <select name={user._id} onChange={(e) => handleRole(e)}>
                                        <option >select role</option>
                                        <option value="basic">basic user</option>
                                        <option value="health">health</option>
                                        <option value="admin">admin</option>
                                    </select>

                                </td>
                            </tr>)
                    }) : null}
                </tbody>
            </table>

            <button className={styles.savechanges} onClick={() => handleSave()}>save changes</button>
            <h4>{statustxt}</h4>
        </div >)

    }
    else {
        return (<div>Invalid entry</div>)
    }
}
export default ManageUsers;
