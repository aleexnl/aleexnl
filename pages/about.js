import React from "react";
// Frameworks
import { Typography } from "@material-ui/core";
import Head from "next/head";
export default function About() {
    return (
        <>
            <Head>
                <title>About</title>
            </Head>
            <Typography variant="h2" component="h1">
                About
            </Typography>
        </>
    );
}
