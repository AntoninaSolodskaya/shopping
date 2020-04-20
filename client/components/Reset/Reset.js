import React from "react";
import PropTypes from "prop-types";
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Router from "next/router";

import {TextField} from "formik-material-ui";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {styles} from "../Login/styles";
import { CURRENT_USER_QUERY } from '../Nav/Nav';
import Error from "../ErrorMessage";
import Progress from "../Progress/Progress";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

const Reset = ({ resetToken }) => {
    const classes = styles();
    const [reset, {loading, error}] = useMutation(RESET_MUTATION);
console.log(resetToken)
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Formik
                    initialValues={{
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema={Yup.object().shape({
                        password: Yup.string()
                            .min(8, "Password must contain at least 8 characters")
                            .required("Enter your password"),
                        confirmPassword: Yup.string()
                            .required("Confirm your password")
                            .oneOf([Yup.ref("password")], "Password does not match")
                    })}
                    onSubmit={async (values, { resetForm }) => {
                        const res = await reset({
                            variables: {
                                resetToken: resetToken,
                                password: values.password,
                                confirmPassword: values.confirmPassword,
                            },
                            refetchQueries: [{ query: CURRENT_USER_QUERY }],
                        });

                        resetForm();
                        // await Router.push({
                        //     pathname: '/',
                        // });

                        //TODO disable reset button
                    }}>
                    {({values}) => {
                        return (
                            <Form>
                                <Error error={error} />
                                {loading && <Progress />}
                                <Typography variant="h4" component="h2" align="center" className={classes.item}>
                                    Reset Password
                                </Typography>
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
                                    <Button type="submit" variant="contained" color="primary" disabled={values.password === ""} >
                                        Reset your password
                                    </Button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </Paper>
        </div>
    )
};

Reset.propTypes = {
    resetToken: PropTypes.string.isRequired,
};

export default Reset;