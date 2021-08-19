import React from "react";
// Frameworks
import { Typography } from "@material-ui/core";
import Head from "next/head";
export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Typography variant="h2" component="h1">
                Home
            </Typography>
        </>
    );
}
