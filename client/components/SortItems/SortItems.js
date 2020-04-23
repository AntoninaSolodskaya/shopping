import React from "react";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { ALL_ITEMS_QUERY } from "../Items/Items";
import { useQuery } from "@apollo/react-hooks";

const SortItems = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {data: {items}, loading, error } = useQuery(ALL_ITEMS_QUERY);
    console.log(items);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained" color="primary">
                Choose Category
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.map(item => <MenuItem key={item.id} onClick={handleClose}>{item.category}</MenuItem>)}
            </Menu>
        </div>
    )
}

export default SortItems;