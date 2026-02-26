import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ amount: string }>;
}) {
  const { amount } = await searchParams;
  return (
    <Card className="max-w-3xl mx-auto mt-32">
      <CardHeader className="flex flex-col items-center">
        <CheckCheck className="text-green-500 h-10 w-10" />
        <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        <CardDescription>Thank you for your payment.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-lg">You successfully sent</p>
        <div className="text-4xl font-bold">${amount}</div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button asChild>
          <Link href="/bookings">Go to your bookings</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
