import { redirect } from 'next/navigation';
import * as React from 'react'

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  redirect('/home');  
}

export default page;