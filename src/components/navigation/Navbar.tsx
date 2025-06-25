import { NavbarMenuItem } from "./NavbarMenuItem";

export const Navbar = () => {
  return (
    <nav className="p-6 border-b">
      <ul className="flex items-center  gap-6 max-w-3xl mx-auto px-6">
        {NAVIGATION_ITEMS.map((item) => (
          <li key={item.label}>
            <NavbarMenuItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

const NAVIGATION_ITEMS = [
  {
    label: "Tasks",
    items: [
      { label: "Manage tasks", href: "/" },
      { label: "Add task", href: "/add/task" },
    ],
  },
  {
    label: "Categories",
    items: [
      { label: "Manage categories", href: "/categories" },
      { label: "Add category", href: "/add/category" },
    ],
  },
];
