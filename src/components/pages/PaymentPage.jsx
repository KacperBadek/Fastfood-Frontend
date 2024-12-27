import {useContext} from "react";
import InputFieldFormik from "../InputFieldFormik.jsx";
import {GlobalContext} from "../../GlobalContext.jsx";
import {Formik, Form} from "formik";
import * as Yup from 'yup';

export default function PaymentPage() {

    const {generatePayment} = useContext(GlobalContext);
    const paymentOptions = [
        { label: "Cash", value: "CASH" },
        { label: "Credit Card", value: "CREDIT_CARD" },
        { label: "Blik", value: "BLIK" },
    ];


    const validationSchema = Yup.object({
        category: Yup.string().required("Payment type is required"),
        cardNumber: Yup.string().when("category", {
            is: "Credit Card",
            then: () => Yup.string()
                .matches(/^\d{16}$/, "Credit card number must be 16 digits long")
                .required("Credit card number is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
        blikNumber: Yup.string().when("category", {
            is: "Blik",
            then: () => Yup.string()
                .matches(/^\d{6}$/, "Blik code must be 6 digits long")
                .required("Blik card number is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
    })

    const handleSubmit = (values, {resetForm}) => {
        console.log(values.category)
        const paymentData = {
            orderId: "676eab64c154fe500351611d",
            paymentMethod: values.category
        }
        generatePayment(paymentData);
        resetForm();
    }

    return (
        <div>
            <h1>Payment</h1>
            <Formik
                initialValues={{
                    category: "",
                    cardNumber: "",
                    blikNumber: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>

                {({values}) => (
                    <Form>
                        <InputFieldFormik name="category" label="Type" type="select"
                                          options={paymentOptions}/>

                        {values.category === "CREDIT_CARD" && (
                            <InputFieldFormik name="cardNumber" label="Credit Card Number" type="text"/>
                        )}

                        {values.category === "BLIK" && (
                            <InputFieldFormik name="blikNumber" label="Blik Number" type="text"/>
                        )}

                        <button type="Submit">Confirm</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}