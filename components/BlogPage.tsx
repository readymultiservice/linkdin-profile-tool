
import React from 'react';
import type { Post, Category } from '../types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';


interface BlogPageProps {
  posts: Post[];
  categories: Category[];
  onBack: () => void;
  onSelectPost: (post: Post) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, categories, onBack, onSelectPost }) => {
  const getCategoryName = (categoryId: number) => {
    return categories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  }

  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to Home
        </button>

        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">The ProfilePilot AI Blog</h1>
          <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Insights on career growth, resume optimization, and leveraging AI for your professional brand.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
                <div key={post.id} className="bg-slate-50 border border-slate-200 rounded-lg shadow-md flex flex-col overflow-hidden">
                    <img src={post.featuredImageUrl} alt={post.title} className="h-48 w-full object-cover" />
                    <div className="p-6 flex flex-col flex-grow">
                        <p className="text-sm font-semibold text-blue-600">{getCategoryName(post.categoryId)}</p>
                        <h2 className="mt-2 text-xl font-bold text-black flex-grow">{post.title}</h2>
                        <p className="mt-2 text-black text-sm">{post.excerpt}</p>
                        <div className="mt-6 flex items-center justify-between text-xs text-black">
                             <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <button onClick={() => onSelectPost(post)} className="font-semibold text-blue-600 hover:text-blue-800 flex items-center">
                                Read More <ArrowRightIcon className="h-4 w-4 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;