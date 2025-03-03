'use client';

import { ProductsPageInitialData } from '@/app/products/page';
import { useGetProducts } from '@/services';
import { Product } from '@/types/general';
import { useCallback, useEffect, useRef } from 'react';
import Card from '../Card/Card';

interface ProductsProps {
  initialData: ProductsPageInitialData;
}

const Products = ({ initialData }: ProductsProps) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetProducts(initialData);
  const observer = useRef<IntersectionObserver | null>(null);

  const xRef = useRef({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  xRef.current = {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };

  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    const { isFetchingNextPage, fetchNextPage, hasNextPage } = xRef.current;
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  console.log('page', hasNextPage);
  useEffect(() => {
    if (data?.pages) {
      const currentPage = data.pages.length;
      const newUrl = `?page=${currentPage}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [data?.pages?.length]);

  return (
    <>
      {data?.pages.map((page, pageIndex) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
          key={pageIndex}
        >
          {page?.map((item: Product, index: number) => {
            const isLastItem = pageIndex === data.pages.length - 1 && index === page.length - 1;
            return (
              <div key={item.id || index} ref={isLastItem ? lastItemRef : null}>
                <Card key={item.id} item={item} />
              </div>
            );
          })}
        </div>
      ))}
      <noscript>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          {data && data.pages.length > 1 && (
            <a href={`?page=${data.pages.length - 1}`} style={{ marginRight: '1rem' }}>
              Previous Page
            </a>
          )}
          {hasNextPage && <a href={`?page=${data ? data.pages.length + 1 : 2}`}>Next Page</a>}
        </div>
      </noscript>
    </>
  );
};

export default Products;
