import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Names from "./NameInput";
import Contact from "./Contact";
import Review from "./Review";
import Submit from "./Submit";

import "../styles.css";
import Location from "./Phone";

const steps = [
  { id: "names" },
  { id: "address" },
  { id: "contact" },
  { id: "review" },
  { id: "submit" }
];

const defaultData = {
  firstName: "",
//   lastName: "Doe",
//   nickName: "Jan",
  address: " ",
//   city: "",
//   state: "",
//   zip: "",
  email: "",
  phone: ""
};

const MultiStepForm = ({ images }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "names":
      return <Names {...props} />;
    case "address":
    return <Location {...props}/>;
    case "contact":
      return <Contact {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;
