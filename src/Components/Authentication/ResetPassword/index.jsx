import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import GeneratePassword from "./GeneratePassword";
import Otp from "./Otp";

const ResetPassword = ({ setToggle }) => {
  const [email, setEmail] = useState();
  const [display, setDisplay] = useState(1);
  const [message, setMessage] = useState();

  console.log(display);

  if (display === 1) {
    return (
      <ForgotPassword
        setDisplay={setDisplay}
        setToggle={setToggle}
        setMessage={setMessage}
        email={email}
        setEmail={setEmail}
      />
    );
  }
  if (display === 2) {
    return <Otp setDisplay={setDisplay} message={message} email={email} />;
  }
  if (display === 3) {
    return <GeneratePassword />;
  }

  return <p>amresh</p>;
};

export default ResetPassword;
