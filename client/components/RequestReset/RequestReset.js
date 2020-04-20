import React from "react";
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
import Error from "../ErrorMessage";
import Progress from "../Progress/Progress";

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`;

const RequestReset = () => {
    const classes = styles();
    const [reset, { error, loading, called }] = useMutation(REQUEST_RESET_MUTATION);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email("Email is invalid")
                            .required("Email is required"),
                    })}
                    onSubmit={async (values, { resetForm }) => {
                        const res = await reset({
                            variables: { ...values },
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
                                {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
                                <Typography variant="h4" component="h2" align="center" className={classes.item}>
                                    Request a password reset
                                </Typography>
                                <Field
                                    label="Your Email"
                                    name="email"
                                    type="text"
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                />
                                <div className={classes.btnWrap}>
                                    <Button type="submit" variant="contained" color="primary" disabled={values.email === ""} >
                                        Request Reset!
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

export default RequestReset;