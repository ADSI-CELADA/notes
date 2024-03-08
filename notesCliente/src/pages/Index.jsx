import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { signIn } from "../api/api"
import { UsersContext } from '../context/UserContext'
import Swal from "sweetalert2"
import Cookies from "universal-cookie"


export const Index = () => {

    const cookies = new Cookies
    let name = cookies.get("user")

    const navigate = useNavigate()
    const [login, setLogin] = useState(false)

    const dataUser = useContext(UsersContext)

    const { user, setUser } = dataUser

    const removeToken = () => {
        localStorage.removeItem("token")
        if (name) {
            cookies.remove("user")
            window.location.href = "/"
        }
    }



    useEffect(() => {
        removeToken()
    }, [])

    return (
        <>
            <main>
                <div className='form-index'>
                    <h2> Login </h2>
                    <Formik initialValues={{
                        name: "",
                        password: ""
                    }}
                        validate={values => {
                            const errors = {}
                            if (!values.name) {
                                errors.name = 'Required'
                            } else if (!values.password) {
                                errors.password = 'Required'
                            }
                            return errors
                        }}

                        onSubmit={async (values) => {
                            let response = await signIn(values)
                            let { data: {
                                data, user, token
                            } } = response
                            console.log(response);
                            if (data == "OK") {
                                await Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'OK!!',
                                    showConfirmButton: false,
                                    timer: 1500,
                                })
                                setLogin(true)
                                localStorage.setItem("token", token)
                                setUser(user)
                                cookies.set("user", user[0].name, { path: "/" })
                                navigate("AppNotes")
                            } else if (data == "USER_NOT_FOUND") {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'warning',
                                    title: 'User not found!',
                                    showConfirmButton: false,
                                    timer: 1500,
                                })
                            } else if (data == "ERROR_PASSWORD") {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: 'Password Incorrect',
                                    showConfirmButton: false,
                                    timer: 1500,
                                })
                            }
                        }}
                    >

                        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder='name'
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                {errors.name && touched.name && errors.name}
                                <input
                                    type="password"
                                    name='password'
                                    placeholder='password'
                                    onChange={handleChange}
                                />
                                {errors.password && touched.password && errors.password}
                                <button type="submit">
                                    {isSubmitting ? 'Login...' : 'Login!'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <Link className='redirect' to="/register">
                        You do not have an account? Sign up
                    </Link>
                </div>
            </main>
        </>
    )
}
