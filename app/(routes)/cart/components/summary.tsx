// Import statements
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  // Calculate total price, original price, and savings
  const totalPrice = items.reduce((total, item) => total + Number(item.discountedPrice), 0);
  const originalPrice = items.reduce((total, item) => total + Number(item.price), 0);
  const savings = originalPrice - totalPrice;

  // Handle checkout
  const onCheckout = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => item.id)
      });

      window.location = response.data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Error during checkout. Please try again.');
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        {/* List Price */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">List Price</div>
          <div className="flex items-center">
            <span className="line-through text-gray-500 ml-2">
              <Currency value={originalPrice} />
            </span>
          </div>
        </div>
        {/* Selling Price */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Selling Price</div>
          <div className="flex items-center">
            <span className="ml-2">
              <Currency value={originalPrice} />
            </span>
          </div>
        </div>
        {/* Extra Discount */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Extra Discount</div>
          <Currency value={-savings} />
        </div>
        {/* Order total */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      {/* Checkout button */}
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
