const merge = require("deepmerge");
const graphqlMask = require("graphql-mask");

const defaultMergeOptions = {
  arrayMerge: function(destinationArray, sourceArray, options) {
    const byId = {};
    destinationArray.forEach(function(item, i) {
      const index = (typeof item === "object") ? item.id : null || i;
      byId[index] = item
    });
    sourceArray.forEach(function(item, i) {
      const index = (typeof item === "object") ? item.id : null || destinationArray.length+i
      byId[index] = Object.assign(byId[index] || {}, item);
    });
    return Object.values(byId);
  }
}

module.exports = function graphqlGateway(metaSchema, query, mergeOptions) {
  return merge.all(
    metaSchema.map(function(schemaInfo) {
      return schemaInfo.resolve(graphqlMask(schemaInfo.schema, query));
    }),
    mergeOptions || defaultMergeOptions
  );
};
