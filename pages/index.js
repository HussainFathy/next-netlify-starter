// pages/index.js

import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Your Cybersecurity Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Your blog content goes here */}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
