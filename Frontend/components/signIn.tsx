import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Navbar from '@/components/navbar'

function SignInRoute() {
  return (
    <>

      <Navbar/>
      <div className='w-screen h-[90vh] flex justify-center items-center'>
        <SignIn signUpUrl='/sign-up'/>
      </div>
    </>
  )
}

export default SignInRoute;