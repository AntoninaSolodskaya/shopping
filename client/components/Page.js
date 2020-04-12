import React from 'react';

import Meta from "./Meta";
import Header from "./Header/Header";

const Page = (props) => (
    <>
        <Meta/>
        <Header/>
        <div>{props.children}</div>
    </>
);

export default Page;