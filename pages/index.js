import React from "react";
// Frameworks
import { Typography } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
export default function Home() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Aleexnl&apos;s Official Portfolio</title>
                <meta
                    name="description"
                    content="Aleexnl's Web Developer portfolio home page."
                />
                <link rel="canonical" href="https://aleexnl.vercel.app/" />
                {/* OpenGraph Tags */}
                <meta
                    property="og:title"
                    content="Aleexnl's Official Portfolio"
                />
                <meta property="og:url" content="https://aleexnl.vercel.app/" />
                <meta
                    property="og:image"
                    content="https://aleexnl.vercel.app/logo.png"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:description"
                    content="Welcome to my official portfoli, where you'll be able to get a brief idea of who am I, experience & some projects."
                />
                <meta property="og:locale" content={router.locale} />
            </Head>
            <Typography variant="h2" component="h1">
                Home Page
            </Typography>
        </>
    );
}
