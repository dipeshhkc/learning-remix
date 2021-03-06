import { Joke } from '.prisma/client';
import { LoaderFunction } from '@remix-run/server-runtime';
import { Link, useLoaderData } from 'remix';
import { db } from '~/utils/db.server';

type LoaderData = { joke: Joke };

export let loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({ where: { id: params.jokeId } });
  if (!joke) throw new Error('Joke Not Found');
  return { joke };
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}
