import React from "react";
// Frameworks
import { Typography } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";

export default function About() {
    const router = useRouter();
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
                {/* OpenGraph Tags */}
                <meta property="og:title" content="Who I am? About Aleexnl" />
                <meta
                    property="og:url"
                    content="https://aleexnl.vercel.app/contact"
                />
                <meta
                    property="og:image"
                    content="https://aleexnl.vercel.app/logo.png"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:description"
                    content="I'm a young Web Developer with a desire of learn new things & face new challenges. "
                />
                <meta property="og:locale" content={router.locale} />
            </Head>
            <Typography variant="h2" component="h1">
                About
            </Typography>
        </>
    );
}
