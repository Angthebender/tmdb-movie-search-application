import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
export default function App() {
  const [page, setPage] = useState(1);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [query, setQuery] = useState("");
  const [resetPage, setResetPage] = useState(false);
  console.log("query", query);
  if (scrollToTop === true) {
    scrollTo({ top: 0, behavior: "smooth" });
  } //scroll is going to be a function that changes the value of teh setScrollToTop
  useEffect(() => {
    if (resetPage === true) {
      console.log("resetpage:", resetPage);
      setQuery("");
      setResetPage(() => false);
    }
  }, [resetPage]);
  return (
    <>
      <NavBar resetPage={setResetPage} onQueryChange={setQuery}></NavBar>
      <Content query={query} page={page}></Content>
      <Footer
        onPageChange={setPage}
        currentPage={page}
        scroll={setScrollToTop}
      ></Footer>
    </>
  );
}
