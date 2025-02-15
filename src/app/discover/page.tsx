
// discoverページ
// → ここにリダイレクトされる

import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react';


const page = () => {
  return (
    <div>
      <h2>discoverページ</h2>
      <p>ここにリダイレクト</p>
      
      {/* ユーザーのアイコン */}
      <div className="mt-10">
        <h2>サインインできたら、ここにアイコンがでてきます</h2>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default page