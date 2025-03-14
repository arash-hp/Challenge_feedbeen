'use client';
import { memo } from 'react';
import { Box, Button, Container, AppBar as MUI_AppBar, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
];

const AppBar = () => {
  const router = useRouter();

  return (
    <MUI_AppBar component="nav" position="sticky">
      <Container>
        <Toolbar>
          <Box sx={{ flex: 1 }}>
            <Typography>LOGO</Typography>
          </Box>
          <Box>
            {navItems.map((item, index) => (
              <Button key={index} sx={{ color: 'white' }} onClick={() => router.push(item.path)}>
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
