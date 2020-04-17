import React, { useState } from 'react';
import Head from 'next/head';
import Layout from "../components/Layout";

export default function Index() {
    const [pageNum, setPageNum] = useState(0);

    return (
        <div>
            <Head>
                <title>Hacker news | Top new</title>
            </Head>
            <Layout />
        </div>
    );
}
