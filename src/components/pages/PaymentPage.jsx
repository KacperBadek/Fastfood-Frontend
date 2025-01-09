import InputFieldFormik from "../InputFieldFormik.jsx";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import {createOrderObject} from "../../utils/OrderUtils";
import {useSessionUtils} from "../../utils/SessionUtils.jsx"
import {generatePayment, createOrder} from "../../http/api.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {GlobalContext} from "../../GlobalContext.jsx";

export default function PaymentPage() {

    const {state} = useContext(GlobalContext);
    const {orderItems, deliveryOption, tableNumber, deliveryAddress} = state;
    const {restartSessionWithNavigate} = useSessionUtils();
    const [errorMessage, setErrorMessage] = useState("");
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
            paymentMethod: values.category
        }
        const newOrder = createOrderObject({
            deliveryOption,
            deliveryAddress,
            tableNumber,
            orderItems,
        });

        try {
            await createOrder(newOrder);
            await generatePayment(paymentData);
            resetForm();
            navigate("/order-confirmation")
        } catch (error) {
            if (error.response && error.response.status === 403) {
                await restartSessionWithNavigate();
            }
            setErrorMessage("Oops, there was an error. Try again later.");
        }
    }

    const handleCancel = async () => {
        try {
            await restartSessionWithNavigate();
        } catch (error) {
            console.log("Can't cancel order", error);
        }
    }

    if (errorMessage) return <div className="text-center">{errorMessage}</div>;

    return (
        <div className="text-center justify-center items-center">
            <h1 className="pb-3">Payment</h1>
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
                        <InputFieldFormik name="category" label="" type="select"
                                          options={paymentOptions}/>

                        {values.category === "CREDIT_CARD" && (
                            <InputFieldFormik name="cardNumber" label="Credit Card Number" type="text"/>
                        )}

                        {values.category === "BLIK" && (
                            <InputFieldFormik name="blikCode" label="Blik Code" type="text"/>
                        )}

                        <button type="Submit"
                                className="bg-blue-600 mx-2 text-white rounded hover:bg-blue-700">Confirm
                        </button>
                        <button type="button" onClick={handleCancel}
                                className="bg-red-600 mx-2 text-white rounded hover:bg-red-700">Cancel Order
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}