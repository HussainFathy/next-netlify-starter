// pages/index.js

import React from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const Home = ({ posts }) => {
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
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <a>
                  <h2>{post.title}</h2>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'pages/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const metadata = matter(fileContent);
    const slug = filename.replace(/\.md$/, '');

    return {
      id: metadata.data.id !== undefined ? metadata.data.id : null,
      title: metadata.data.title || '',
      slug: slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default Home;
