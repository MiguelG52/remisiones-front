import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listado de Notas de remision",
  description: "Listado de notas de remisión",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
        {children}
    </section>
  );
}
