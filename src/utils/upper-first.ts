export const upperFirst = (str: unknown): string => {
  if (typeof str !== 'string') {
    return '';
  }

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
