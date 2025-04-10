export const checkIsDateExpire = (expireDate: string | number | Date) => {
  const now = new Date();
  const expiresAtDate = new Date(expireDate);

  return now < expiresAtDate;
};
