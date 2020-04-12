import React from "react";
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from "../components/theme/theme";
import Page from "../components/Page";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Page>
                <Component {...pageProps} />
            </Page>
        </ThemeProvider>
    );
};
//This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default MyApp;