import {useState} from "react";
import InputFieldFormik from "../InputFieldFormik.jsx";
import {useNavigate} from "react-router-dom";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import {login} from '../../http/api.jsx'

export default function LoginPage() {

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
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-gray-600 rounded shadow-md">
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    {() => (
                        <Form className="space-y-6">
                            <h1 className="text-4xl text-center mb-4">Login</h1>
                            <InputFieldFormik name="email" label="Email" type="text" handleFocus={() => setErrorMessage("")}/>
                            <InputFieldFormik name="password" label="Password" type="password" handleFocus={() => setErrorMessage("")}/>
                            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}