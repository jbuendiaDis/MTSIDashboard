import { isArray, isEmpty } from 'lodash';

export const toQueryString = (object: {
  [key: string]: string | number | undefined | (string | number)[];
}) => {
  let queryString = '';

  //let
  for (const key in object) {
    if (typeof object[key] === 'number' || !isEmpty(object[key])) {
      if (!isArray(object[key])) {
        queryString += `${encodeURIComponent(key)}=${encodeURIComponent(
          object[key] as string | number
        )}&`;
      } else {
        for (const value of object[key] as (string | number)[]) {
          queryString += `${encodeURIComponent(key)}=${encodeURIComponent(
            value
          )}&`;
        }
      }
    }
  }

  return queryString.slice(0, queryString.length - +!isEmpty(object));
};
