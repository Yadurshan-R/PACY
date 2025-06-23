// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET!;

// // List routes that **do not need token**
// const PUBLIC_ROUTES = ['/login', '/signup', '/api/auth/login', '/api/auth/signup'];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Allow public routes
//   if (PUBLIC_ROUTES.some(publicPath => pathname.startsWith(publicPath))) {
//     return NextResponse.next();
//   }

//   // Check Authorization header or token in cookies if you use that
//   const authHeader = req.headers.get('authorization');

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return NextResponse.json({ message: 'Unauthorized: No token' }, { status: 401 });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     jwt.verify(token, JWT_SECRET);
//     return NextResponse.next();
//   } catch (err) {
//     console.error('JWT verification failed:', err);
//     return NextResponse.json({ message: 'Unauthorized: Invalid or expired token' }, { status: 401 });
//   }
// }
