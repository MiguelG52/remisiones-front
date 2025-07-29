import type { Metadata } from "next";
  import { redirect } from 'next/navigation'
  import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: "Clientes",
  description: "Listado de clientes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  const cookieStore = cookies()
  const token = (await cookieStore).get('authToken')?.value
    
  if (!token) {
    redirect('/auth') 
  }
  return (
    <section>
        {children}
    </section>
  );
}
