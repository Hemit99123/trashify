import { Metadata } from 'next';
import { getApiDocs } from '../../lib/swagger';
import ReactSwagger from '@/components/swagger';

export const metadata: Metadata = {
  title: 'API Docs',
  description: 'API Documentation with Swagger',
};

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}