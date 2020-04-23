import React, {useEffect, useState} from 'react';
import Link from "next/link";
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/react-hooks";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import {styles} from "./styles";
import Cart from "../Cart/Cart";
import SortItems from "../SortItems/SortItems";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;

const CURRENT_USER_QUERY = gql`
    query {
        user {
            id
            email
            name
            permissions
            cart {
                id
                quantity
                item {
                    id
                    price
                    image
                    title
                    description
                    amount
                    category
                }
            }
        }
    }
`;

const Nav = () => {
    const classes = styles();

    const [signOut] = useMutation(SIGN_OUT_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
    if (loading) return <span>Loading...</span>
    if (error) return <span>Error loading</span>

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.linkWrap}>
                    <Link href="/items">
                        <a className={classes.title}>Items</a>
                    </Link>
                    {!data.user && (
                        <Link href="/signup">
                            <a className={classes.title}>Signup</a>
                        </Link>
                    )}
                    {data.user && (
                        <>
                            <SortItems />
                            <Link href="/sell">
                                <a className={classes.title}>Sell</a>
                            </Link>
                            <Link href="/orders">
                                <a className={classes.title}>Orders</a>
                            </Link>
                            <Link href="/permissions">
                                <a className={classes.title}>Account</a>
                            </Link>

                            <Box className={classes.box}>
                                <AccountCircleIcon className={classes.margin}/>
                                <Typography>{data.user.name}</Typography>
                            </Box>

                            <Button variant="contained" color="primary" disableElevation onClick={signout => signOut(signout)}>Logout</Button>
                            <Cart user={data.user}/>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Nav;
export {CURRENT_USER_QUERY};