import { TMovie } from '../../types/movie';

export default function MovieDetail({ movie }: { movie: TMovie }) {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Year: {movie.year}</p>
      <p>Runtime: {movie.runtime}</p>
    </div>
  );
}
