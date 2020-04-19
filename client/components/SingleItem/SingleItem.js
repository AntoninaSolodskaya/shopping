import React from "react";
import gql from 'graphql-tag';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {styles} from "./styles";
import Error from '../ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            category
            description
            largeImage
        }
    }
`;

const SingleItem = ({ id }) => {
    const classes = styles();
    const {data, error, loading} = useQuery(SINGLE_ITEM_QUERY, {
        variables: {id},
    });

    if (error) return <Error error={error}/>;
    if (loading) return <p>Loading...</p>;
    if (!data.item) return <p>No Item Found for {id}</p>;
    const item = data.item;

    return (
        <>
            <Head>
                <title>Shopping | {item.title}</title>
            </Head>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item lg={6}>
                        <div className={classes.paper}>
                            <img src={item.largeImage} alt={item.title} className={classes.image}/>
                        </div>
                    </Grid>
                    <Grid item lg={6}>
                        <div className={classes.paper}>
                            <Typography variant="h2">Viewing {item.title}</Typography>
                            <Typography variant="h6">Category: {item.category}</Typography>
                            <Typography variant="subtitle1">{item.description}</Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
};

export default SingleItem;
