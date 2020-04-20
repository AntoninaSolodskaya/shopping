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
                            <Link href="/sell">
                                <a className={classes.title}>Sell</a>
                            </Link>
                            <Link href="/orders">
                                <a className={classes.title}>Orders</a>
                            </Link>
                            <Link href="/me">
                                <a className={classes.title}>Account</a>
                            </Link>

                            <Box className={classes.box}>
                                <AccountCircleIcon className={classes.margin}/>
                                <Typography>{data.user.name}</Typography>
                            </Box>

                            <Button variant="contained" color="primary" disableElevation onClick={signout => signOut(signout)}>Logout</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Nav;
export {CURRENT_USER_QUERY};