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
            </Head>
            <Typography variant="h2" component="h1">
                Home
            </Typography>
        </>
    );
}
