import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Nota",
  description: "Crea una nota de remisión",
};

export default function RootLayout({
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
