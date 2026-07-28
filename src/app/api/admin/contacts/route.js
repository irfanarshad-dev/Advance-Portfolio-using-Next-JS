import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

function isAuthed(cookieStore) {
  const token = cookieStore.get('admin_auth')?.value;
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    if (!isAuthed(cookieStore)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('irfanstack_contactDB');
    const contacts = await db.collection('contacts').find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      contacts: contacts.map((c) => ({ ...c, _id: c._id.toString() })),
    });
  } catch (error) {
    console.error('Admin contacts GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const cookieStore = await cookies();
    if (!isAuthed(cookieStore)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    const { ObjectId } = await import('mongodb');

    const client = await clientPromise;
    const db = client.db('irfanstack_contactDB');
    await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin contacts DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
