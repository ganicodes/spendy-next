import { Button } from "@/components/ui/button";
import Link from "next/link";

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1>Hello, Home page!</h1>
      <Button asChild>
        <Link href={"/auth"} className="">
          Go to Auth
        </Link>
      </Button>
    </section>
  );
}
