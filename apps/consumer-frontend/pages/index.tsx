import Link from "next/link";

export const Menu = () => {
  return <>
    {" "}<Link href={'/'}>home</Link>{" "}
    <Link href={'/public/blog'}>blog</Link>{" "}
    <Link href={'/auth/sign-in'}>sign in</Link>{" "}
    <Link href={'/auth/sign-up'}>sign up</Link>{" "}
  </>
}

export function Index() {

  return (
    <div>
      Home
      <Menu />
    </div>
  );
}

export default Index;
