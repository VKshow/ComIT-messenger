import { useCheckAuth } from "../hooks";

export default function Anotherpage() {
  useCheckAuth();

  return (
    <section>
      <h1>Another Page</h1>
      hello... This is another page.
    </section>
  );
}