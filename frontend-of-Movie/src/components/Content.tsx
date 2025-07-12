import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

interface Props {
  query: string;
  page: number;
}
interface Movie {
  id: number;
  original_title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}

export default function Content({ query, page }: Props) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            query
          )}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

      const res = await fetch(endpoint);
      const data = await res.json();

      const newData = data.results.map((movie: Movie) => ({
        id: movie.id,
        original_title: movie.original_title,
        overview: movie.overview,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        poster_path: movie.poster_path,
      }));

      setMovieList(newData);
    }

    fetchData();
  }, [query, page]); // ✅ Only refetch when query or page changes

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {movieList.map((movie, index) => (
        <Card key={index} style={{ width: "210px", position: "relative" }}>
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            style={{ height: "287px", objectFit: "cover" }}
          />

          <Card.Body>
            <Card.Title>{movie.original_title}</Card.Title>
            <Card.Text>
              {movie.overview.length > 100
                ? movie.overview.slice(0, 100) + "..."
                : movie.overview}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <p className="p-0 m-0">Rating: {movie.vote_average}</p>
            <p className="p-0 m-0">Votes: {movie.vote_count}</p>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
