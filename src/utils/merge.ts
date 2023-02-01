type Obj = Record<string, unknown>;

const mergeObjects = (obj1: Obj, obj2: Obj): Obj => {
  return { ...obj1, ...obj2 };
};

export default {
  mergeObjects,
};
