import { Form, Formik, useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  forgatePasswordAction,
  GoogleLoginAction,
  LoginAction,
  SignupAction,
} from "../Redux/Action/Auth.Action";

function Auth(props) {
  const [usertype, setusertype] = useState("login");
  const [reset, setreset] = useState(false);
  const dispatch = useDispatch();

  let handleLogin = (values) => {
    console.log(values);
    dispatch(LoginAction(values));
  };

  let handlesignup = (values) => {
    console.log(values);
    dispatch(SignupAction(values));
  };

  let handlepassword = (values) => {
    dispatch(forgatePasswordAction(values));
  };

  let handleGooglelogin = () => {
    dispatch(GoogleLoginAction());
  };

  let login_set = {
    email: yup
      .string()
      .required("please enter email")
      .email("enter valid email"),
    password: yup.string().required("please enter password"),
  };

  let signup_set = {
    name: yup.string().required("please enter name"),
    email: yup
      .string()
      .required("please enter email")
      .email("enter valid email"),
    password: yup.string().required("please enter password"),
  };

  let reset_set = {
    email: yup
      .string()
      .required("please enter email")
      .email("enter valid email"),
  };

  let schema, initVal;

  if (usertype === "login" && !reset) {
    schema = yup.object().shape(login_set);
    initVal = {
      email: "",
      password: "",
    };
  } else if (usertype === "signup" && !reset) {
    schema = yup.object().shape(signup_set);
    initVal = {
      name: "",
      email: "",
      password: "",
    };
  } else if (reset) {
    schema = yup.object().shape(reset_set);
    initVal = {
      email: "",
    };
  }

  const formik = useFormik({
    initialValues: initVal,
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (usertype === "login" && !reset) {
        handleLogin(values);
      } else if (usertype === "signup" && !reset) {
        handlesignup(values);
      } else if (reset === true) {
        handlepassword(values);
      }
      resetForm();
    },
  });

  return (
    <section id="user" className="appointment">
      <div className="container">
        <div className="section-title">
          {reset === true ? (
            <h2 className="centered">Forgate Password</h2>
          ) : usertype === "login" ? (
            <h2 className="centered">login</h2>
          ) : (
            <h2 className="centered">Signup</h2>
          )}
        </div>
        <Formik value={formik}>
          <Form onSubmit={formik.handleSubmit} className="php-email-form">
            <div className="row align-items-center justify-content-center">
              {usertype === "login" ? null : (
                <div className="col-md-7 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p>{formik.errors.name}</p>
                  ) : (
                    ""
                  )}
                  <div className="validate" />
                </div>
              )}

              <div className="col-md-7 form-group mt-3 mt-md-0">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.emil ? (
                  <p>{formik.errors.email}</p>
                ) : (
                  ""
                )}
                <div className="validate" />
              </div>
              {reset === true ? null : (
                <div className="col-md-7 form-group mt-3 mt-md-0">
                  <input
                    type="tel"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p>{formik.errors.password}</p>
                  ) : (
                    ""
                  )}
                  <div className="validate" />
                </div>
              )}
            </div>
            <div className="text-center">
              {reset === true ? (
                <button type="submit">Forget Password</button>
              ) : usertype === "login" ? (
                <button type="submit">Login</button>
              ) : (
                <button type="submit">Signup</button>
              )}
              {reset === true ? (
                <div>
                  <span>already have an account ??</span> <br />
                  <button><a onClick={() => setreset(false)}> Login</a></button> <br />
                </div>
              ) : usertype === "login" ? (
                <div>
                  <span>Create a New Account ??</span> <br />
                 <button> <a onClick={() => setusertype("signup")}>Signup</a></button> <br />
                  <br />
                  <button><a onClick={() => setreset(true)}>Forget Password</a></button> 
                </div> 
              ) : (
                <div>
                  <span>already have an account ?</span> <br />
                  <button><a
                    onClick={() => {
                      setusertype("login");
                    }}
                  >
                    {" "}
                    Login
                  </a></button>
                </div>
              )}
              <br />
              {usertype === "login" ? (
                <button type="submit" onClick={() => handleGooglelogin()}>
                  Login with goggle
                </button>
              ) : null}
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default Auth;
