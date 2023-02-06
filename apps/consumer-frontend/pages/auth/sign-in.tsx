import { SignIn } from "@realiza/frontend/auth/feature";

type SignInPageProps = Record<string, never>

export function SignInPage(props: SignInPageProps) {

  return (
    <div>
      <SignIn title="Realiza" describe="Entre na sua conta!" />
    </div>
  );
}

export default SignInPage;
