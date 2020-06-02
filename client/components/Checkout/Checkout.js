import React from "react";
import gql from "graphql-tag";
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';

import calcTotalPrice from '../../lib/calcToPrice';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../Nav/Nav";

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token: String!) {
        createOrder(token: $token) {
            id
            charge
            total
            items {
                id
                title
            }
            user {
                id
            }
        }
    }
`;

function totalItems(cart) {
    return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

const Checkout = ({ children }) => {

    const [createOrder] = useMutation(CREATE_ORDER_MUTATION);
    const { data: { user }, loading, error } = useQuery(CURRENT_USER_QUERY);

    const  onToken = async (res, createOrder) => {
        NProgress.start();
        // manually call the mutation once we have the stripe token
        const order = await createOrder({
            variables: {
                token: res.id,
            },
        }).catch(err => {
            alert(err.message);
        });
    };

    return (
        <StripeCheckout
            amount={calcTotalPrice(user.cart)}
            name="Sick Fits"
            description={`Order of ${totalItems(user.cart)} items!`}
            image={user.cart.length && user.cart[0].item && user.cart[0].item.image}
            stripeKey="pk_test_h7vAOi5hSJOAmahiGFSXAzlo00XVBLoXSV"
            currency="USD"
            email={user.email}
            token={res => onToken(res, createOrder)}
        >
            {/* {children} */}
        </StripeCheckout>
        
    );
};

export default Checkout;
