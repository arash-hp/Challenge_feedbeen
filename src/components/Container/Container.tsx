import { ContainerProps, Container as MUIContainer } from '@mui/material';
import { ReactNode } from 'react';

interface containerTypes extends ContainerProps {
  children: ReactNode;
}
const Container = (props: containerTypes) => {
  const { maxWidth, children } = props;
  return <MUIContainer maxWidth={maxWidth}>{children}</MUIContainer>;
};

export default Container;
