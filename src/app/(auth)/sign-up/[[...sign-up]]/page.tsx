
// サインアップ → 新規登録ページ

// ⭐️オプショナルキャッチセグメント（[[...param]]）
// → URLパラメータがなくてもそのページを表示でき、URLの任意の深さに柔軟に対応することができる

// ⭐️URL：/sign-up/a/b/c にアクセスした場合
// [[...sign-up]] はオプショナルキャッチオールセグメントなので、二重カッコにすることで、
// パスの a/b/c を1つのパラメータとして配列で受け取れる
// { sign-up: ["a", "b", "c"] } として取得できる

import { SignUp } from "@clerk/nextjs";

export default function Page(){
  return <SignUp fallbackRedirectUrl={"/discover"}/>;
}

