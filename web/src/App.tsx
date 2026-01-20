import { Button } from "./components/ui/button";

/**
 * Root application view with a centered blue “Hello World” button.
 */
export default function App(): JSX.Element {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-slate-950 px-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Button className="bg-blue-600 text-white hover:bg-blue-500" type="button">
        Hello World
      </Button>
    </main>
  );
}

