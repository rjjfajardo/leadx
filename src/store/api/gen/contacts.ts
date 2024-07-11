import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    contactsControllerCreate: build.mutation<
      ContactsControllerCreateResponse,
      ContactsControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/contacts`,
        method: 'POST',
        body: queryArg.createContactDto,
      }),
    }),
    contactsControllerUpdate: build.mutation<
      ContactsControllerUpdateResponse,
      ContactsControllerUpdateArgs
    >({
      query: (queryArg) => ({
        url: `/api/contacts`,
        method: 'PUT',
        body: queryArg.updateContactDto,
      }),
    }),
    contactsControllerCreateContactLog: build.mutation<
      ContactsControllerCreateContactLogResponse,
      ContactsControllerCreateContactLogArgs
    >({
      query: (queryArg) => ({
        url: `/api/contacts/contact-log`,
        method: 'POST',
        body: queryArg.createContactLogDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type ContactsControllerCreateResponse = unknown;
export type ContactsControllerCreateArgs = {
  createContactDto: CreateContactDto;
};
export type ContactsControllerUpdateResponse = unknown;
export type ContactsControllerUpdateArgs = {
  updateContactDto: UpdateContactDto;
};
export type ContactsControllerCreateContactLogResponse = unknown;
export type ContactsControllerCreateContactLogArgs = {
  createContactLogDto: CreateContactLogDto;
};
export type ContactType = 'EMAIL' | 'PHONE' | 'MOBILE';
export type ContactInfo = {
  contactDetail: string;
  contactType: ContactType;
  priority: number;
  countryCode: string;
};
export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};
export type CreateContactDto = {
  contacts: ContactInfo[];
  address?: Address;
  leadId: string;
};
export type UpdateContactDto = {
  leadContactId: number;
  statusId: number;
};
export type CreateContactLogDto = {
  recipientId: string;
  duration: string;
  leadContactId: number;
  remark: string;
};
export const {
  useContactsControllerCreateMutation,
  useContactsControllerUpdateMutation,
  useContactsControllerCreateContactLogMutation,
} = injectedRtkApi;
