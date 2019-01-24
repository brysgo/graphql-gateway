const flat = require("array.prototype.flat");
const { mergeResolver } = require("merge-resolver");
const graphqlMask = require("graphql-mask");

const joinOn = joinKey => (values, join) => {
  const individualsById = {};
  flat(values).forEach((ind, i) => {
    const idValue = ind[joinKey] || `__graphqlGatewayID-${i}`;
    const existing = individualsById[idValue];
    let result = existing || [];
    result.push(ind);
    individualsById[idValue] = result;
  });
  return Object.values(individualsById).map(
    individuals =>
      individuals.length > 1 ? join(...individuals) : individuals[0]
  );
};

const last = values => values[values.length - 1];

const defaultMergeResolvers = {
  Array: joinOn("id"),
  String: last,
  Number: last,
  typeFromObj: obj => {
    if (Array.isArray(obj)) return "Array";
    if (typeof obj === "string") return "String";
    if (typeof obj === "number") return "Number";
    if (typeof obj === "object") return obj.__typename;
  }
};

module.exports = function graphqlGateway(metaSchema, query, mergeResolvers) {
  const merge = mergeResolver({ ...defaultMergeResolvers, ...mergeResolvers });
  return merge(
    metaSchema.map(function(schemaInfo) {
      const { resolve, ...graphqlMaskParams } = schemaInfo;

      const { maskedQuery, maskedVariables } = graphqlMask({
        ...graphqlMaskParams,
        query
      });

      return resolve(maskedQuery, maskedVariables);
    })
  );
};
