import { Formik, Form } from 'formik'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UsersContext } from '../context/UserContext'
import axios from "axios"
import Cookies from "universal-cookie"

const serverUri = 'http://192.168.0.167:4000' || "http://192.168.0.104:4000"

const token = localStorage.getItem("token")



export const FormNotes = () => {

  let cookies = new Cookies

  let user = cookies.get("user")

  const navigate = useNavigate()


  const createNote = async (data) => {
    const response = await axios.post(`${serverUri}/newTask`, data, {
      headers: {
        token: token
      }
    })
    return response
  }

  return (
    <>
      {
        user ?
          <div className='form-index'>
            <h2> Create Note </h2>

            <Formik initialValues={{
              titulo: "",
              description: "",
            }}

              onSubmit={async (values) => {
                let response = await createNote(values)
                if (response.data.data == "INSERT_OK") {
                  navigate("/AppNotes")
                }
              }}
            >
              {({ isSubmitting, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name='titulo'
                    placeholder='Title'
                    onChange={handleChange}
                    autoComplete="off"
                  />

                  <input
                    type="text"
                    name='description'
                    placeholder='Description'
                    onChange={handleChange}
                  />
                  <button type="submit">
                    {isSubmitting ? 'Send...' : 'Send'}
                  </button>
                </Form>
              )}
            </Formik>

          </div>

          : user == undefined ? <h1> No login </h1> : null
      }
    </>
  )
}
