import { Address } from '@/store/api/gen/leads';

export const formatAddress = (address: Address) => {
  const { state, city, zip, country, street } = address;
  return address ? `${street} ${city} ${state} ${zip} ${country}` : '-';
};
