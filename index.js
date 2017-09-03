const merge = require("deepmerge");
const graphqlMask = require("graphql-mask");

module.exports = function graphqlGateway(metaSchema, query, mergeOptions) {
  return merge.all(
    metaSchema.map(function(schemaInfo) {
      return schemaInfo.resolve(graphqlMask(schemaInfo.schema, query));
    }),
    mergeOptions
  );
};
