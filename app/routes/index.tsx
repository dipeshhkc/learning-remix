import { LinksFunction } from '@remix-run/server-runtime';
import stylesUrl from '../styles/index.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesUrl,
    },
  ];
};

export default function IndexRoute() {
  return (
    <div className="heading">
      Hello Index Route
      <p className="subHeading">This is subheading</p>
    </div>
  );
}
