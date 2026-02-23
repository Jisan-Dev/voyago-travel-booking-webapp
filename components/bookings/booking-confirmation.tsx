import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface BookingConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingConfirmationModal = ({ open, onOpenChange }: BookingConfirmationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="mt-4 text-center text-2xl font-bold">
            Booking Confirmed!
          </DialogTitle>
          <DialogDescription className="mt-2 text-center text-gray-500">
            Your payment was successful and your booking is confirmed. A confirmation email has been
            sent to you.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Link href="/bookings">
            <Button className="w-full sm:w-auto">Go to Bookings</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationModal;
