import { Formik, Form } from "formik"
import { Link, } from "react-router-dom"
import Swal from "sweetalert2"
import { signUp } from "../api/api"

export const Register = () => {
    return (
        <>
            <main>
                <div className="form-index">
                    <h2> Register </h2>
                    <Formik initialValues={{
                        name: "",
                        password: ""
                    }}
                        validate={values => {
                            const errors = {}
                            if (!values.name) {
                                errors.name = 'Required'
                            }

                            if (!values.password) {
                                errors.password = 'Required'
                            }
                            return errors
                        }}

                        onSubmit={async (values) => {
                            let response = await signUp(values)
                            let { data: {
                                data
                            } } = response
                            console.log(data);
                            if (data == "INSERT_OK") {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'SignIn Ok!',
                                    showConfirmButton: false,
                                    timer: 1500,
                                })
                                window.location.replace('/')
                            } else if (data == "ERROR!!") {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'warning',
                                    title: 'User already exists!',
                                    showConfirmButton: false,
                                    timer: 1500,
                                })
                            }
                        }}
                    >

                        {({ errors, touched, values, handleChange, handleSubmit, isSubmitting }) => (
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
                                    {isSubmitting ? 'Register...' : 'Register!'}
                                </button>
                            </Form>
                        )}

                    </Formik>
                    <Link to="/">
                        Do you have an account? login!
                    </Link>
                </div>
            </main>
        </>
    )
}
