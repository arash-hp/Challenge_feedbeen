import { ProductsPageInitialData } from '@/app/products/page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';

export const FETCH_POSTS_LIMIT = 18;

export interface ProductPageParam {
  page: number;
  limit: number;
}
export const initialProductsPageParam = { page: 1, limit: 20 };

export default async function getProducts({ pageParam: { page, limit } }: { pageParam: ProductPageParam }) {
  const res = await axiosInstance(`products?page=${page}&limit=${limit}`);
  return res.data;
}

export const useGetProducts = (initialData: ProductsPageInitialData) => {
  return useInfiniteQuery({
    queryKey: ['Products', initialData.pages],
    queryFn: getProducts,
    enabled: !!initialData.pages,
    initialData,
    initialPageParam: initialProductsPageParam,
    getNextPageParam(lastPage, allPages, lastPageParam) {
      const pageParam = !lastPageParam ? initialProductsPageParam : { ...lastPageParam, page: lastPageParam.page + 1 };
      return pageParam;
    },
    refetchOnWindowFocus: false,
  });
};
