// pages/index.js

import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

const Home = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Introduction to Cybersecurity',
      content: 'This is an introduction to the exciting world of cybersecurity.',
    },
    {
      id: 2,
      title: 'Securing Your Online Presence',
      content: 'Learn essential tips to secure your online accounts and data.',
    },
    // Add more blog posts as needed
  ];

  return (
    <div className="container">
      <Head>
        <title>Your Cybersecurity Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <h1>Welcome to Your Cybersecurity Blog!</h1>
        
        {/* Display a list of blog posts */}
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
