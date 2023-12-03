"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

import { useState } from 'react';
import { Menu } from 'lucide-react'; // Puedes cambiar el ícono del menú según tus preferencias

interface MainNavProps {
  data: Category[];
  className?: string;
}

const MainNav: React.FC<MainNavProps> = ({ data, className }) => {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
        <nav className={`mx-6 flex items-center space-x-4 lg:space-x-6 ${className}`}>
        {/* Botón de menú para dispositivos móviles */}
        <button
            className="lg:hidden text-neutral-500"
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
        >
            <Menu size={24} />
        </button>

        {/* Menú desplegable para dispositivos móviles */}
        <div
        className={`${
            isMenuOpen ? 'block' : 'hidden'
        } lg:hidden absolute top-16 left-0 right-0 bg-white p-4 flex flex-col space-y-3 z-40`}
        >
        {routes.map((route) => (
            <Link
            key={route.href}
            href={route.href}
            className={cn(
                'text-sm font-medium transition-colors hover:text-black',
                route.active ? 'text-black' : 'text-neutral-500'
            )}
            >
            {route.label}
            </Link>
        ))}
        </div>
        {/* Enlaces de navegación para dispositivos no móviles */}
        <div className="hidden lg:flex items-center space-x-4">
            {routes.map((route) => (
            <Link
                key={route.href}
                href={route.href}
                className={cn(
                'text-sm font-medium transition-colors hover:text-black',
                route.active ? 'text-black' : 'text-neutral-500'
                )}
            >
                {route.label}
            </Link>
            ))}
        </div>
        </nav>
  );
};

export default MainNav;