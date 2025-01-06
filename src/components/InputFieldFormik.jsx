import {ErrorMessage, Field} from "formik";

export default function InputFieldFormik({label, name, type, options, handleFocus}) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block font-medium mb-1">{label}</label>
            {type === "select" ? (
                <Field as="select" name={name} className="w-56 px-1 py-1 rounded">
                    <option value="" disabled>Choose option</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Field>
            ) : (
                <Field name={name} type={type} onFocus={handleFocus} placeholder={label.toLowerCase()} className="w-64 px-1 py-1 rounded"/>
            )}
            <ErrorMessage name={name} component="div" className="error"/>
        </div>
    );
}