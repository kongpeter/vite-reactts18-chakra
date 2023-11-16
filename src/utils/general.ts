export const formatDate = (
  dateString: string,
  options: Record<any, any>,
  locales: Intl.LocalesArgument = 'en-GB'
) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString(locales, options).replace(',', '');

  return formattedDate;
};
