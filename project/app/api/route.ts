import { NextResponse } from 'next/server';
import User from '@/lib/models/user';
import connect from '@/lib/db';

export const GET =  async () => {
    try {
        await connect();
        const user = await User.find();
        return new NextResponse(JSON.stringify(user), {status: 200});
    } catch (error) {
        return new NextResponse("Error in fetching users " + error, {status: 500});
    }
}