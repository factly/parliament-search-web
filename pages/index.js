import React from 'react'
import Head from "next/head";
import DefaultLayout from '../layouts/index'

function Home() {
  return(
    <DefaultLayout>
      <Head>
        <title>Initial 123</title>
      </Head>
      <div>Welcome to Next.js!</div>
      
    </DefaultLayout>
  )
}
  
export default Home;