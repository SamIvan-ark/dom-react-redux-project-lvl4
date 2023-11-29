export default () => {
  const FIRST_FREE_ID = 2;
  let id = FIRST_FREE_ID;
  return () => {
    id += 1;
    return id;
  };
};
