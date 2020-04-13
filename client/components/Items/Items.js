import React from "react";
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

import Item from "../Item/Item";
import {styles} from "./styles";
import Grid from "@material-ui/core/Grid";

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title
            description
            price
            image
            largeImage
            amount
        }
    }
`;

const Items = () => {
    const classes = styles();
    const {loading, error, data} = useQuery(ALL_ITEMS_QUERY);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {data.items.map(item =>
                    <Grid item lg={4} key={item.id} className={classes.itemWrap}>
                        <Item item={item} />
                    </Grid>
                )}
            </Grid>
        </div>

    );
};

export default Items;