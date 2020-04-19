import React from "react";
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Router from "next/router";
import Link from 'next/link';
import {TextField} from "formik-material-ui";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import {styles} from "./styles";
import Error from "../ErrorMessage";
import Progress from "../Progress/Progress";
import { CURRENT_USER_QUERY } from "../Nav/Nav";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signUp(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const Signup = () => {
    const classes = styles();
    const [signUp, {loading, error}] = useMutation(SIGNUP_MUTATION);
    return(
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Formik
                    initialValues={{
                        email: "",
                        name: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required("Name is required"),
                        email: Yup.string()
                            .email("Email is invalidd")
                            .required("Email is required"),
                        password: Yup.string()
                            .min(8, "Password must contain at least 8 characters")
                            .required("Enter your password"),
                        confirmPassword: Yup.string()
                            .required("Confirm your password")
                            .oneOf([Yup.ref("password")], "Password does not match")
                    })}
                    onSubmit={async (values, {resetForm}) => {
                        const res = await signUp({
                            variables: { ...values },
                            refetchQueries: [{ query: CURRENT_USER_QUERY }],
                        });

                        resetForm();
                        await Router.push({
                            pathname: '/login',
                        });

                        //TODO disable reset button
                        //TODO styles errors
                    }}>
                    {({values, isValid}) => {
                        return (
                            <Form>
                                <Error error={error} />
                                {loading && <Progress />}
                                <Typography variant="h4" component="h2" align="center" className={classes.item}>
                                    Create your Profile
                                </Typography>
                                <Field
                                    label="First Name"
                                    name="name"
                                    type="text"
                                    component={TextField}
                                    margin="none"
                                    fullWidth
                                />
                                <Field
                                    label="Your Email"
                                    name="email"
                                    type="text"
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                />
                                <Field
                                    label="Your Password"
                                    name="password"
                                    type="text"
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                />
                                <Field
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="text"
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                />

                                <div className={classes.btnWrap}>
                                    <Button
                                        type="reset"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Reset
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary" disabled={!isValid || values.name === ""} >
                                        Sign Up
                                    </Button>
                                </div>
                                <Typography align="right">You have account?
                                    <Link
                                        prefetch
                                        href={{
                                            pathname: '/login',
                                        }}
                                    >
                                        <a className={classes.loginLink}>Login</a>
                                    </Link>
                                </Typography>
                            </Form>
                        )
                    }}
                </Formik>
            </Paper>
        </div>
    )
};

export default Signup;
export { SIGNUP_MUTATION };