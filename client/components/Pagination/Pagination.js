import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Head from 'next/head';
import Link from 'next/link';

import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import {perPage} from '../../config';
import {styles} from "./styles";

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;

const Pagination = ({page}) => {
    const classes = styles();
    const {loading, error, data} = useQuery(PAGINATION_QUERY);
    if (loading) return <p>Loading...</p>;
    const count = data.itemsConnection.aggregate.count;
    const pages = Math.ceil(count / perPage);

    return (
        <div className={classes.block}>
            <Grid container spacing={3} className={classes.wrap}>
                <Head>
                    <title>
                        Shopping — Page {page} of {pages}
                    </title>
                </Head>
                <div className={classes.pagination}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ChevronLeftIcon />}
                        >
                            <Link
                                href={{
                                    pathname: 'items',
                                    query: {page: page - 1},
                                }}
                            >
                                <a aria-disabled={page <= 1} className={classes.prev}>Prev</a>
                            </Link>
                        </Button>
                        <Button>Page {page} of {pages}!</Button>
                        <Button>{count} Items Total</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<ChevronRightIcon />}
                        >
                            <Link
                                href={{
                                    pathname: 'items',
                                    query: {page: page + 1},
                                }}
                            >
                                <a className={classes.prev} aria-disabled={page >= pages}>
                                    Next
                                </a>
                            </Link>
                        </Button>
                    </ButtonGroup>
                </div>
            </Grid>
        </div>
    );
}

export default Pagination;