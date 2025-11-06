import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, root } from './schema';

const app = express();
const port = 4000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`GraphQL server running on http://localhost:${port}/graphql`);
});