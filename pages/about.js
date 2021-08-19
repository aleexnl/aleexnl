import React from "react";
// Frameworks
import { Typography } from "@material-ui/core";
import Head from "next/head";
export default function About() {
    return (
        <>
            <Head>
                <title>Who I am? About Aleexnl</title>
                <meta
                    name="description"
                    content="About my career, experience, objectives & projects in mind."
                />
                <link rel="canonical" href="https://aleexnl.vercel.app/about" />
                <meta
                    property="og:url"
                    content="https://aleexnl.vercel.app/about"
                />
                <meta property="og:title" content="Who I am? About Aleexnl" />
                <meta
                    property="og:description"
                    content="I'm a young Web Developer with a desire of learn new things & face new challenges. "
                />
            </Head>
            <Typography variant="h2" component="h1">
                About
            </Typography>
        </>
    );
}
