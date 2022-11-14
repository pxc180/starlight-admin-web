export function paramsToSelector(params) {
  let selector = {};

  if (Object.keys(params).length) {
    selector = { $and: [] };
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        let obj = {};
        obj[key] = { $regex: new RegExp(params[key], 'i') };
        selector.$and.push(obj);
      }
    }
  }

  return selector;
}
