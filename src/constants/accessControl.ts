import { AccessType } from '@/store/api/gen/roles';

export const ACCESS_TYPE: { [K in AccessType]: AccessType } = {
  ALL: 'ALL',
  LIST: 'LIST',
  READ: 'READ',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  PROCESS: 'PROCESS',
  EXPORT: 'EXPORT',
  UPLOAD: 'UPLOAD',
  DOWNLOAD: 'DOWNLOAD',
} as const;
