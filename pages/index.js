import React from "react";
// Frameworks
import { Typography } from "@material-ui/core";
import Head from "next/head";
export default function Home() {
    return (
        <>
            <Head>
                <title>Aleexnl&apos;s Official Portfolio</title>
                <meta
                    name="description"
                    content="Aleexnl's Web Developer portfolio home page."
                />
                <link rel="canonical" href="https://aleexnl.vercel.app/" />
                <meta property="og:url" content="https://aleexnl.vercel.app/" />
                <meta
                    property="og:title"
                    content="Aleexnl's Official Portfolio"
                />
                <meta
                    property="og:description"
                    content="Welcome to my official portfoli, where you'll be able to get a brief idea of who am I, experience & some projects."
                />
            </Head>
            <Typography variant="h2" component="h1">
                Home
            </Typography>
        </>
    );
}
