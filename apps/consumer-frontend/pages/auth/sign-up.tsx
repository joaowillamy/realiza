import { useAuthCreateUser } from "@realiza/frontend/auth/data";
import { SignUp } from "@realiza/frontend/auth/feature";

type SignUpPageProps = Record<string, never>

export function SignUpPage(props: SignUpPageProps) {
  const { createUser } = useAuthCreateUser()
  return (
    <div>
      <SignUp title="Realiza" describe="Crie a sua conta, é Grátis!" submitHandlerOnValid={createUser}/>
    </div>
  );
}

export default SignUpPage;
