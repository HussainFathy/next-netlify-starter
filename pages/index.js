// pages/index.js

import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';

import path from 'path';
import fs from 'fs';

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
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
};

// Import necessary modules
const matter = require('gray-matter');

function extractMetadata(fileContent) {
  // Use gray-matter to parse frontmatter and content
  const { data, content } = matter(fileContent);

  // Return metadata object
  return {
    id: data.id,
    title: data.title,
    content: content,
  };
}

export async function getStaticProps() {
  // Read files from the 'posts' directory and generate blog post data
  const postsDirectory = path.join(process.cwd(), 'pages/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Extract metadata (e.g., title) from the file content
    const metadata = extractMetadata(fileContent);

    return {
      id: metadata.id,
      title: metadata.title,
      content: metadata.content,
      slug: filename.replace(/\.js$/, ''),
    };
  });

  // Rest of your code...
}


  return {
    props: {
      posts,
    },
  };
}

export default Home;
