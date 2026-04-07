/**
 * v0 by Vercel.
 * @see https://v0.app/t/r842HelLUm8
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Spinner } from "@/components/ui/spinner";

export default function Component() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-primary">
        <Spinner className="size-12" />
      </div>
    </div>
  );
}
