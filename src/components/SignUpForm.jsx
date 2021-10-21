import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { onSubmit } from "./onSubmit";

export function SignUpForm() {
  const initialValues = useSelector((state) => state);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().min(2),
    password: yup.string().min(2),
  });

  const handleOnSubmit = (values, { setSubmitting }) => {
    onSubmit(values, { setSubmitting }, dispatch);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      <Form className="form">
        <h1>Sign Up</h1>
        <label>
          Email
          <Field className="input" name="email" type="eamil" />
        </label>
        <ErrorMessage className="error" name="email" component="div" />
        <label>
          Name
          <Field className="input" name="name" type="text" />
        </label>
        <ErrorMessage className="error" name="name" component="div" />
        <label>
          Password
          <Field className="input" name="password" type="password" />
        </label>
        <ErrorMessage className="error" name="password" component="div" />
        <button type="submit">Sign me up</button>
      </Form>
    </Formik>
  );
}
