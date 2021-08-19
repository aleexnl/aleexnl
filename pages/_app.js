import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "lib/theme";
import createEmotionCache from "lib/createEmotionCache";
import Layout from "components/Layout";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}) {
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@aleexnl" />
                <meta name="twitter:creator" content="@aleexnl" />
                <meta
                    property="og:image"
                    content="https://aleexnl.vercel.app/logo.png"
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default MyApp;
