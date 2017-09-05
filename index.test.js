const { parse, buildASTSchema } = require("graphql");
const graphqlGateway = require("./");

const schema1 = buildASTSchema(
  parse(`
    type Query {
      this(hasAnArgument: Int): [Bar]!
      thing: Int!
    }
    type Bar {
      id: ID!
      a: Int
    }
    `)
);

const schema2 = buildASTSchema(
  parse(`
    type Query {
      this(hasADifferentArgument: String): [Bar]!
      random: String
    }
    type Bar {
      id: ID!
      is: String
    }
    `)
);

test("splitting requests and merging results of two simple schemas", function() {
  const metaSchema = [
    {
      schema: schema1,
      resolve: function(query) {
        expect(query).toMatchSnapshot();
        return {
          this: [{ id: "foo", a: 2 }, { id: "bar", a: 3 }],
          thing: 32
        };
      }
    },
    {
      schema: schema2,
      resolve: function(query) {
        expect(query).toMatchSnapshot();
        return {
          this: [{ id: "foo", is: "two" }, { id: "bar", is: "three" }],
          random: "stuff"
        };
      }
    }
  ];
  const result = graphqlGateway(
    metaSchema,
    `
    query SomeQuery {
      this(hasAnArgument: 5, hasADifferentArgument: "foo") {
        id
        is
        a
      }
      random
      thing
    }
  `
  );
  expect(result).toMatchSnapshot();
});
