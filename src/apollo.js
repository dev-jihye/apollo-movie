import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      Movie: {
        fields: {
          isLiked: {
            merge(existing, incoming) {
              if (existing) {
                return existing;
              } else {
                return incoming;
              }
            },
          },
        },
      },
    },
  }),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: (isLiked) => !isLiked,
          },
        });
      },
    },
  },
});

export default client;
