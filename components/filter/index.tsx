import SortHotel from "../sort-hotel";
import FilterByPriceRange from "./filter-by-price-range";
import FilterByStarCategory from "./filter-by-star-category";

const Filter = () => {
  return (
    <>
      <div className="col-span-3 space-y-4 border-r mr-8">
        <SortHotel />

        <FilterByPriceRange />

        <FilterByStarCategory />

        {/* <FilterByAmenities /> */}
      </div>
    </>
  );
};

export default Filter;
