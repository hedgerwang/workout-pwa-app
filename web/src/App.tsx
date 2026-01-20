import { Button } from "./components/ui/button";
import mst from "./i18n/mst";
import Msg from "./i18n/Msg";

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
        <Msg desc="A test button" text="Hello World" />
      </Button>
    </main>
  );
}

