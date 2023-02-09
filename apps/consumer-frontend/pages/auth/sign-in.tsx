import { Progress } from '@chakra-ui/react';
import { useAuthSignin } from '@realiza/frontend/auth/data';
import { SignIn } from '@realiza/frontend/auth/feature';

type SignInPageProps = Record<string, never>;

export function SignInPage(props: SignInPageProps) {
  const { isLoading, signin } = useAuthSignin();
  return (
    <div>
      {isLoading && <Progress size='xs' isIndeterminate />}
      <SignIn
        title='Realiza'
        describe='Entre na sua conta!'
        submitHandlerOnValid={signin}
      />
    </div>
  );
}

export default SignInPage;
