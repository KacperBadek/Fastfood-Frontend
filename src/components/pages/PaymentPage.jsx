import InputFieldFormik from "../InputFieldFormik.jsx";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import {useSessionUtils} from "../../utils/SessionUtils.jsx"
import {generatePayment, cancelOrder} from "../../http/api.jsx";
import {useNavigate} from "react-router-dom";

export default function PaymentPage() {

    const {restartSession} = useSessionUtils();
    const navigate = useNavigate();

    const paymentOptions = [
        {label: "Cash", value: "CASH"},
        {label: "Credit Card", value: "CREDIT_CARD"},
        {label: "Blik", value: "BLIK"},
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

    const handleSubmit = async (values, {resetForm}) => {
        const paymentData = {
            sessionId: sessionStorage.getItem("sessionId"),
            paymentMethod: values.category
        }

        try {
            await generatePayment(paymentData);
            resetForm();
            navigate("/order-confirmation")
        } catch (error) {
            console.log("Payment error", error)
        }
    }

    const handleCancel = async () => {
        try {
            await cancelOrder(sessionStorage.getItem("sessionId"));
            restartSession();
        } catch (error) {
            console.log("Can't cancel order", error);
        }
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
                        <button type="button" onClick={handleCancel}>Cancel Order</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}