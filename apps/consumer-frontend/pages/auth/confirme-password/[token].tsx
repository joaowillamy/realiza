import { useRouter } from 'next/router';
import { ConfirmePassword as ConfirmPasswordComponent } from '../../../../../modules/frontend/auth/feature/src/pages/confirme-password';

const ConfirmePassword = () => {
  const router = useRouter();
  const { token } = router.query;

  return <ConfirmPasswordComponent title={''} describe={''}  />;
};


export default ConfirmePassword;
