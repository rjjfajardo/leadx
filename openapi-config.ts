import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: '../server/swagger.json',
  apiFile: './src/store/api/baseApi.ts',
  apiImport: 'baseApi',
  argSuffix: 'Args',
  hooks: true,
  responseSuffix: 'Response',
  outputFiles: {
    './src/store/api/gen/auth.ts': {
      filterEndpoints: [/authController/],
    },
    './src/store/api/gen/roles.ts': {
      filterEndpoints: [/rolesController/],
    },
    './src/store/api/gen/leads.ts': {
      filterEndpoints: [/leadsController/],
    },
    './src/store/api/gen/companies.ts': {
      filterEndpoints: [/companiesController/],
    },
    './src/store/api/gen/contacts.ts': {
      filterEndpoints: [/contactsController/],
    },
    './src/store/api/gen/system-logs.ts': {
      filterEndpoints: [/systemLogsController/],
    },
    './src/store/api/gen/status.ts': {
      filterEndpoints: [/statusController/],
    },
    './src/store/api/gen/books.ts': {
      filterEndpoints: [/booksController/],
    },
    './src/store/api/gen/tags.ts': {
      filterEndpoints: [/tagsController/],
    },
    './src/store/api/gen/users.ts': {
      filterEndpoints: [/usersController/],
    },
  },
};

export default config;
