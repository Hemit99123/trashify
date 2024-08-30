import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Docs for Trashify',
        version: '1.0.0',
      },
      components: {},
      security: [],
      tags: [
        {
          name: 'Post',
        },
        {
            name: "Searching"
        },
        {
            name: "Auth"
        }
      ],
    },
  });
  return spec;
};