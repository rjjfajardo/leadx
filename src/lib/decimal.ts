import Decimal from 'decimal.js';

import { isNullOrUndefined } from './util';

export const isDecimalCompatibleString = (value: string): boolean => {
  return (
    /^-?\d+(\.\d+)?$/.test(value) || // -1.1, 1.1, 1, -1
    /^(\.\d+|\d+\.)$/.test(value) // .1, 1.
  );
};

/**
 * 対象をDecimalに変換
 * @param input {string | number | Decimal}
 * @returns {Decimal}
 */
export const getDecimal = (
  input: string | number | Decimal | null | undefined,
) => {
  // parseFloatだと '1.1a' や '1.1.2' が '1.1' に変換されてパスしてしまう
  if (
    isNullOrUndefined(input) ||
    (typeof input === 'string' && !isDecimalCompatibleString(input))
  ) {
    return new Decimal(0);
  }
  return new Decimal(input);
};
