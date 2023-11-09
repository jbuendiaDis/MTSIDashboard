import _ from 'lodash';

const setItem = (keyName: string, data: any): void => {
  let parsed = data;
  const isObject = _.isObject(data);
  const isArray = _.isArray(data);

  if (isObject || isArray) parsed = JSON.stringify(data);
  window.localStorage.setItem(keyName, parsed);
};

const getItem = (keyName: string): any => {
  if (!keyName || _.isEmpty(keyName)) return null;
  let value: string | null = window.localStorage.getItem(keyName);

  if (value !== null && (_.get(value, 0) === '[' || _.get(value, 0) === '{'))
    value = JSON.parse(value);

  if (value === 'true') value = value.toString(); // Convertir a cadena
  if (value === 'false') value = value.toString(); // Convertir a cadena

  return value;
};

export { getItem, setItem };
