import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

interface Props {
  onPageChange: (page: number) => void;
  currentPage: number;
  scroll: (shouldScroll: boolean) => void;
}
export default function Footer({ onPageChange, currentPage, scroll }: Props) {
  const active = currentPage;
  let newActive = active;
  const [maxPage, setMaxPage] = useState(1);
  let numPage = maxPage;
  const minus = () => {
    newActive = active;

    if (newActive > 1) {
      newActive--;
      console.log(newActive);

      onPageChange(newActive);
      scroll(true);
    }
    return newActive;
  };
  const plus = () => {
    //norden add a logic where the maximum page reached stays so you can update it later thank you
    newActive = active;
    newActive++;
    if (newActive > maxPage) {
      numPage = maxPage;
      numPage++;
      console.log("this is teh maximum page :", numPage);
      setMaxPage(numPage);
    }

    onPageChange(newActive);
    console.log(newActive);
    scroll(true);
    return newActive;
  };
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          scroll(true);
          onPageChange(number);
          /*if (5 === maxPage) { 
            numPage = maxPage;
            numPage++;
            console.log("this is teh maximum page :", numPage);
            setMaxPage(numPage);
            fix this shit i want to update the max page 
          }*/
        }}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="nav-buttons d-flex justify-content-center alight-item-center mt-3 me-5">
        <button
          onClick={minus}
          className=" btn btn-secondary pe-3 ps-3 pt-1 "
          style={{ borderRadius: "3px" }}
        >
          {" "}
          Previous
        </button>
        <i
          className=" btn btn-info me-2 ms-2 "
          style={{ fontFamily: "Arial (sans-serif)", fontWeight: "bold" }}
        >
          {active}
        </i>

        <button
          onClick={plus}
          className=" btn btn-secondary pe-3 ps-3 pt-1 border-raidus-3"
        >
          {" "}
          Next
        </button>
      </div>
    </>
  );
}
