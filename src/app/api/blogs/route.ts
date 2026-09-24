import { NextResponse } from 'next/server';
import { getBlogs, saveBlog } from '@/lib/db';
import { BlogPost } from '@/types';

export async function GET() {
  try {
    const blogs = getBlogs();
    return NextResponse.json(blogs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBlog: BlogPost = {
      id: body.id || 'blog-' + Date.now(),
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category || 'General Pain Care',
      readTime: body.readTime || '4 min read',
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      coverImage: body.coverImage || '/images/operation_ot_carm.jpg',
      author: body.author || 'Dr. Md. Mohiuddin Majed Chy',
      featured: !!body.featured,
      tags: body.tags || ['Interventional Pain']
    };
    const blogs = saveBlog(newBlog);
    return NextResponse.json({ success: true, blog: newBlog, blogs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
