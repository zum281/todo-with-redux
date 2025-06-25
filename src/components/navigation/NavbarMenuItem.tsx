import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Link, useLocation } from "wouter";
import type { FC } from "react";

export const NavbarMenuItem: FC<NavbarMenuItemProps> = ({ label, items }) => {
  if (!Array.isArray(items)) return <ItemBase {...items} />;
  if (items.length === 1) return <ItemBase {...items[0]} />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{label}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem key={item.href}>
            <ItemBase {...item} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ItemBase: FC<ItemBaseProps> = ({ href, label }) => {
  const [location] = useLocation();
  return (
    <Link
      href={href}
      className="hover:font-semibold data-[active=true]:font-semibold"
      data-active={location === href}
    >
      {label}
    </Link>
  );
};

interface NavbarMenuItemProps {
  label: string;
  items: ItemBaseProps | ItemBaseProps[];
}

interface ItemBaseProps {
  href: string;
  label: string;
}
