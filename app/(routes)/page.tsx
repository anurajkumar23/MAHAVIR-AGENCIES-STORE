import Link from 'next/link';
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import Container from "@/components/ui/container";
import Slider from "@/components/ui/swiper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const newProducts = await getProducts({ newArrivals: true });
  const billboard = await getBillboard();
  const categories = await getCategories();

  const categoriesWithImageUrl = categories.map((category) => ({
    ...category,
    imageUrl: category.imageUrl // Add the imageUrl property here
  }));

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Slider data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4 text-black">EXPLORE CATEGORIES</h2>
          <ScrollArea className="w-full  rounded-md border overflow-hidden">
            <div className="flex space-x-4 p-4">
              {categoriesWithImageUrl.map((category) => (
                <figure key={category.id} className="flex-shrink-0">
                  <Link href={`/category/${category.id}`}>
                    <div className="overflow-hidden rounded-md border">
                        <Image
                          src={category.imageUrl} 
                          alt={`Category: ${category.name}`}
                          className="w-20 h-20 object-cover rounded-md"
                          width={50}
                          height={50}
                        />
                      </div>
                  </Link>
                  <figcaption className="mt-1 text-xl text-black text-center">
                    {category.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <ProductList title="Featured Products" items={products} />
          <ProductList title="NEW ARRIVALS" items={newProducts} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
