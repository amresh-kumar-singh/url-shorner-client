import { lazy, useState } from "react";
// import ForgotPassword from "./ForgotPassword";
// import GeneratePassword from "./GeneratePassword";
// import Otp from "./Otp";
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const GeneratePassword = lazy(() => import("./GeneratePassword"));
const Otp = lazy(() => import("./Otp"));

const ResetPassword = ({ setToggle }) => {
  const [email, setEmail] = useState();
  const [display, setDisplay] = useState(1);
  const [message, setMessage] = useState();
  const [otp, setOtp] = useState();

  // console.log(display);

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
    return (
      <Otp
        setDisplay={setDisplay}
        setOtp={setOtp}
        message={message}
        email={email}
        otp={otp}
      />
    );
  }
  if (display === 3) {
    return <GeneratePassword email={email} otp={otp} />;
  }

  return <p>Somthing happaned Please refresh </p>;
};

export default ResetPassword;
