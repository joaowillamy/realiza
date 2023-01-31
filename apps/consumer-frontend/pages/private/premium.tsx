import { InferGetServerSidePropsType } from 'next';

type Data = Record<string, never>;

export async function getServerSideProps({ params }) {
  //TODO: Fetch data from external API

  // params.token

  // Pass data to the page via props
  const data: Data = await {/*TODO*/}

  return { props: { data } }
}

const PremiumPassword = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {


  return <p>PremiumPassword</p>
}

export default PremiumPassword

