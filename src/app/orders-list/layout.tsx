import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Listado de Notas de remision",
  description: "Listado de notas de remisión",
};

export default async function Layout({
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
