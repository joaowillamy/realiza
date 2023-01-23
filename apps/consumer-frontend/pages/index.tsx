import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index({ data }) {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      Frontend using:
      {` ` + data.message}
    </StyledPage>
  );
}

export default Index;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3333/api`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
