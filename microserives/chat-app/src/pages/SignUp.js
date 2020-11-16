import React, { Component } from "react";
import Input from "../components/Input";
import { registerService } from "../services/endpoints";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Link } from "react-router-dom";
import { Routes } from "../Router";
import { notifySuccess } from "../plugins/notify";

class SignUp extends Component {
    state = {
        companies: [],
        rememberMe: false
    };

    initialValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    };

    SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
        firstName: yup
            .string()
            .required("First name is required"),
        lastName: yup
            .string()
            .required("Last name is required"),
        email: yup
            .string()
            .email('Email should be valid email').required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
    });

    attemptSignUp = (payload) => {
        registerService(payload)
            .then(res => {
                if (res.status === 201) {
                    notifySuccess('Sign up completed successfully');
                    this.props.history.push('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    render() {
        return (
            <>
                <Formik
                    initialValues={this.initialValues}
                    validationSchema={this.SIGNUP_VALIDATION_SCHEMA}
                    onSubmit={this.attemptSignUp}
                >
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="firstName"
                                           label="First name"
                                           placeholder="Enter first name" />
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="lastName"
                                           label="Last name"
                                           placeholder="Enter Last name" />
                                </div>
                            </div>


                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="email"
                                           label="Email"
                                           placeholder="Enter Email" />
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="password"
                                           label="Password"
                                           type="password"
                                           placeholder="Enter password" />
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <button onClick={formik.handleSubmit}
                                            type="submit"
                                            className="btn btn-info float-right">Sign up</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10 col-md-6 d-flex align-items-center">
                        <div>Already have account, go to</div>
                        <Link to={Routes.Login}>
                            <button className="btn btn-link float-right">Login</button>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

export default SignUp
