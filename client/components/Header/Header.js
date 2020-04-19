import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import Nav from "../Nav/Nav";
import { styles } from "./styles";

Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};

const Header = () => {
    const classes = styles();

    return (
        <>
            <div className={classes.bar}>
                <Link href="/">
                    <a className={classes.linkStyle}>Shopping &#128064;</a>
                </Link>

                <Nav/>
            </div>
            <div>
                <p>Search </p>
            </div>
        </>
    );
};

export default Header;