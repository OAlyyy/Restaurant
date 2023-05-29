import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = async (data) => {
    const { username, password } = data;

    try {
      await createUserWithEmailAndPassword(auth, username, password);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label> Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              id="inputUsername"
              name="username"
              placeholder="(Ex. John123...)"
            />

            <label> Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              id="inputPassword"
              name="password"
              placeholder="Your Password ..."
            />

            <button type="submit"> Register </button>
          </Form>
        </Formik>
      </div>
   
  );
}

export default Register;
