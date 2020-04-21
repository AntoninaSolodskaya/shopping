import React from "react";
import Router from 'next/router';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from '../Items/Items';

import Button from "@material-ui/core/Button";

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`;

const DeleteItem = ({id}) => {
    const [deleteItem, {loading, error}] = useMutation(DELETE_ITEM_MUTATION);

    //TODO styling alert message

    return (
        <Button size="small" color="primary"
            onClick={async () => {
                if (confirm('Are you sure you want to delete this item?')) {
                    await deleteItem({
                        variables: { id },
                        update(cache,  payload) {
                            // manually update the cache on the client, so it matches the server
                            // 1. Read the cache for the items we want
                            const data = cache.readQuery({query: ALL_ITEMS_QUERY});
                            // 2. Filter the deleted item out of the page
                            data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
                            console.log(data.items)
                            // 3. Put the items back!
                            cache.writeQuery({query: ALL_ITEMS_QUERY, data});
                        }
                    })
                    await Router.push({
                        pathname: '/',
                    });
                }
            }}
        >
            Delete This Item
        </Button>
    )
}
export default DeleteItem;