import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import Swal from "sweetalert2"
import Cookies from "universal-cookie"


const serverUri = 'http://192.168.0.167:4000' || "http://192.168.0.104:4000"


export const Notes = () => {

    const [tasks, setTasks] = useState([])

    const cookies = new Cookies

    let name = cookies.get("user")

    let tokenId = localStorage.getItem("token")

    const getNotes = async () => {
        let notes = await axios.get(`${serverUri}/tasks`, {
            headers: {
                token: tokenId
            }
        })
        setTasks(notes.data.tasks)
        return notes
    }

    const deleteTask = async (id) => {

        const response = await axios.delete(`${serverUri}/deleteTask/${id}`, {
            headers: {
                token: tokenId
            }
        })
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (response.data.data == "DELETE_OK") {
                    await Swal.fire('Saved!', '', 'success')
                    setTasks((task) => task.filter((item) => item._id !== id))
                } else {
                    await Swal.fire('Error Delete Task!', '', 'error')
                }
            }
        })
    }



    useEffect(() => {
        getNotes()
    }, [])

    return (
        <>
            {
                name ? <>
                    {
                        tasks.length > 0 ? tasks.map((notes) => {
                            return (
                                <>             
                                    <div key={notes._id}>
                                    <div class="card">
                                        <div class="title">  </div>
                                        <div class="features">
                                            <ul>
                                                <li><span> {notes.titulo} </span> </li>
                                                <li><span> {notes.description} </span> </li>
                                            </ul>
                                        </div>
                                        <button className='btn' onClick={() => {
                                            deleteTask(notes._id)
                                        }}> Eliminar </button>
                                    </div>
                                    </div>
                                </>
                            )
                        }) : <h2> No Tasks </h2>
                    }
                </> : <h1> No login </h1>
            }
        </>
    )
}
