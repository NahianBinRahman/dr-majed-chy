import { NextResponse } from 'next/server';
import { getBlogs, saveBlog, deleteBlog } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const blogs = getBlogs();
    const blog = blogs.find(b => b.id === params.id || b.slug === params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const blogs = getBlogs();
    const existing = blogs.find(b => b.id === params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    const updated = { ...existing, ...body, id: params.id };
    const updatedList = saveBlog(updated);
    return NextResponse.json({ success: true, blog: updated, blogs: updatedList });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedList = deleteBlog(params.id);
    return NextResponse.json({ success: true, blogs: updatedList });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
