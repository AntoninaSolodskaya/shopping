import React from "react";
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

import Grid from "@material-ui/core/Grid";

import Item from "../Item/Item";
import {styles} from "./styles";
import {perPage} from "../../config";
import Pagination from "../Pagination/Pagination";

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        items(first: $first, skip: $skip) {
            id
            title
            price
            description
            image
            largeImage
            amount
        }
    }
`;

const Items = ({ page }) => {
    const classes = styles();
    const {loading, error, data} = useQuery(ALL_ITEMS_QUERY, {
        variables: {
            skip: page * perPage - perPage,
        }
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.wrap}>
                {data.items.map(item =>
                    <Grid item lg={4} key={item.id} className={classes.itemWrap}>
                        <Item item={item} />
                    </Grid>
                )}
            </Grid>
            <Pagination page={page} />
        </div>

    );
};

export default Items;
export {ALL_ITEMS_QUERY};