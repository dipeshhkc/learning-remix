import { Link, LoaderFunction, Outlet, useLoaderData } from 'remix';
import { db } from '~/utils/db.server';

type LoaderData = { jokeListItems: { id: string; name: string }[] };

export let loader: LoaderFunction = async () => {
  let data: LoaderData = {
    jokeListItems: await db.joke.findMany(),
  };
  return data;
};

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>J🤪KES</h1>
      <ul>
        {data.jokeListItems.map((joke) => (
          <li key={joke.id}>
            <Link to={joke.id}>{joke.name}</Link>
          </li>
        ))}
      </ul>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
