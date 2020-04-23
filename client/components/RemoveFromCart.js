import React from "react";
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {useMutation, useQuery} from "@apollo/react-hooks";

import Button from "@material-ui/core/Button";

import { CURRENT_USER_QUERY } from './Nav/Nav';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = ({ id }) => {
    const [removeFromCart, {loading}] = useMutation(REMOVE_FROM_CART_MUTATION, {
        variables: { id },
        update(cache, payload) {
            console.log('Running remove from cart update fn');
            // 1. first read the cache
            const data = cache.readQuery({ query: CURRENT_USER_QUERY });
            console.log(data);
            // 2. remove that item from the cart
            const cartItemId = payload.data.removeFromCart.id;
            data.user.cart = data.user.cart.filter(cartItem => cartItem.id !== cartItemId);
            // 3. write it back to the cache
            cache.writeQuery({ query: CURRENT_USER_QUERY, data });
        },
        optimisticResponse: {
        __typename: 'Mutation',
            removeFromCart: {
                __typename: 'CartItem',
                id,
            }
        },
    });

    return (
        <Button
            disabled={loading}
            onClick={() => {
                removeFromCart().catch(err => alert(err.message));
            }}
            title="Delete Item"
        >
            &times;
        </Button>
    )
};

RemoveFromCart.propTypes = {
    id: PropTypes.string.isRequired,
};

export default RemoveFromCart;