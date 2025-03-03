import { ProductList } from '@/components';
import getProducts, { initialProductsPageParam, ProductPageParam } from '@/services/useGetProducts';
import { Product } from '@/types/general';
import { InfiniteData } from '@tanstack/react-query';
import { NextPage } from 'next';

export type ProductsPageInitialData = InfiniteData<Product[], ProductPageParam>;

type SearchParam = Partial<Omit<ProductPageParam, 'limit'>>;
interface ProductsPageProps {
  searchParams: Promise<SearchParam>;
}
const Products: NextPage<ProductsPageProps> = async ({ searchParams }) => {
  const page = +((await searchParams).page || initialProductsPageParam.page);

  const pageParam: ProductPageParam = { page: page, limit: initialProductsPageParam.limit };
  if (page !== 1) {
    pageParam.page = 1;
    pageParam.limit = page * initialProductsPageParam.limit;
  }
  const productList = await getProducts({ pageParam });
  const initialData: ProductsPageInitialData = { pages: [], pageParams: [] };

  for (let i = 0; i < page; i++) {
    const start = initialProductsPageParam.limit * i;
    const end = Math.min(initialProductsPageParam.limit + start, productList.length);
    const pageProducts: Product[] = [];
    for (let j = start; j < end; j++) {
      pageProducts.push(productList[j]);
    }
    initialData.pages.push(pageProducts);
    initialData.pageParams.push({ ...initialProductsPageParam, page: i + 1 });
  }
  console.log('test', productList.length);

  return (
    <div>
      <ProductList initialData={initialData} />
    </div>
  );
};

export default Products;
