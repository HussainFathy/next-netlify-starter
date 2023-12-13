// Import necessary components and modules
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'My First Blog Post',
    content: 'This is the content of my first blog post. Welcome to my blog!',
  },
  {
    id: 2,
    title: 'Another Blog Post',
    content: 'Here is another interesting blog post. Hope you enjoy reading!',
  },
  // Add more blog posts as needed
];

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Your Personal Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Your Personal Blog" />

        {/* Display a list of blog posts */}
        {blogPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  )
}
