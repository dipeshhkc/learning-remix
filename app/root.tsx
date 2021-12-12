import { Links, LinksFunction, LiveReload, Outlet } from 'remix';
import stylesUrl from './styles/tailwind.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesUrl,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        <p className="text-green-700 text-5xl">HELLO</p>
        <Outlet />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  );
}
