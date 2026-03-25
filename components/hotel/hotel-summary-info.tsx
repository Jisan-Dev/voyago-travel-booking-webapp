"use client";

import { getRatings, getReviewsCount } from "@/DAL";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";

const HotelSummaryInfo = ({
  fromListPage,
  info,
  checkin,
  checkout,
}: {
  fromListPage: boolean;
  info: any;
  checkin: string;
  checkout: string;
}) => {
  // const totalReviews = await getReviewsCount(info?._id);
  // const ratingsArr = await getRatings(info?._id);

  const [totalReviews, setTotalReviews] = useState(0);
  const [ratingsArr, setRatingsArr] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalReviews = await getReviewsCount(info?._id);
        const ratingsArr = await getRatings(info?._id);
        setTotalReviews(totalReviews);
        setRatingsArr(ratingsArr);
      } catch (error) {
        console.log("fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [info?._id]);

  let avgRating = 0;

  if (ratingsArr.length === 1) avgRating = ratingsArr[0].rating;
  if (ratingsArr.length > 1) {
    avgRating =
      ratingsArr.reduce((acc: number, curr: any) => acc + curr.rating, 0) / ratingsArr.length;
  }

  const getRatingStatus = (avgRating: number) => {
    if (avgRating === 0) {
      return "No Ratings Yet!";
    } else if (avgRating > 0 && avgRating <= 2) {
      return "Poor";
    } else if (avgRating > 2 && avgRating <= 3) {
      return "Average";
    } else if (avgRating > 3 && avgRating <= 4) {
      return "Good";
    } else if (avgRating > 4) {
      return "Very Good";
    }
  };

  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <h2 className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl text-primary"}>
          {info?.name}
        </h2>
        <p>📍 {info?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <div className="bg-primary px-2 h-8.75 rounded-sm text-neutral-900 place-items-center font-bold flex">
            {loading ? <Spinner /> : <span>{avgRating}</span>}
            {ratingsArr.length > 0 && <span>{`(${ratingsArr.length})`}</span>}
          </div>
          <div className="text-sm">
            <span className="font-semibold">{getRatingStatus(avgRating)}</span>
            <p>
              {totalReviews === 0 ? (
                <Link href="#" className="underline hover:text-primary transition-colors">
                  Be the first one to review
                </Link>
              ) : (
                <Link href={`/hotel/${info._id}/reviews`} className="underline">
                  {totalReviews} Reviews
                </Link>
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {/* <span className="bg-yellow-300 p-1 rounded-md text-sm dark:text-background">
            {info?.propertyCategory} Star Property
          </span> */}
          <Badge className="h-5.5">{info?.propertyCategory} Star Property</Badge>

          {info?.isBooked && (
            // <span className="bg-red-300 text-red-950 p-1 px-2 rounded-md text-xs">BOOKED!</span>
            <Badge className="h-5.5" variant="destructive">
              BOOKED!
            </Badge>
          )}
        </div>
      </div>

      <div className="flex sm:flex-col sm:gap-2 sm:items-end sm:justify-center items-center justify-between max-sm:mt-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold sm:text-right">
            ${(info?.highRate + info?.lowRate) / 2}/night
          </h2>
          <p className="sm:text-right">Per Night for 1 Room</p>
        </div>
        {fromListPage ? (
          <Link
            href={`/hotels/${info._id}?checkin=${checkin}&checkout=${checkout}`}
            className="btn-primary text-neutral-900!"
          >
            Details
          </Link>
        ) : (
          <Link
            href={
              info?.isBooked
                ? "#"
                : `/hotels/${info._id}/payment?checkin=${checkin}&checkout=${checkout}`
            }
          >
            <button disabled={info?.isBooked} className="btn-primary text-neutral-900!">
              Book
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default HotelSummaryInfo;
