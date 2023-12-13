// pages/posts/[slug].js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const Post = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

// pages/posts/[slug].js

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'pages/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.js$/, '') },
  }));

  return { paths, fallback: false };
}



export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'pages/posts', `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Extract metadata (e.g., title) from the file content
  const { data, content } = matter(fileContent);

  return {
    props: {
      post: {
        id: data.id,
        title: data.title,
        content: content,
      },
    },
  };
}


export default Post;
