import { Link, useLocation } from "wouter";

export const Navbar = () => {
  const [location] = useLocation();
  return (
    <nav className="p-6 border-b">
      <ul className="flex items-center  gap-6 max-w-2xl mx-auto px-6">
        <li>
          <Link
            href="/"
            className="hover:underline data-[active=true]:font-semibold"
            data-active={location === ("/" as string)}
          >
            Tasks
          </Link>
        </li>
        <li>
          <Link
            href="/categories"
            className="hover:underline data-[active=true]:font-semibold"
            data-active={location === ("/categories" as string)}
          >
            Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
};
