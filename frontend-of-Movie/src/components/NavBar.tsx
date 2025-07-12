import { useEffect, useState } from "react";

interface Props {
  onQueryChange: (query: string) => void;
  resetPage: (reset: boolean) => void;
}

export default function NavBar({ onQueryChange, resetPage }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuerry, setDebouncedQuerry] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuerry(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuerry) {
      onQueryChange(debouncedQuerry);
    }
  }, [debouncedQuerry]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid justify-content-center text-align-center">
          <i
            className="bi bi-house fs-3 ms-4 me-auto"
            onClick={() => {
              setQuery("");
              resetPage(true);
            }}
          ></i>
          <form className="d-flex mx-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </form>
        </div>
      </nav>
    </>
  );
}
