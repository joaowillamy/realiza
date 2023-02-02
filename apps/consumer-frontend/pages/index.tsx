import Link from "next/link";
import { Button } from '@realiza/frontend/shared/ui'
import { configYupTranslation } from "@realiza/frontend/shared/form";

export const Menu = () => {
  return <>
    {" "}<Link href={'/'}>home</Link>{" "}
    <Link href={'/public/blog'}>blog</Link>{" "}
    <Link href={'/auth/sign-in'}>sign in</Link>{" "}
    <Link href={'/auth/sign-up'}>sign up</Link>{" "}
  </>
}

configYupTranslation()

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
