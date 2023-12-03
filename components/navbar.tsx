import Link from "next/link";
import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          {/* MainNav para dispositivos grandes */}
          <MainNav data={categories} className="flex lg:hidden ml-4" />
          
          {/* Link del logotipo */}
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">Import e-nova</p>
          </Link>
          
          {/* MainNav para dispositivos pequeños */}
          <MainNav data={categories} className="hidden lg:flex" />
          
          
          {/* NavbarActions */}
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

