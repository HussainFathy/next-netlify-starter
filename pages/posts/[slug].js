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



export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'pages/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => {
    // Remove the file extension and use it as the slug
    const slug = filename.replace(/\.md$/, '');
    return { params: { slug } };
  });

  return { paths, fallback: false };
}




export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'pages/posts', `${slug}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
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
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return {
      notFound: true,
    };
  }
}

export default Post;




export default Post;
