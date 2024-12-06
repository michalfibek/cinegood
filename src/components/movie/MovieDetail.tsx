import { TMovie } from "../../types/TMovie";
import styled from "styled-components";
import { Star as StarIcon } from "@styled-icons/heroicons-solid";
import MovieRecord from "./elements/MovieRecord";

const Container = styled.article`
  display: flex;
  flex-flow: row;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem;
  border-radius: 1rem;
  background: #304242;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Header = styled.header`
  display: flex;

  div {
    flex-grow: 1;
  }
`;

const PosterContainer = styled.div`
  flex: 0 0 300px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    max-width: 100%;
    order: 1;
  }
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  align-self: flex-start;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    color: #f39c12;
  }
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex-grow: 3;

  @media (max-width: 768px) {
    order: 0;
  }
`;

const MoviePoster = styled.img`
  object-fit: cover;
  border-radius: 8px;
  max-width: 350px;
  width: 100%;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MovieInfo = styled.aside`
  display: flex;
  flex-flow: row wrap;
  row-gap: 0.5rem;
  column-gap: 1.5rem;
`;

const Section = styled.div`
  flex: 2 1 auto;
  min-width: 220px;
`;

const MainTitle = styled.h1`
  color: #e6fffd;
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
`;

const MovieMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.25em;

  @media (max-width: 400px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const MovieType = styled.span`
  &::after {
    content: "•";
    margin-left: 0.5rem;
  }
`;

const MovieYear = styled.time``;

const SectionTitle = styled.h3`
  margin: 0 0 1rem;
`;

const WebsiteLink = styled.a`
  color: #e6fffd;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function MovieDetail({ movie }: { movie: TMovie }) {
  return (
    <Container>
      <PosterContainer>
        {movie.poster && <MoviePoster src={movie.poster} alt={movie.title} />}
      </PosterContainer>
      <MainInfo>
        <Header>
          <div>
            <MainTitle>{movie.title}</MainTitle>
            <MovieMeta>
              {movie.type && <MovieType>{movie.type}</MovieType>}
              <MovieYear dateTime={movie.year.toString()}>{movie.year}</MovieYear>
            </MovieMeta>
          </div>
          <FavoriteButton>
            <StarIcon size={32} />
          </FavoriteButton>
        </Header>

        <Section>
          <MovieRecord record={movie.plot} />
        </Section>

        <MovieInfo>
          <Section>
            <MovieRecord
              label="Runtime"
              record={movie.runtime}
              onFormat={(record) => `${record} minutes`}
            />
            <MovieRecord label="Rated" record={movie.rated} />
            <MovieRecord label="Genre" record={movie.genre} />
            <MovieRecord
              label="Release date"
              record={movie.released}
              onFormat={(record) => record.toLocaleDateString()}
            />
          </Section>

          <Section>
            <MovieRecord label="Director" record={movie.director} />
            <MovieRecord label="Writer" record={movie.writer} />
            <MovieRecord label="Actors" record={movie.actors} />
            <MovieRecord label="Production" record={movie.production} />
          </Section>

          <Section>
            <MovieRecord label="Language" record={movie.language} />
            <MovieRecord label="Awards" record={movie.awards} />
            <MovieRecord label="Box Office" record={movie.boxOffice} />
            <MovieRecord
              label="Website"
              record={movie.website}
              onFormat={(record) => (
                <WebsiteLink href={record?.toString()} target="_blank" rel="noopener noreferrer">
                  {record}
                </WebsiteLink>
              )}
            />
          </Section>
        </MovieInfo>

        {movie.ratings && (
          <Section>
            <SectionTitle>Ratings</SectionTitle>
            {movie.ratings.map((rating) => (
              <MovieRecord key={rating.Source} label={rating.Source} record={rating.Value} />
            ))}
          </Section>
        )}
      </MainInfo>
    </Container>
  );
}
