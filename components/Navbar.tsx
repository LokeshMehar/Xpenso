import { SignedIn, SignedOut, SignIn, SignInButton, SignUp, UserButton } from '@clerk/nextjs'
import React from 'react'



const navbar = () => {
  return (
    <>
    <SignedOut>
        <div className="flex flex-col items-center space-y-4">
          <h1>Please Sign In or Sign Up</h1>
          <SignInButton />
          <SignIn path="/sign-in" routing="path" />
          <SignUp path="/sign-up" routing="path" />
        </div>
      </SignedOut>

      <SignedIn>
        <div>
          <h1>Welcome Back!</h1>
          <UserButton />
        </div>
      </SignedIn>
      </>
  )
}

export default navbar