import React from "react";

import Typography from "@material-ui/core/Typography";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;

const Logout = () => {
    return(
        <Typography>Logout</Typography>
    )
};

export default Logout;