import {Formik, Form} from "formik";
import * as Yup from 'yup';
import InputFieldFormik from './InputFieldFormik';

export default function DeliveryOptionForm({deliveryOptions, deliveryOption, onSubmit}) {

    const validationSchemaTable = Yup.object({
        tableNumber: Yup.number()
            .positive("Number must be positive")
            .integer("Must be an integer")
            .min(1, "Minimum table number is 1")
            .max(5, "There are 5 tables available")
            .required("Table Number is required"),
    });

    const validationSchemaAddress = Yup.object({
        streetName: Yup.string().min(4, "Street Name must be at least 4 characters long").max(100,"Street Name can't be longer than 100 characters").required("Street Name is required"),
        houseNumber: Yup.number("Must be a number").positive("House Number must be positive").integer("House Number must be an integer").min(1).max(100).required("House Number is required"),
        apartmentNumber: Yup.number("Must be a number").positive("Apartment Number must be positive").integer("Apartment Number must be an integer").min(1).max(100).required("Apartment Number is required"),
    });

    return (
        <div className="mt-4">
            {deliveryOption === deliveryOptions.DINE_IN && (
                <Formik
                    initialValues={{ tableNumber: 1 }}
                    validationSchema={validationSchemaTable}
                    onSubmit={onSubmit}
                >
                    {() => (
                        <Form className="space-y-4">
                            <InputFieldFormik name="tableNumber" label="Table Number" type="number" />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                        </Form>
                    )}
                </Formik>
            )}

            {deliveryOption === deliveryOptions.DELIVERY && (
                <>
                <h2>(Only within the city)</h2>
                <Formik
                initialValues={{
                        streetName: "",
                        houseNumber: "",
                        apartmentNumber: "",
                    }}
                    validationSchema={validationSchemaAddress}
                    onSubmit={onSubmit}
                >
                    {() => (
                        <Form className="space-y-4">
                            <InputFieldFormik name="streetName" label="Street Name" type="text" />
                            <InputFieldFormik name="houseNumber" label="House Number" type="text" />
                            <InputFieldFormik name="apartmentNumber" label="Apartment Number" type="text" />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                        </Form>
                    )}
                </Formik>
                </>
            )}
        </div>
    );

}