import { STATUS, TAGS } from '@/constants/tagsAndStatus';
import {
  ContactType as ContactInfoType,
  DistroType,
  Format,
  Gender as GenderType,
} from '@/store/api/gen/leads';

export const ContactType = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  MOBILE: 'MOBILE',
} as const satisfies Record<ContactInfoType, ContactInfoType>;

export const DISTRO_TYPE = {
  MAIN_UNSANITIZED: 'MAIN_UNSANITIZED',
  MAIN_SANITIZED: 'MAIN_SANITIZED',
  GRAVEYARD: 'GRAVEYARD',
  ASSIGNED_UNSANITIZED: 'ASSIGNED_UNSANITIZED',
  ASSIGNED_SANITIZED: 'ASSIGNED_SANITIZED',
} as const satisfies Record<DistroType, DistroType>;

export const Gender = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
  UNDECLARED: 'UNDECLARED',
} as const satisfies Record<GenderType, GenderType>;

export const BookFormat = [
  'PAPERBACK',
  'HARDBACK',
  'E_BOOK',
  'AUDIO_BOOK',
] as const satisfies Format[];

export const CONTACT_STATUS = [
  STATUS.PENDING_VERIFICATION,
  STATUS.VERIFIED,
  STATUS.NOT_IN_SERVICE,
  STATUS.WRONG_NUMBER,
  STATUS.RING_OUT,
];

export const RETURN_TO_MINER_CONTACT_STATUS = [
  STATUS.NOT_IN_SERVICE,
  STATUS.WRONG_NUMBER,
  STATUS.RING_OUT,
];

export const FOR_SANITATION_LEAD_TAGS = [TAGS.HOT_LEAD];

export const FOR_SANITATION_LEAD_STATUS = [
  STATUS.DECEASED,
  STATUS.LEFT_VM,
  STATUS.VERIFIED,
  STATUS.DO_NOT_CALL,
  STATUS.NO_ANSWER,
];

export const FOR_GRAVEYARD_LEAD_STATUS = [STATUS.DO_NOT_CALL];
