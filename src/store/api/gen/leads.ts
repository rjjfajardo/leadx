import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    leadsControllerCreate: build.mutation<
      LeadsControllerCreateResponse,
      LeadsControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/leads`,
        method: 'POST',
        body: queryArg.createLeadDto,
      }),
    }),
    leadsControllerFindAll: build.query<
      LeadsControllerFindAllResponse,
      LeadsControllerFindAllArgs
    >({
      query: (queryArg) => ({
        url: `/api/leads`,
        params: {
          distroType: queryArg.distroType,
          showReturnedLeadsOnly: queryArg.showReturnedLeadsOnly,
          searchText: queryArg.searchText,
          dateAddedFrom: queryArg.dateAddedFrom,
          dateAddedTo: queryArg.dateAddedTo,
          miners: queryArg.miners,
          publishers: queryArg.publishers,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    leadsControllerAssignLeads: build.mutation<
      LeadsControllerAssignLeadsResponse,
      LeadsControllerAssignLeadsArgs
    >({
      query: (queryArg) => ({
        url: `/api/leads/assign`,
        method: 'POST',
        body: queryArg.assignLeadDto,
      }),
    }),
    leadsControllerFindAllPublishers: build.query<
      LeadsControllerFindAllPublishersResponse,
      LeadsControllerFindAllPublishersArgs
    >({
      query: () => ({ url: `/api/leads/publishers` }),
    }),
    leadsControllerFindAllMiners: build.query<
      LeadsControllerFindAllMinersResponse,
      LeadsControllerFindAllMinersArgs
    >({
      query: () => ({ url: `/api/leads/miners` }),
    }),
    leadsControllerFindOne: build.query<
      LeadsControllerFindOneResponse,
      LeadsControllerFindOneArgs
    >({
      query: (queryArg) => ({ url: `/api/leads/${queryArg.id}` }),
    }),
    leadsControllerUpdate: build.mutation<
      LeadsControllerUpdateResponse,
      LeadsControllerUpdateArgs
    >({
      query: (queryArg) => ({
        url: `/api/leads/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.updateLeadDto,
      }),
    }),
    leadsControllerAcquireMinedLeads: build.mutation<
      LeadsControllerAcquireMinedLeadsResponse,
      LeadsControllerAcquireMinedLeadsArgs
    >({
      query: (queryArg) => ({
        url: `/api/leads/acquire`,
        method: 'PATCH',
        body: queryArg.acquireLeadsDto,
      }),
    }),
    leadsControllerMoveLeadToMainSanitizedDistro: build.mutation<
      LeadsControllerMoveLeadToMainSanitizedDistroResponse,
      LeadsControllerMoveLeadToMainSanitizedDistroArgs
    >({
      query: (queryArg) => ({
        url: `/api/leads/${queryArg.id}/sanitize`,
        method: 'PATCH',
      }),
    }),
    leadsControllerMoveLeadToGraveyardDistro: build.mutation<
      LeadsControllerMoveLeadToGraveyardDistroResponse,
      LeadsControllerMoveLeadToGraveyardDistroArgs
    >({
      query: (queryArg) => ({
        url: `/api/leads/${queryArg.id}/graveyard`,
        method: 'PATCH',
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type LeadsControllerCreateResponse = unknown;
export type LeadsControllerCreateArgs = {
  createLeadDto: CreateLeadDto;
};
export type LeadsControllerFindAllResponse =
  /** status 200  */ FindAllLeadsResponseDto;
export type LeadsControllerFindAllArgs = {
  distroType: DistroType;
  showReturnedLeadsOnly?: boolean | null;
  searchText?: string | null;
  dateAddedFrom?: string | null;
  dateAddedTo?: string | null;
  miners?: string[] | null;
  publishers?: string[] | null;
  page: number;
  perPage: number;
};
export type LeadsControllerAssignLeadsResponse =
  /** status 200  */ AcquireOrAssignLeadResponseDto;
export type LeadsControllerAssignLeadsArgs = {
  assignLeadDto: AssignLeadDto;
};
export type LeadsControllerFindAllPublishersResponse =
  /** status 200  */ FindAllPublishersDto;
export type LeadsControllerFindAllPublishersArgs = void;
export type LeadsControllerFindAllMinersResponse =
  /** status 200  */ FindAllMinersDto;
export type LeadsControllerFindAllMinersArgs = void;
export type LeadsControllerFindOneResponse =
  /** status 200  */ FindOneLeadResponseDto;
export type LeadsControllerFindOneArgs = {
  id: string;
};
export type LeadsControllerUpdateResponse = unknown;
export type LeadsControllerUpdateArgs = {
  id: string;
  updateLeadDto: UpdateLeadDto;
};
export type LeadsControllerAcquireMinedLeadsResponse =
  /** status 200  */ AcquireOrAssignLeadResponseDto;
export type LeadsControllerAcquireMinedLeadsArgs = {
  acquireLeadsDto: AcquireLeadsDto;
};
export type LeadsControllerMoveLeadToMainSanitizedDistroResponse = unknown;
export type LeadsControllerMoveLeadToMainSanitizedDistroArgs = {
  id: string;
};
export type LeadsControllerMoveLeadToGraveyardDistroResponse = unknown;
export type LeadsControllerMoveLeadToGraveyardDistroArgs = {
  id: string;
};
export type DistroType =
  | 'MAIN_UNSANITIZED'
  | 'MAIN_SANITIZED'
  | 'GRAVEYARD'
  | 'ASSIGNED_UNSANITIZED'
  | 'ASSIGNED_SANITIZED';
export type Gender = 'MALE' | 'FEMALE' | 'UNDECLARED';
export type LeadInfo = {
  prefix: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffix: string | null;
  alias: string | null;
  gender?: Gender;
  timezone: string | null;
};
export type ContactType = 'EMAIL' | 'PHONE' | 'MOBILE';
export type LeadContactInfo = {
  contactDetail: string;
  contactType: ContactType;
  priority: number;
  countryCode: string;
};
export type Format = 'PAPERBACK' | 'HARDBACK' | 'AUDIO_BOOK' | 'E_BOOK';
export type LeadPublisherCompany = {
  id: string;
  name: string;
};
export type LeadBookPublishers = {
  year: number;
  bookFormat: Format;
  isbn: string | null;
  publisher: LeadPublisherCompany;
};
export type LeadBook = {
  title: string;
  bookLink?: string | null;
  details?: LeadBookPublishers[] | null;
};
export type LeadAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};
export type CreateLeadDto = {
  currentDistro: DistroType;
  sourceId: string | null;
  author: LeadInfo;
  contactInfo: LeadContactInfo[];
  books?: LeadBook[] | null;
  address?: LeadAddress | null;
};
export type StatusForFindAllLead = {
  id: number;
  label: string;
  colorValue: string;
};
export type TagForFindAllLead = {
  id: number;
  label: string;
  colorValue: string | null;
};
export type MinerForFindAllLead = {
  id: string;
  firstName: string;
  lastName: string;
};
export type PublisherForFindAllLead = {
  id: string;
  name: string;
};
export type BookPublishersForFindAllLead = {
  id: number;
  isbn: string | null;
  publisher: PublisherForFindAllLead;
};
export type BookForFindAllLead = {
  id: string;
  title: string;
  bookPublishers: BookPublishersForFindAllLead[];
};
export type LeadForFindAll = {
  firstName: string;
  lastName: string;
  id: string;
  createdAt: string;
  status: StatusForFindAllLead;
  tag: TagForFindAllLead;
  miner: MinerForFindAllLead;
  books: BookForFindAllLead[];
};
export type FindAllLeadsResponseDto = {
  data: LeadForFindAll[];
  total: number;
};
export type AcquireOrAssignLeadResponseDto = {
  success?: string;
  error?: string;
};
export type AssignLeadDto = {
  salesAgentIds: string[];
  leadsToAssign: number;
};
export type BookPublisherForFindAllPublishers = {
  id: string;
  name: string;
};
export type FindAllPublishersDto = {
  data: BookPublisherForFindAllPublishers[];
};
export type MinerForFindAllMiners = {
  id: string;
  firstName: string;
  lastName: string;
};
export type FindAllMinersDto = {
  data: MinerForFindAllMiners[];
};
export type LeadStatus = {
  label: string;
  colorValue: string;
};
export type LeadTag = {
  label: string;
  colorValue: string | null;
};
export type LeadMiner = {
  id: string;
  firstName: string;
  lastName: string;
};
export type LeadBooks = {
  id: string;
  title: string;
};
export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};
export type LeadAddresses = {
  address: Address;
};
export type Contact = {
  contactDetail: string;
  contactType: ContactType;
  priority: number;
  countryCode: string;
};
export type Status = {
  label: string;
};
export type LeadContacts = {
  id: number;
  contact: Contact | null;
  status: Status | null;
};
export type LeadForFindOne = {
  prefix: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffix: string | null;
  alias: string | null;
  gender?: Gender;
  id: string;
  createdAt: string;
  currentDistro: DistroType;
  status: LeadStatus;
  tag: LeadTag;
  miner: LeadMiner;
  books: LeadBooks[];
  leadAddresses: LeadAddresses[];
  leadContacts: LeadContacts[];
};
export type FindOneLeadResponseDto = {
  data: LeadForFindOne | null;
};
export type UpdateLeadDto = {
  currentDistro?: DistroType;
  sourceId?: string | null;
  author?: LeadInfo;
  contactInfo?: LeadContactInfo[];
  books?: LeadBook[] | null;
  address?: LeadAddress | null;
  statusId?: number;
  tagId?: number;
};
export type KeywordType = 'LEAD_NAME' | 'BOOK_TITLE' | 'ISBN';
export type AcquireLeadsDto = {
  keywordType?: KeywordType;
  keyword?: string | null;
  count?: number | null;
};
export const {
  useLeadsControllerCreateMutation,
  useLeadsControllerFindAllQuery,
  useLeadsControllerAssignLeadsMutation,
  useLeadsControllerFindAllPublishersQuery,
  useLeadsControllerFindAllMinersQuery,
  useLeadsControllerFindOneQuery,
  useLeadsControllerUpdateMutation,
  useLeadsControllerAcquireMinedLeadsMutation,
  useLeadsControllerMoveLeadToMainSanitizedDistroMutation,
  useLeadsControllerMoveLeadToGraveyardDistroMutation,
} = injectedRtkApi;
