import { SxRecord } from '@/types/general';

export const styles: SxRecord<'button' | 'logo'> = {
  button: (theme) => ({
    color: theme.palette.common.white,
  }),
  logo: () => ({
    flex: 1,
  }),
};
