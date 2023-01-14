import { styled } from '../../styles/styles';

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 6,
  position: 'relative',

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  span: {},

  variants: {
    color: {
      gray: {
        backgroundColor: '$gray800',
        color: '$gray500',
      },
      green: {
        backgroundColor: '$green500',
        color: '$white',

        '&:not(:disabled):hover': {
          backgroundColor: '$green300',
        },
      },
    },
    size: {
      medium: {
        width: '3rem',
        height: '3rem',

        svg: {
          fontSize: 24,
        },
      },

      large: {
        width: '3.5rem',
        height: '3.5rem',

        svg: {
          fontSize: 32,
        },
      },
    },
  },

  defaultVariants: {
    color: 'gray',
    size: 'medium',
  },
});
