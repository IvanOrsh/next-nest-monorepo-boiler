import { add } from "@next-nest-monorepo-boiler/sample-lib";

export default function Home() {
  return (
    <main>
      <h1>Testing &laquo;sample-lib&raquo; from this monorepo:</h1>
      <p>{`add(1, 2) = ${add(1, 2)}`}</p>
    </main>
  );
}
