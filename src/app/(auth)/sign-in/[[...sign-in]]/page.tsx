
// サインインページ →　ログインページ

import { SignIn } from "@clerk/nextjs";

export default function Page(){
  return (
    <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
      {/* 
        fallbackRedirectUrl → ログイン成功したらリダイレ言うと
      
      */}
      <SignIn fallbackRedirectUrl={"/discover"}/>
    </div>
  )
}