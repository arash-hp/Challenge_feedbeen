'use client';
import { memo } from 'react';
import { Box, Button, AppBar as MUI_AppBar, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Container } from '../../components';
import { styles } from './styles';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/Products' },
];

const AppBar = () => {
  const router = useRouter();

  return (
    <MUI_AppBar component="nav" position="sticky">
      <Container>
        <Toolbar>
          <Box sx={styles.logo}>
            <Typography>LOGO</Typography>
          </Box>
          <Box>
            {navItems.map((item, index) => (
              <Button key={index} sx={styles.button} onClick={() => router.push(item.path)}>
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </MUI_AppBar>
  );
};

export default memo(AppBar);
