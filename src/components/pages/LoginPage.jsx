import {useContext, useState} from "react";
import {GlobalContext} from "../../GlobalContext.jsx";
import InputFieldFormik from "../InputFieldFormik.jsx";
import {useNavigate} from "react-router-dom";
import {Formik, Form} from "formik";
import * as Yup from 'yup';

export default function LoginPage() {
    const {login} = useContext(GlobalContext);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    });

    const handleSubmit = async (values, {resetForm}) => {
        const userData = {
            email: values.email,
            password: values.password,
        }

        try {
            await login(userData);
            resetForm();
            setErrorMessage("");
            navigate("/sales")
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("Incorrect email or password.");
            } else {
                setErrorMessage("An error has occurred. Try again later.");
            }
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >

                {() => (
                    <Form>
                        <h1>Login</h1>
                        <InputFieldFormik name="email" label="Email" type="text"/>
                        <InputFieldFormik name="password" label="Password" type="password"/>
                        <button type="submit">Login</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}