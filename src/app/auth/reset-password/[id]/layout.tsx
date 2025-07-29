import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cambia tu contraseña",
  description: "Cambiar contraseña",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies()
  const token = (await cookieStore).get('authToken')?.value

  if (token) {
    redirect('/dashboard')
  }
  return (
    
    <section>
      {children}
    </section>
  );
}
