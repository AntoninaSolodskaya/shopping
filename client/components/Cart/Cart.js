import React from "react";
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/react-hooks";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { styles } from "./styles";
import CartItem from "../CartItem/CartItem";
import formatMoney from "../../lib/formatMoney";
import calcTotalPrice from "../../lib/calcToPrice";
import Checkout from "../Checkout/Checkout";

const LOCAL_STATE_QUERY = gql`
    query {
        cartOpen @client
    }
`;

const TOGGLE_CART_MUTATION = gql`
    mutation {
        toggleCart @client
    }
`;

const Cart = ({ user }) => {
    const classes = styles();

    const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
    const { data, loading, error } = useQuery(LOCAL_STATE_QUERY);

    if (loading) return <span>Loading...</span>
    if (error) return <span>Error loading</span>
    if (!user) return null;

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
        >
            <Box className={classes.header}>
                <Typography variant="h4" className={classes.title} align="center">
                    {user.name}'s Cart
                </Typography>
                <Button onClick={toggleCart} title="close">
                    &times;
                </Button>
            </Box>
            <Divider />
            <Typography variant="h6" className={classes.title} align="center">
                You Have {user.cart.length} Item {user.cart.length === 1 ? '' : 's'} in your cart.
            </Typography>
            {user.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
            <Divider />
            <Box className={classes.footer}>
                <Typography variant="h6" align="center" className={classes.title}>
                    {formatMoney(calcTotalPrice(user.cart))}
                </Typography>
                <div>
                {user.cart.length && (
                    <Checkout />    
                )} 
                </div>
            </Box>
        </div>
    );

    return (
        <div>
            <Button variant="contained" color="primary" disableElevation onClick={toggleCart}>
                Cart
                <Badge badgeContent={user.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} color="secondary">
                    <ShoppingCartIcon className={classes.icon}/>
                </Badge>
            </Button>

            <SwipeableDrawer
                anchor="right"
                open={data.cartOpen}
                onClose={toggleCart}
                onOpen={toggleCart}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };