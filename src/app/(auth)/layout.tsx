interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <main className=" flex items-center justify-center">
      {children}
    </main>
  );
}

