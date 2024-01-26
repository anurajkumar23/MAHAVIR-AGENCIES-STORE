interface CartItemInfoProps {
  product: Record<string, any>;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({
  product
}) => {
  return ( 
    <div>
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-black">
          {product.name}
        </p>
      </div>

      <div className="mt-1 flex text-sm">
        <p className="text-gray-500">{product.color}</p>
        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
      </div>

      <div className="mt-1 flex items-center text-sm">
        {product.discountedPrice && (
          <>
            <p className="text-gray-500 line-through">{product.price}</p>
            <p className="ml-4 text-gray-900">{product.discountedPrice}</p>
          </>
        )}
        {!product.discountedPrice && (
          <p className="text-gray-900">{product.price}</p>
        )}
      </div>
    </div>
  );
}
 
export default CartItemInfo;
