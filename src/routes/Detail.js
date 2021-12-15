import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100%;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  /* display: flex; */
  /* justify-content: space-around;
  align-items: center; */
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 60px 0;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 34px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 28px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 18px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  width: 25%;
  min-height: 600px;
  background-color: transparent;
`;

const SuggestionWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px;
`;

const SuggestPoster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  width: 25%;
  min-height: 600px;
  background-color: transparent;
  margin: 10px;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });
  return (
    <Container>
      <Wrapper>
        <Column>
          <Title>
            {loading
              ? "Loading..."
              : `${data.movie.title} ${data.movie.isLiked ? "💖" : "💔"}`}
          </Title>
          <>
            <Subtitle>
              {data?.movie?.language} &middot; ⭐️ {data?.movie?.rating}
            </Subtitle>
            <Description>{data?.movie?.description_intro} </Description>
          </>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </Wrapper>
      <SuggestionWrapper>
        {data?.suggestions?.map((m) => (
          <SuggestPoster key={m.id} id={m.id} bg={m.medium_cover_image} />
        ))}
      </SuggestionWrapper>
      {/* <Poster bg={data?.suggestions?.medium_cover_image}></Poster> */}
    </Container>
  );
};
