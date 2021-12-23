export async function getServerSideProps() {
  if (process.env.NODE_ENV === 'production') {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

export default function Index() {
  return (
    <>
      Access the playground{' '}
      <a
        href="/api/graphql"
        style={{
          fontWeight: 600,
          textDecoration: 'underline',
        }}
      >
        here
      </a>
    </>
  );
}
