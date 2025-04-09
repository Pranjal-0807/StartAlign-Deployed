import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../dumbComponents/Button";
import Dropdowns from "../../dumbComponents/Dropdowns";
import InputFields from "../../dumbComponents/InputFields";
import { setError, setLoading, setUser } from "../../store/slices/authSlice";
import Loader from "../../dumbComponents/Loader";
import {
  signupFormData,
  loginFormData,
  signupFormDropdownDetails,
} from "../../utils/constants";

const Account = () => {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.auth.loading);

  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(null));
    dispatch(setLoading(true));
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL_AUTH_SERVER}/auth/${login ? "login" : "signup"
        }`,
        data
      )
      .then((response) => {
        if (login) {
          const { accessToken, refreshToken } = response?.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          axios
            .post(`${import.meta.env.VITE_BASE_URL_AUTH_SERVER}/auth/user`, {
              token: refreshToken,
            })
            .then((response) => dispatch(setUser(response?.data?.user)))
            .catch((error) => console.log(error));

          navigate("/projects");
        } else {
          setLogin(true);
        }
      })
      .catch((error) =>
        setError(error?.response?.data?.message || "An error occurred")
      )
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <form
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 animate-fadeIn"
          onSubmit={handleSubmit}
        >
          <UpperLoginSignupPrompt login={login} />

          <InputFields
            inputFieldDetails={login === false ? signupFormData : loginFormData}
          />

          {login === false && (
            <Dropdowns dropdownDetails={signupFormDropdownDetails} />
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <LowerLoginSignupPrompt login={login} setLogin={setLogin} />
        </form>
      </div>
    </>
  );
};

export default Account;

const UpperLoginSignupPrompt = ({ login }) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-800">
        {login === false ? "Create an Account" : "Log in to your account"}
      </h2>

      <p className="text-center text-gray-500">
        {login === false
          ? "Join us today! It takes only a few steps."
          : "Welcome back!"}
      </p>
    </>
  );
};

const LowerLoginSignupPrompt = ({ login, setLogin }) => {
  return (
    <>
      <Button btnText={login === false ? "Sign Up" : "Log In"} type="submit" />
      <p className="text-center text-gray-600" onClick={() => setLogin(!login)}>
        {login === false
          ? "Already have an account?"
          : "Don't have an account?"}
        <span className="text-blue-500 hover:underline font-bold  cursor-pointer">
          {login === false ? " Log In" : " Sign Up"}
        </span>
      </p>
    </>
  );
};

// import { signupUser, loginUser } from "../../store/slices/authSlice";
// if (login === false) {
//   const res = await dispatch(signupUser(data));
//   if (signupUser.fulfilled.match(res)) {
//     setLogin(true);
//   }
// } else {
//   const res = await dispatch(loginUser(data));
//   if (loginUser.fulfilled.match(res)) {
//     navigate("/projects");
//   }
// }
