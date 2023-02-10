import { ChangePassword } from '@realiza/frontend/auth/feature';

type ChangePasswordPageProps = Record<string, never>;

export function ChangePasswordPage(props: ChangePasswordPageProps) {
  return <ChangePassword title="Realiza" describe="Troque sua senha!" />;
}

export default ChangePasswordPage;
