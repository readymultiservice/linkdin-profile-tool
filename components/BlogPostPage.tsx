
import React from 'react';
import type { Post } from '../types';

interface BlogPostPageProps {
  post: Post; // Updated to use the more detailed Post interface
  onBack: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to Blog
        </button>

        <article>
            <header className="mb-8">
                {/* Category name would require passing categories down or finding by ID */}
                {/* <p className="text-base font-semibold text-blue-600 uppercase tracking-wide">{post.category}</p> */}
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-black tracking-tight leading-tight">{post.title}</h1>
                <div className="mt-4 text-sm text-black">
                    <span>By {post.author}</span> &bull; <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </header>
            
            <img src={post.featuredImageUrl} alt={post.title} className="w-full rounded-lg shadow-lg mb-8 aspect-video object-cover" />
            
            <div className="prose prose-lg max-w-none text-black leading-relaxed space-y-4">
                {post.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;