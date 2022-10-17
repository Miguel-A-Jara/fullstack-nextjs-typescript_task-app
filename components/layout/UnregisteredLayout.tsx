import Head from "next/head";

interface UnregisteredLayoutProps {
  children: JSX.Element | JSX.Element[];
  title  ?: string;
};

const UnregisteredLayout = ({ children, title }: UnregisteredLayoutProps) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
      </Head>
      <main className='full-height container container-xl d-flex align-items-center justify-content-center'>
        { children }
      </main>
    </>
  )
}

export default UnregisteredLayout
