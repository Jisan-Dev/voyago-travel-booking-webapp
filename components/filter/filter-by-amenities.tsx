const FilterByAmenities = () => {
  return (
    <div>
      <h3 className="font-bold text-lg">Amenities</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="wifi" className="flex items-center gap-2 cursor-pointer">
          <input className="w-4 h-4 accent-primary" type="checkbox" name="wifi" id="wifi" />
          Wi-fi
        </label>

        <label htmlFor="swimmingPool" className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 accent-primary"
            type="checkbox"
            name="swimmingPool"
            id="swimmingPool"
          />
          Swimming Pool
        </label>
      </form>
    </div>
  );
};

export default FilterByAmenities;
