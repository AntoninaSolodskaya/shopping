import React from "react";
import Link from 'next/link';
import PropTypes from 'prop-types';

import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";

import {styles} from "./styles";
import formatMoney from '../../lib/formatMoney';
import DeleteItem from "../DeleteItem/DeleteItem";
import AddToCart from "../AddToCart";

const Item = ({ item }) => {
    const classes = styles();

    const badge = item.amount === null;

    return (
        <Paper elevation={5} className={classes.root}>
            {item.image &&
            <CardMedia
                className={classes.media}
                image={item.image}
            />}
            {badge && <span className={classes.amountSpan}>Sale</span>}
            <Typography gutterBottom variant="h5" component="h2" align="center" color="primary"
                        className={classes.cardTitle}>
                <Link
                    href={{
                        pathname: '/item',
                        query: {id: item.id},
                    }}
                >
                    <a className={classes.styleLink}>{item.title}</a>
                </Link>
            </Typography>
            <span className={classes.badge}>{formatMoney(item.price)}</span>
            <CardActions className={classes.cardBtn}>
                <Button size="small" color="primary">
                    <Link
                        href={{
                            pathname: '/update',
                            query: {id: item.id},
                        }}
                    >
                        <a className={classes.styleLink}>Edit</a>
                    </Link>
                </Button>
                <AddToCart id={item.id}/>
                <DeleteItem id={item.id} />
            </CardActions>
        </Paper>
    )
};

Item.propTypes = {
    item: PropTypes.object.isRequired,
}

export default Item;