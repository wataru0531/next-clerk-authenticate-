
// ⭐️src直下に挿入

// Next.jsでClerkの認証ミドルウェアを設定
// → 「特定のルートにアクセスするユーザーを自動的に認証し、適切に制限する」ためのもの

// ⭐️OAuthでは認可サーバー（Googleなど）からアクセストークンを取得するが、Clerkはその処理をすべて代行

// ⭐️結局のところ、アプリケーションが認可サーバー( GoogleやGitHub)からアクセストークンをもらうことで、そのトークンを使ってそのアプリにログインしている。
// そして、そのトークンに見合ったデータをデータベースサーバーから取得したり、ログイン状態を保持している
// Clerkはその代行をしてくれている。

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// console.log(clerkMiddleware)


// ここで指定しているルートのページをpublicに。
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  // "/api/clerk/webhooks", // ここは実装なし
]);

// ⭐️ クライアントがリクエストしたURLが公開ルートでない場合、Clerkによる認証が必要かをチェック
//    認証されていない場合、auth.protect() を使ってユーザーをログインページにリダイレクトさせるなどして、
//    アクセスを制限する
export default clerkMiddleware(async (auth, request) => {
  // console.log(auth);
  
  if(!isPublicRoute(request)){
    await auth.protect();
  }
});


export const config = {
  // matcher → Clerkの認証ミドルウェアを適用するルート(urlパターン)を指定する部分
  matcher: [
    // !_next → _next フォルダ（Next.jsのビルドファイル）を除外
    // !*.css, *.js, *.jpg など → 静的ファイルは認証不要
    // ⭐️ つまり、「ページやAPI以外の静的ファイルにはClerkの認証を適用しない」という意味
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  
    // APIルートとtRPCルートに適用
    // → /api/* や /trpc/* にリクエストが来た場合、Clerkのミドルウェアを適用
    // APIルート (pages/api/ または app/api/) や tRPC のエンドポイントにアクセスする際に認証を適用
    // → APIのリクエストは、Clerkによって認証がチェックされる
    '/(api|trpc)(.*)',
  ],
};

// ⭐️ tRPC とは
// TypeScriptに特化したAPIルートの作成を簡単にするためのライブラリ
// REST API や GraphQL の代わりに、型安全なAPI通信を提供するものだと考えるとわかりやすい

// tRPC の特徴
// ・型安全な API
// → クライアントとサーバーの間でTypeScriptの型が共有されるので、データのやりとりでエラーを減らせる。

// ・REST API の代替
// → 通常、クライアントとサーバーの通信では REST API (fetch や axios で GET/POST する) を使いますが、tRPCでは関数を呼び出す感覚で通信できる。

// GraphQL のような柔軟性
// → GraphQL のようにエンドポイントを一つにまとめられるが、余計なオーバーヘッド（GraphQLのスキーマ定義など）がない。
