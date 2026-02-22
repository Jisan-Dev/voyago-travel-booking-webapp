import PaymentForm from "@/components/payment/payment-form";
import { getHotelById } from "@/DAL";
import { auth } from "@/lib/auth";
import { getDayDifference } from "@/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PaymentPage = async ({
  searchParams,
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ checkin: string; checkout: string }>;
}) => {
  const { id } = await params;
  const { checkin, checkout } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return redirect("/login");

  const hotelInfo = await getHotelById(id, checkin, checkout);
  const days = getDayDifference(checkin, checkout);
  const basePrice = (hotelInfo?.lowRate + hotelInfo?.highRate) / 2;
  const totalCost = basePrice * days;

  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-25">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          You have picked <b>{hotelInfo?.name}</b> for <b>{days} night(s)</b> and base price is{" "}
          <b>${basePrice}</b>
        </p>
        <PaymentForm
          checkin={checkin}
          checkout={checkout}
          hotelInfo={hotelInfo}
          totalCost={totalCost}
        />
      </div>
    </section>
  );
};

export default PaymentPage;
