# graphql-gateway

![Update](https://github.com/brysgo/graphql-gateway/workflows/Update/badge.svg)
![CI](https://github.com/brysgo/graphql-gateway/workflows/CI/badge.svg)
[![npm package][npm-badge]][npm]
[![npm downloads][npm-downloads-badge]][npm]


Graphql Gateway is a lightweight tool for routing different parts of a graphql query to different graphql apis and merging them back into one.

## Usage

See test for example, here are the basics:

```javascript
const graphqlGateway = require("graphql-gateway");
const combinedQuery = "query FooQuery {}" // the query that will be split up by schema
const result = graphqlGateway([{
  schema: /*<schema-one>*/,
  // everything besides resolve gets passed right to graphql-mask
  resolve: function(query, variables) {
    // query is a string with the peice associated with schema one
    return /*<result-of-query-on-schema-one>*/;
  }
},{
  schema: /*<schema-two>*/,
  resolve: function(query, variables) {
    // query is a string with the peice associated with schema two
    return /*<result-of-query-on-schema-two>*/;
  }
}
], combinedQuery, optionalMergeResolvers);
```

See the documentation for the `merge-resolver` npm module for the `optionalMergeResolvers`.

## Alternatives

This tool is really lightweight and useful when you control all the underlying APIs and don't need any join functionality. Some really cool alternatives have been popping up, and while I haven't done a full evaluation, I'd like to point them out.

* [graphql-weaver](https://github.com/AEB-labs/graphql-weaver)
* [graphql-tools](https://github.com/stubailo/schema-stitching-demo)



[npm-badge]: https://img.shields.io/npm/v/graphql-gateway.png?style=flat-square
[npm]: https://www.npmjs.org/package/graphql-gateway
[npm-downloads-badge]:https://img.shields.io/npm/dt/graphql-gateway.svg
