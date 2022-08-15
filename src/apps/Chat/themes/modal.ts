import {colors, fonts} from 'apps/Chat/styles';
import {ModalTheme} from 'system/components/Modal';

const modalTheme: ModalTheme = {
  backgroundColor: colors.rightBackground,
  border: '1px solid #303136',
  borderRadius: 8,
  fontFamily: fonts.family.default,
  header: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 0,
    padding: '8px 16px',
  },
  padding: '0',
};

export default modalTheme;
