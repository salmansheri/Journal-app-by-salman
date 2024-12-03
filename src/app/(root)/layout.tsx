export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 lg:px-8 ">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}
