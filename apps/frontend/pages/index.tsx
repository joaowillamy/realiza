import styled from 'styled-components';
import { User } from '@realiza/shared/types';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index({ user }: {user: User}) {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      {user.name}
    </StyledPage>
  );
}

export default Index;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3333/api`)
  const data: User = await res.json()

  // Pass data to the page via props
  return { props: { user: data } }
}
