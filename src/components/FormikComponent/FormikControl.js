/** @format */

import { useField } from "formik";

import styles from "./Formik.module.scss";

const FormikControl = ({ label, children, control = "input", ...props }) => {
  const [field, meta] = useField(props);

  const FormikField = {
    input: "input",
    textarea: "textarea",
    select: "select",
    datalist: "datalist",
    meter: "meter",
    output: "output",
    progress: "progress",
  }[control];

  return (
    <fieldset className={styles.fieldset}>
      <legend style={{ color: "gray" }}>{label}</legend>
      <label htmlFor={props.id || props.name}>
        {FormikField === "select" ? (
          <FormikField {...field} {...props}>
            {children}
          </FormikField>
        ) : (
          <>
            <FormikField {...field} {...props} className="w-full p-2 rounded-md border-gray-300 outline-0 mb-5" />
            {children}
          </>
        )}
      </label>
      {meta.error && meta.touched && <div className={styles.error}>{meta.error}</div>}
    </fieldset>
  );
};

export default FormikControl;
