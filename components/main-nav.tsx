"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ShoppingCart } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(
    null
  );
  const pathname = usePathname();

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setOpen(false);
  };
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  React.useEffect(() =>{
    console.log(data.length,"🎉🎉🎉🎉🎉")
    console.log(category,"🎉🎉🎉🎉🎉")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if(data.length > 0){
      setCategory(true)
    } else{
      setCategory(false)
    }
  },[category, data.length])

  



  return (
    <nav className=" flex items-center  md:block w-[55%]  lg:w-[64%]  ml-[3rem]">
      <div className="md:hidden block">
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          <button
            className={cn("w-[200px] justify-between", data)}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label="Select a category"
            onClick={() => setOpen(!open)}
          >
            {selectedCategory ? selectedCategory.name : "Select Category"}
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search category..." />
              {category ?  "" :(<CommandEmpty>No category found.</CommandEmpty>)}
              <CommandGroup heading="Categories">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-black flex",
                      route.active ? "text-black" : "text-neutral-500"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      </div>
      <div className="hidden md:block overflow-auto">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black mr-[1rem]",
              route.active ? "text-black" : "text-neutral-500"
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
