import React from "react";
import {useQuery} from "@apollo/react-hooks";

import Typography from '@material-ui/core/Typography';

import { CURRENT_USER_QUERY } from '../Nav/Nav';
import { styles } from "./styles";
import Login from "../Login/Login";

const PleaseSignin = ({ children }) => {
    const {loading, error, data} = useQuery(CURRENT_USER_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

    if (!data.user) {
        return (
            <div>
                <Typography variant="subtitle1" align="center" color="secondary" gutterBottom>Please Sign In before Continuing</Typography>
                <Login />
            </div>
        );
    }
    return children;
}

export default PleaseSignin;