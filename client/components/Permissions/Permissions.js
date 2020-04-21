import React, {useState, useEffect} from "react";
import gql from 'graphql-tag';
import {useQuery} from "@apollo/react-hooks";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ImportExportIcon from '@material-ui/icons/ImportExport';

import {styles} from "./styles";
import Error from "../ErrorMessage";

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const Permissions = () => {
    const classes = styles();
    const [state, setState] = useState([]);
    const { data, loading, error } = useQuery(ALL_USERS_QUERY);

    // useEffect(() => {
    //     console.log('useEffect has been called!');
    //     setState(data);
    // },[]);
    // console.log(state)
    return (
        <div className={classes.wrap}>
            <Error error={error} />
            <TableContainer component={Paper} className={classes.paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Email</TableCell>
                            {possiblePermissions.map(permission => <TableCell>{permission}</TableCell>)}
                            <TableCell align="center"><ImportExportIcon /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.users && state.users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                {possiblePermissions.map(permission => (
                                    <TableCell align="center">
                                        <label htmlFor={`${user.id}-permission-${permission}`}>
                                            <input type="checkbox" />
                                        </label>
                                    </TableCell>
                                ))}
                                <TableCell align="center">
                                    <Button variant="contained" color="secondary">Update</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Permissions;