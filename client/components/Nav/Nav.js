import React from 'react';
import Link from "next/link";

import { styles } from "./styles";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const Nav = () => {
    const classes = styles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.linkWrap}>
                    <Link href="/items">
                        <a className={classes.title}>Items</a>
                    </Link>
                    <Link href="/sell">
                        <a className={classes.title}>Sell</a>
                    </Link>
                    <Link href="/signup">
                        <a className={classes.title}>Signup</a>
                    </Link>
                    <Link href="/orders">
                        <a className={classes.title}>Orders</a>
                    </Link>
                    <Link href="/me">
                        <a className={classes.title}>Account</a>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Nav;