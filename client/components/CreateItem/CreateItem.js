import React, {useEffect} from "react";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import Router from 'next/router';
import {Formik, Field, Form, useFormik} from "formik";
import {TextField} from "formik-material-ui";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {styles} from "./styles";
import Error from '../ErrorMessage';
import Progress from "../Progress/Progress";

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
        $amount: Int
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
            amount: $amount
        ) {
            id
        }
    }
`;

const CreateItem = () => {
    const classes = styles();
    const [createItem, {loading, error}] = useMutation(CREATE_ITEM_MUTATION);
    const [state, setState] = React.useState({
        image: '',
        largeImage: '',
    });

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        price: "",
                        amount: "",
                        image: "",
                        files: []
                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().required("Title is required"),
                        description: Yup.string().required("Description is required"),
                        price: Yup.string().required("Price is required"),
                        amount: Yup.string().required("Amount is required"),
                        image: Yup.string().required("Image is required"),
                    })}
                    onSubmit={async (values, {resetForm}) => {

                        const res = await createItem({
                            variables: {
                                ...values
                            }
                        });

                        console.log("res", res)

                        resetForm();
                        await Router.push({
                            pathname: '/item',
                            query: {id: res.data.createItem.id},
                        });
                    }}
                    render={({values, setFieldValue}) => {
                        useEffect(
                            () => {
                                setState({...values, image: state.image})
                            },
                            [values, setState],
                        );

                        const uploadFile = async event => {
                            const files = event.currentTarget.files;
                            setFieldValue("file", files[0])
                            const data = new FormData();
                            data.append("file", files[0]);
                            data.append('upload_preset', 'shopping');

                            const res = await fetch('https://api.cloudinary.com/v1_1/dtjecxmwj/image/upload', {
                                method: 'POST',
                                body: data,
                            });
                            const file = await res.json();
                            setState({
                                ...state,
                                image: file.secure_url,
                                largeImage: file.eager[0].secure_url,
                            });
                        };

                        return (
                            <Form>
                                <Error error={error} />
                                {loading && <Progress />}
                                <Typography variant="h4" component="h2" align="center" className={classes.item}>
                                    Create your Sale Product
                                </Typography>
                                <Field
                                    label="First Name"
                                    name="title"
                                    type="text"
                                    component={TextField}
                                    margin="none"
                                    fullWidth
                                />
                                <Field
                                    label="Second Name"
                                    name="description"
                                    type="text"
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                />
                                <Field
                                    label="Amount"
                                    name="amount"
                                    type="number"
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                />
                                <Field
                                    label="Price"
                                    name="price"
                                    type="number"
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                />
                                <Field
                                    label="Upload image"
                                    name="image"
                                    id="image"
                                    type="file"
                                    component="input"
                                    onChange={uploadFile}
                                    margin="normal"
                                />
                                <Box className={classes.margin}>
                                    {state.image && (
                                        <img width="200" src={state.image} alt="Upload Preview"/>
                                    )}
                                </Box>
                                <Button type="submit" variant="outlined" color="primary">
                                    Register
                                </Button>
                                <Button type="reset" variant="outlined" color="secondary">
                                    Reset
                                </Button>
                            </Form>
                        )
                    }}
                >
                </Formik>
            </Paper>
        </div>
    )
};

export default CreateItem;
export {CREATE_ITEM_MUTATION};