
// (auth)直下のlayout.tsx



export default function RootAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <header>ヘッダー</header>
        
        { children }
      </div>
      
  );
}
