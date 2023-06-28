import { NextResponse, URLPattern} from 'next/server'
import type { NextRequest } from 'next/server'
 
// import mongoose from "mongoose"
// import { URLPattern } from 'url-pattern'; 


const entryIdPattern = new URLPattern({pathname: "/api/entries/:id"})
const allEntriesPattern = new URLPattern({pathname: "/api/entries"})
const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const reqHref = request.nextUrl.href

  console.log('requests',reqHref, )

  if(entryIdPattern.test(reqHref)){

    const { id } = entryIdPattern.exec(reqHref)?.pathname.groups!
    if(!checkMongoIDRegExp.test(id!)){
      const url = request.nextUrl.clone()
      url.pathname = '/api/bad-request'
      url.search = `?message=${id} is not a valid id`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next();
  // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[ '/api/entries', '/api/entries/:path*'],
}