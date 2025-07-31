import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('authToken')?.value
  if (!token) {
    redirect('/auth')
  }
  return (
    <>
      dashboard
    </>
  );
}
