
import Link from 'next/link';
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import SearchBar from "@/components/ui/SearchBar";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b ">
  
        <div className="   flex h-16 items-center w-full">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2 w-[5%] pl-4">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <div className="flex  overflow-hidden space-x-2 ">
            <SearchBar />
            <NavbarActions />
          </div>
        </div>
    
    </div>
  );
};

export default Navbar;
