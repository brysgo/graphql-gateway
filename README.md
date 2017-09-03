# graphql-gateway

[![CircleCI][build-badge]][build]
[![npm package][npm-badge]][npm]

Graphql Gateway is a lightweight tool for routing different parts of a graphql query to different graphql apis and merging them back into one.

## Usage

See test for example, here are the basics:

```javascript
const graphqlGateway = require("graphql-gateway");
const combinedQuery = "query FooQuery {}" // the query that will be split up by schema
const result = graphqlGateway([{
  schema: /*<schema-one>*/,
  resolve: function(query) {
    // query is a string with the peice associated with schema one
    return /*<result-of-query-on-schema-one>*/;
  }
},{
  schema: /*<schema-two>*/,
  resolve: function(query) {
    // query is a string with the peice associated with schema two
    return /*<result-of-query-on-schema-two>*/;
  }
}
], combinedQuery, optionalDeepmergeOptions);
```

See the documentation for the `deepmerge` npm module for the `optionalDeepmergeOptions`.

[build-badge]: https://circleci.com/gh/brysgo/graphql-gateway.svg?style=shield

[build]: 
https://circleci.com/gh/brysgo/graphql-gateway

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/graphql-gateway