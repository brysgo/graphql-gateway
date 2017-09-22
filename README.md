# graphql-gateway

[![Greenkeeper badge](https://badges.greenkeeper.io/brysgo/graphql-gateway.svg)](https://greenkeeper.io/)

[![CircleCI][build-badge]][build]
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

## Alternatives

This tool is really lightweight and useful when you control all the underlying APIs and don't need any join functionality. Some really cool alternatives have been popping up, and while I haven't done a full evaluation, I'd like to point them out.

* [graphql-weaver](https://github.com/AEB-labs/graphql-weaver)
* [graphql-tools](https://github.com/stubailo/schema-stitching-demo)

[build-badge]: https://circleci.com/gh/brysgo/graphql-gateway.svg?style=shield

[build]: 
https://circleci.com/gh/brysgo/graphql-gateway

[npm-badge]: https://img.shields.io/npm/v/graphql-gateway.png?style=flat-square
[npm]: https://www.npmjs.org/package/graphql-gateway
[npm-downloads-badge]:https://img.shields.io/npm/dt/graphql-gateway.svg