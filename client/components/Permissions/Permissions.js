import React, {useState, useEffect, useMemo} from "react";
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {useMutation, useQuery} from "@apollo/react-hooks";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Checkbox from '@material-ui/core/Checkbox';

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

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation updatePermissions($permissions: [Permission], $userId: ID!) {
        updatePermissions(permissions: $permissions, userId: $userId) {
            id
            permissions
            name
            email
        }
    }
`;

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
    const { data, loading, error } = useQuery(ALL_USERS_QUERY);

    if (loading) return <p>Loading ...</p>;

    return (
        <div className={classes.wrap}>
            <TableContainer component={Paper} className={classes.paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Email</TableCell>
                            {possiblePermissions.map(permission => <TableCell key={permission}>{permission}</TableCell>)}
                            <TableCell align="center"><ImportExportIcon /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <UserPermissions user={user} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const UserPermissions = ({ user }) => {
    const classes = styles();
    const [state, setState] = useState({ permissions: user.permissions });

    const [updatePermissions, {loading, error}] = useMutation(UPDATE_PERMISSIONS_MUTATION, {
        variables: {
            permissions: state.permissions,
            userId: user.id,
        }
    });

    const handlePermissionChange = e => {
        const checkbox = e.target;
        // take a copy of the current permissions
        let updatedPermissions = [...state.permissions];
        // figure out if we need to remove or add this permission
        if (checkbox.checked === true) {
            // add it in!
            updatedPermissions.push(checkbox.value);
        } else {
            updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
        }
        setState({ permissions: updatedPermissions });
    };

    return (
        <>
            {error && <TableRow><TableCell><Error error={error}/></TableCell></TableRow>}
            <>
                {possiblePermissions.map(permission => {
                    return(
                        <TableCell key={permission} align="center">
                            <label htmlFor={`${user.id}-permission-${permission}`}>
                                <Checkbox
                                    id={`${user.id}-permission-${permission}`}
                                    checked={state.permissions.includes(permission)}
                                    value={permission}
                                    onChange={handlePermissionChange}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </label>
                        </TableCell>
                    )
                })}
                <TableCell align="center">
                    <Button
                        variant="contained"
                        className={classes.btn}
                        disabled={loading}
                        onClick={updatePermissions}
                    >
                        Updat{loading ? 'ing' : 'e'}
                    </Button>
                </TableCell>
            </>
        </>
    );
}

UserPermissions.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        id: PropTypes.string,
        permissions: PropTypes.array,
    }).isRequired,
};


export default Permissions;