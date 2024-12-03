interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      {children}
    </main>
  );
}
