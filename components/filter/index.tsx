import SortHotel from "../sort-hotel";
import FilterByPriceRange from "./filter-by-price-range";
import FilterByStarCategory from "./filter-by-star-category";

const Filter = () => {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b">
        <SortHotel />
      </div>

      <div className="pb-6 border-b">
        <FilterByPriceRange />
      </div>

      <FilterByStarCategory />

      {/* <FilterByAmenities /> */}
    </div>
  );
};

export default Filter;
