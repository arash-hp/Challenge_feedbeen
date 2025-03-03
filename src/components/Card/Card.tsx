import { FC, memo } from 'react';

import { Product } from '../../types/general';
interface CardProps {
  item: Product;
}

const Card: FC<CardProps> = ({ item }) => {
  return (
    <div
      style={{
        flex: ' 1 0 calc(33.33% - 10px)',
        backgroundColor: ' #f0f0f0',
        padding: '20px',
        boxSizing: 'border-box',
        textAlign: 'center',
        border: ' 1px solid #ccc',
      }}
    >
      <div>
        <img width={200} height={150} src={`${item.image}`} alt={item.title} />
      </div>
      <div>
        <p>{item.name}</p>
      </div>
      <p>${item.price}</p>
      <div>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};
export default memo(Card);
