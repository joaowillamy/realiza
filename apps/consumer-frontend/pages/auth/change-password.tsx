import { Progress } from '@chakra-ui/react';
import { useAuthSendRecoverPasswordEmail } from '@realiza/frontend/auth/data';
import { ChangePassword } from '@realiza/frontend/auth/feature';

type ChangePasswordPageProps = Record<string, never>;

export function ChangePasswordPage(props: ChangePasswordPageProps) {
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
}

export default ChangePasswordPage;
