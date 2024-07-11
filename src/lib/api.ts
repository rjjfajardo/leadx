export const getErrorMessage = (error: any): string => {
  if (error?.data?.message) return error.data.message;
  if (error.message && Array.isArray(error.message)) return error.message[0];
  if (error?.message) return error.message;
  return '';
};
