import { Progress } from '@chakra-ui/progress';
import { useAuthConfirmPasswordByToken } from '@realiza/frontend/auth/data';
import { ConfirmePassword as ConfirmPasswordComponent } from '@realiza/frontend/auth/feature';

const ConfirmePassword = () => {
  const { confirmPasswordByToken, isLoading } = useAuthConfirmPasswordByToken();
  return (
    <div>
      {isLoading && <Progress size="xs" isIndeterminate />}
      (<ConfirmPasswordComponent title={'Realiza'} describe={''} submitHandlerOnValid={confirmPasswordByToken} />;
    </div>
  );
};

export default ConfirmePassword;
