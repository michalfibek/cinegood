import { TMovie } from "../../types/movie";

export default function MovieItem({ movie }: { movie: TMovie }) {
  return (
    <a href="#">
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
    </a>
  );
}
