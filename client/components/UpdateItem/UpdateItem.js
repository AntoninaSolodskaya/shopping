import React, {useEffect, useState} from "react";
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {styles} from "./styles";
import Error from '../ErrorMessage';
import Progress from "../Progress/Progress";

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!){
        item(where: { id: $id}) {
            id
            title
            description
            price
            amount
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int, $amount: Int) {
        updateItem( id: $id, title: $title, description: $description, price: $price, amount: $amount ) {
            id
            title
            description
            price
            amount
        }
    }
`;

const UpdateItem = ({id}) => {
    const classes = styles();
    const [state, setState] = useState({});
    const [updateItem, {loading, error}] = useMutation(UPDATE_ITEM_MUTATION);
    const {data} = useQuery(SINGLE_ITEM_QUERY, {
        variables: {id},
    });

    const handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        setState({[name]: val});
    };

    const updatedItem = async (e, updateItemMutation) => {
        e.preventDefault();
        console.log('Updating Item!!');

        const res = await updateItemMutation({
            variables: {
                id,
                ...state,
            },
        });
        console.log('Updated!!');
    };

    if (loading) return <p>Loading...</p>;
    if (!data.item) return <p>No Item Found for ID {id}</p>;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <form onSubmit={e => updatedItem(e, updateItem)}>
                    <Error error={error}/>
                    {loading && <Progress/>}
                    <Typography variant="h4" component="h2" align="center" className={classes.item}>
                        Update your Sale Product
                    </Typography>
                    <TextField
                        label="First Name"
                        name="title"
                        type="text"
                        margin="none"
                        fullWidth
                        defaultValue={data.item.title}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Second Name"
                        name="description"
                        type="text"
                        margin="normal"
                        fullWidth
                        defaultValue={data.item.description}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        margin="normal"
                        fullWidth
                        defaultValue={data.item.amount}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        margin="normal"
                        fullWidth
                        defaultValue={data.item.price}
                        onChange={handleChange}
                    />
                    <div className={classes.btnWrap}>
                        <Button type="submit" variant="contained" color="primary">
                            Sav{loading ? 'ing' : 'e'} Changes
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
};

export default UpdateItem;
export {UPDATE_ITEM_MUTATION};