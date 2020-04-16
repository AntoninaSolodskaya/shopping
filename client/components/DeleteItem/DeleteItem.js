import React from "react";
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from '../Items/Items';

import Button from "@material-ui/core/Button";
import {CREATE_ITEM_MUTATION} from "../CreateItem/CreateItem";

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`;

const DeleteItem = ({id}) => {
    const [deleteItem, {loading, error}] = useMutation(
        DELETE_ITEM_MUTATION,
        {
            update(cache, payload) {
                // manually update the cache on the client, so it matches the server
                // 1. Read the cache for the items we want
                const data = cache.readQuery({query: ALL_ITEMS_QUERY});
                console.log(data, payload);
                // 2. Filter the deleted item out of the page
                data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
                // 3. Put the items back!
                cache.writeQuery({query: ALL_ITEMS_QUERY, data});
            }
        },
    );

    return (
        <Button size="small" color="primary"
            onClick={() => {
                if (confirm('Are you sure you want to delete this item?')) {
                    deleteItem({variables: {id}});
                }
            }}
        >
            Delete This Item
        </Button>
    )
}
export default DeleteItem;