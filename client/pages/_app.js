import React from "react";
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';

import { ThemeProvider } from '@material-ui/core/styles';

import theme from "../components/theme/theme";
import Page from "../components/Page";
import withData from '../lib/withData';

function MyApp({ Component, pageProps, apollo }) {
    return (
        <ApolloProvider client={apollo}>
            <ThemeProvider theme={theme}>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </ThemeProvider>
        </ApolloProvider>
    );
};
//This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default withData(MyApp);