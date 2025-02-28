import AppBar from '@/layouts/AppBar/AppBar';
import { QueryProvider } from '@/providers';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <QueryProvider>
          <AppBar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
