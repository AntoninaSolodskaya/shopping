import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import Button from "@material-ui/core/Button";

import { CURRENT_USER_QUERY } from "./Nav/Nav";

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: { id },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    return (
        <Button size="small" color="primary" onClick={addToCart} disabled={loading}>
            Add{loading && 'ing'} To Cart
        </Button>
    )
}

export default AddToCart;