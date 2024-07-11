import Head from 'next/head';

import TemplateContent from '@/components/parts/TemplateContent';

const Home = () => {
  return (
    <>
      <Head>
        <title>LeadX | Creative Media Marketing</title>
        <meta
          name="description"
          content="Tailorfit Lead Management System/CRM Phase 1 for Creative Media Marketing"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TemplateContent>CMM PROJECT KICK-OFF</TemplateContent>
    </>
  );
};

export default Home;
