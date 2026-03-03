import { Spinner } from "./ui/spinner";

export default function LoaderComponent() {
  return (
    <div className="flex h-full items-center justify-center col-span-9">
      <div className="flex flex-col items-center space-y-4 text-primary -ml-10 -mt-10">
        <p className="text-2xl tracking-wide font-bold uppercase">Loading...</p>
        <Spinner className="size-10" />
      </div>
    </div>
  );
}
