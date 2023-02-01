const getId = (): string => {
  return (
    Number(String(Math.random()).slice(2)) +
    Date.now() +
    Math.round(performance.now())
  ).toString(36);
};

const getDateId = (): string => {
  return Date.now().toString();
};

export default {
  getId,
  getDateId,
};
