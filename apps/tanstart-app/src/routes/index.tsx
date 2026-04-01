import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@issue-tracker/ui/components";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <Button>Hello World</Button>
    </main>
  );
}
