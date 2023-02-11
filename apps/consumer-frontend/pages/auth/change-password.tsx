import { Progress } from '@chakra-ui/react';
import { useAuthSendRecoverPasswordEmail } from '@realiza/frontend/auth/data';
import { ChangePassword } from '@realiza/frontend/auth/feature';

type ChangePasswordPageProps = Record<string, never>;

export function ChangePasswordPage(props: ChangePasswordPageProps) {
<<<<<<< HEAD
  const { sendRecoverPasswordEmail, isLoading } =
    useAuthSendRecoverPasswordEmail();
  return (
    <div>
      {isLoading && <Progress size='xs' isIndeterminate />}
      <ChangePassword
        title='Realiza'
        describe='Troque sua senha!'
        submitHandlerOnValid={sendRecoverPasswordEmail}
      />
    </div>
  );
=======
  return <ChangePassword title="Realiza" describe="Troque sua senha!" />;
>>>>>>> 1f5feb81c50b3f1130285c2ad00e7b0eea20fd10
}

export default ChangePasswordPage;
