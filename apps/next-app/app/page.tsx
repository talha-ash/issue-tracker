import { Button } from "@issue-tracker/ui/components";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center dark:bg-emerald-200 font-sans bg-amber-600">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-brown dark:bg-brown sm:items-start">
        <Button>Hello World</Button>
      </main>
    </div>
  );
}
