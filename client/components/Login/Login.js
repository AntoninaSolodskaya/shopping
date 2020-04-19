import React from "react";
import Link from "next/link";
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Router from "next/router";
import {TextField} from "formik-material-ui";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Error from "../ErrorMessage";
import Progress from "../Progress/Progress";
import {styles} from "./styles";
import { CURRENT_USER_QUERY } from '../Nav/Nav';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            id
            email
            password
        }
    }
`;

const Login = () => {
    const classes = styles();
    const [signIn, {loading, error}] = useMutation(SIGNIN_MUTATION);

    return(
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email("Email is invalidd")
                            .required("Email is required"),
                        password: Yup.string()
                            .min(8, "Password must contain at least 8 characters")
                            .required("Enter your password"),
                    })}
                    onSubmit={async (values, { resetForm }) => {
                        const res = await signIn({
                            variables: { ...values },
                            refetchQueries: [{ query: CURRENT_USER_QUERY }],
                        });

                        resetForm();
                        await Router.push({
                            pathname: '/',
                        });

                        //TODO disable reset button
                    }}>
                    {({values}) => {
                        return (
                            <Form>
                                <Error error={error} />
                                {loading && <Progress />}
                                <Typography variant="h4" component="h2" align="center" className={classes.item}>
                                    Login to your Account
                                </Typography>
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
                                <div className={classes.btnWrap}>
                                    <Button
                                        type="reset"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Reset
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary" disabled={values.email === ""} >
                                        Sign In
                                    </Button>
                                </div>
                                <Typography align="right">You dont have an account?
                                    <Link
                                        href={{
                                            pathname: '/',
                                        }}
                                    >
                                        <a className={classes.loginLink}>SignUp</a>
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

export default Login;