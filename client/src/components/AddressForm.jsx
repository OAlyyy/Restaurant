import { useDispatch } from "react-redux";
import { setAddress } from "../store/userInfo/addressSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const AddressForm = ({ onTabSwitch }) => {

 
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(setAddress(data));
    onTabSwitch("Payment");
  };

  const initialValues = {
    streetAddress: "",
    cityyy: "",
    countryy: "",
    postalCode: "",
  };

  const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().min(3).max(15).required(),
    cityyy: Yup.string().min(4).max(20).required(),
    countryy: Yup.string().min(4).max(20).required(),
    postalCode: Yup.string().min(4).max(20).required(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <div className="addressContainertitle"> Address Form </div>

          <label>Street Address</label>
          <ErrorMessage name="Street Address" component="span" />
          <Field
            id="street address"
            name="streetAddress"
            type="text"
            placeholder="Street Address"
          />

          <label>City</label>
          <ErrorMessage name="City" component="span" />
          <Field
            id="city"
            name="cityyy"
            type="text"
            placeholder="City Name. Ex. Cairo"
          />

          <label>Country</label>
          <ErrorMessage name="Country" component="span" />
          <Field
            id="country"
            name="countryy"
            type="text"
            placeholder="Country Name. Ex. Egypt"
          />

          <label> Postal Code</label>
          <ErrorMessage name="Postal Code" component="span" />
          <Field
            id="postal code"
            name="postalCode"
            type="text"
            placeholder="Postal Code"
          />

        </Form>
      </Formik>
    </div>
  );
};
