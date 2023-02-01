import Link from "next/link";
import { Button } from '@realiza/frontend/shared/ui'

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
      <Button />
      <Menu />
    </div>
  );
}

export default Index;
