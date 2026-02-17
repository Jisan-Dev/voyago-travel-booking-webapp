import Search from "@/components/search/search";

const refinedCategory = (category: string) => {
  const decodedCategory = decodeURI(category);
  if (decodedCategory === "undefined") return "";
  return decodedCategory;
};

type HotelListPageProps = {
  searchParams: Promise<{
    destination: string;
    checkin: string;
    checkout: string;
    category: string;
    price: string;
    sort: string;
  }>;
};

const HotelListPage = async ({ searchParams }: HotelListPageProps) => {
  const { destination, checkin, checkout, category, price, sort } = await searchParams;
  return (
    <>
      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
        <div className="container items-center py-12 ">
          <Search fromList={true} destination={destination} checkin={checkin} checkout={checkout} />
        </div>
      </section>
      {/* <section className="py-12">
        <div className="container grid grid-cols-12">
          <Filter />
          <HotelList
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            category={refinedCategory(category)}
            price={decodeURI(price)}
            sort={sort}
          />
        </div>
      </section> */}
    </>
  );
};

export default HotelListPage;
