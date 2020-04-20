import Reset from "../components/Reset/Reset";
import Typography from "@material-ui/core/Typography";

const Sell = ({ query }) => {
    console.log(query)
    return(
        <div>
            <Typography>Reset Your Password {query.resetToken}</Typography>
            <Reset resetToken={query.resetToken} />
        </div>
    );
}

export default Sell;