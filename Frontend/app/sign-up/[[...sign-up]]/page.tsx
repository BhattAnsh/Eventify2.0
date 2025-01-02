import { SignUp } from '@clerk/nextjs'
import Navbar from '@/components/navbar'

export default function Page() {
  return(
    <>
      <Navbar/>
      <div className='w-screen h-[90vh] flex justify-center items-center'>
        <SignUp signInUrl='/sign-in'/>
      </div>
    </>
  )
}