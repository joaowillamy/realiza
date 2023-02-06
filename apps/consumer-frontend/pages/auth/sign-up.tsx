import { SignUp } from "@realiza/frontend/auth/feature";

type SignUpPageProps = Record<string, never>

export function SignUpPage(props: SignUpPageProps) {

  return (
    <div>
      <SignUp title="Realiza" describe="Crie a sua conta, é Grátis!"/>
    </div>
  );
}

export default SignUpPage;
