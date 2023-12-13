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
import matter from 'gray-matter';

// Updated extractMetadata function for Markdown files
function extractMetadata(fileContent) {
  // Use gray-matter to parse frontmatter and content
  const { data, content } = matter(fileContent);

  // Return metadata object
  return {
  id: data.id || null,
  title: data.title || '', // Default to an empty string if undefined
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

    // Move the line outside of the return object and set the slug property
    const slug = filename.replace(/\.js$/, '');

    return {
      id: metadata.id !== undefined ? metadata.id : null,
      title: metadata.title,
      content: metadata.content,
      slug: slug, // Set the slug property
    };
  });

  return {
    props: {
      posts,
    },
  };
}



export default Home;
