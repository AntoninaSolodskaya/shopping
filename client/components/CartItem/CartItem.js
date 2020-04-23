import React from "react";
import PropTypes from 'prop-types';

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";

import { styles } from "./styles";
import RemoveFromCart from "../RemoveFromCart";
import formatMoney from "../../lib/formatMoney";

const CartItem = ({ cartItem }) => {
    const classes = styles();
    if (!cartItem.item)
        return (
            <Card>
                <Typography variant="subtitle1">This Item has been removed</Typography>
                <RemoveFromCart id={cartItem.id} />
            </Card>
        );
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar variant="rounded" className={classes.image} src={cartItem.item.image} alt={cartItem.item.title} />
            </ListItemAvatar>
            <ListItemText
                primary={cartItem.item.title}
                secondary={
                    <Typography>
                        {formatMoney(cartItem.item.price * cartItem.quantity)}
                        {' - '}
                        <em>
                            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
                        </em>
                    </Typography>}
                className={classes.item}
            />
            <RemoveFromCart id={cartItem.id} />
        </ListItem>
    )
};

CartItem.propTypes = {
    cartItem: PropTypes.object.isRequired,
};

export default CartItem;