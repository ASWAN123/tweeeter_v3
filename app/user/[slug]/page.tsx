"use client";

import { usePathname, useRouter } from 'next/navigation'


// continue  from this  point  and  believe  tomorrow everything  is  gonna  be  fine  as  hell , remember  be  a  man  and  die  at  work
export default function Page() {
  const  pathname  = usePathname()
 
  return <p>Post: {pathname}</p>
}
