import UpdateItem from '../components/UpdateItem/UpdateItem';
import { withRouter } from "next/router";


const Sell = ({ query }) => (
    <div>
        <UpdateItem id={query.id} />
    </div>
);

export default withRouter(Sell);