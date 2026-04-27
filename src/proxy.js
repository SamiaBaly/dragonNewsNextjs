import dns from "node:dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
import { headers } from 'next/headers';
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  
  console.log(request, "request");
   const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session);


  // const isLoggedIn=false;
  if(session){

    return NextResponse.next();
  }
  

return NextResponse.redirect((new URL("/login", request.url)));

}
 

 
export const config = {
  matcher: ["/career","/news/:path"]
};