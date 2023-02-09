import { Progress } from '@chakra-ui/react';
import { useAuthCreateUser } from '@realiza/frontend/auth/data';
import { SignUp } from '@realiza/frontend/auth/feature';

type SignUpPageProps = Record<string, never>;

export function SignUpPage(props: SignUpPageProps) {
  const { createUser, isLoading } = useAuthCreateUser();
  return (
    <div>
      {isLoading && <Progress size='xs' isIndeterminate />}
      <SignUp
        title='Realiza'
        describe='Crie a sua conta, é Grátis!'
        submitHandlerOnValid={createUser}
        isLoading={isLoading}
      />
    </div>
  );
}

export default SignUpPage;
