import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const AkademiPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{purple.50}',
      100: '{purple.100}',
      200: '{purple.200}',
      300: '{purple.300}',
      400: '{purple.400}',
      500: '{purple.500}',
      600: '{purple.600}',
      700: '{purple.700}',
      800: '{purple.800}',
      900: '{purple.900}',
      950: '{purple.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{purple.500}',
          contrastColor: '#ffffff',
          hoverColor: '{purple.600}',
          activeColor: '{purple.700}',
        },
        highlight: {
          background: '{purple.500}',
          focusBackground: '{purple.600}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        surface: {
          0: '#ffffff',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          950: '#121212',
        },
      },
    },
  },
  primitive: {
    borderRadius: {
      none: '0',
      xs: '4px',
      sm: '6px',
      md: '10px',
      lg: '12px',
      xl: '16px',
    },
    purple: {
      50: '#F5F3FF',
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      500: '#8B5CF6', // Main purple from dashboard
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
      950: '#2E1065',
    },
    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#FB7D5B', // Orange accent from dashboard
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
      950: '#431407',
    },
    yellow: {
      50: '#FEFCE8',
      100: '#FEF9C3',
      200: '#FEF08A',
      300: '#FDE047',
      400: '#FACC15',
      500: '#FCC43E', // Yellow accent from dashboard
      600: '#CA8A04',
      700: '#A16207',
      800: '#854D0E',
      900: '#713F12',
      950: '#422006',
    },
    green: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#2FA84F', // Green from dashboard
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
      950: '#052E16',
    },
    red: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#FB7D5B', // Red accent (using orange-red from dashboard)
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
      950: '#450A0A',
    },
  },
  components: {
    card: {
      root: {
        background: '{surface.0}',
        borderRadius: '{border.radius.lg}',
        color: '{text.color}',
        shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      body: {
        padding: '1.5rem',
        gap: '1rem',
      },
      caption: {
        gap: '0.5rem',
      },
      title: {
        fontSize: '1.25rem',
        fontWeight: '600',
      },
      subtitle: {
        color: '{text.muted.color}',
      },
    },
    button: {
      root: {
        borderRadius: '{border.radius.md}',
        paddingX: '1.25rem',
        paddingY: '0.75rem',
        gap: '0.5rem',
        transitionDuration: '{transition.duration}',
        label: {
          fontWeight: '500',
        },
      },
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '{purple.500}',
              hoverBackground: '{purple.600}',
              activeBackground: '{purple.700}',
              borderColor: '{purple.500}',
              hoverBorderColor: '{purple.600}',
              activeBorderColor: '{purple.700}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff',
            },
            secondary: {
              background: '{surface.100}',
              hoverBackground: '{surface.200}',
              activeBackground: '{surface.300}',
              borderColor: '{surface.100}',
              hoverBorderColor: '{surface.200}',
              activeBorderColor: '{surface.300}',
              color: '{text.color}',
              hoverColor: '{text.color}',
              activeColor: '{text.color}',
            },
          },
        },
      },
    },
    datatable: {
      root: {
        borderColor: '{surface.200}',
      },
      header: {
        background: '{surface.50}',
        borderColor: '{surface.200}',
        color: '{text.color}',
        borderWidth: '0 0 1px 0',
        padding: '1rem 1.25rem',
      },
      headerCell: {
        background: 'transparent',
        hoverBackground: '{surface.100}',
        selectedBackground: '{highlight.background}',
        borderColor: '{surface.200}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        selectedColor: '{highlight.color}',
        gap: '0.5rem',
        padding: '1rem 1.25rem',
      },
      row: {
        background: '{surface.0}',
        hoverBackground: '{surface.50}',
        selectedBackground: '{highlight.background}',
        color: '{text.color}',
        hoverColor: '{text.color}',
        selectedColor: '{highlight.color}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'transparent',
          offset: '0',
        },
      },
      bodyCell: {
        borderColor: '{surface.200}',
        padding: '1rem 1.25rem',
      },
    },
    inputtext: {
      root: {
        background: '{surface.0}',
        disabledBackground: '{surface.100}',
        filledBackground: '{surface.50}',
        filledFocusBackground: '{surface.0}',
        borderColor: '{surface.300}',
        hoverBorderColor: '{surface.400}',
        focusBorderColor: '{purple.500}',
        invalidBorderColor: '{red.500}',
        color: '{text.color}',
        disabledColor: '{text.muted.color}',
        placeholderColor: '{text.muted.color}',
        shadow: 'none',
        paddingX: '0.875rem',
        paddingY: '0.625rem',
        borderRadius: '{border.radius.md}',
      },
    },
    select: {
      root: {
        background: '{surface.0}',
        disabledBackground: '{surface.100}',
        borderColor: '{surface.300}',
        hoverBorderColor: '{surface.400}',
        focusBorderColor: '{purple.500}',
        invalidBorderColor: '{red.500}',
        color: '{text.color}',
        disabledColor: '{text.muted.color}',
        placeholderColor: '{text.muted.color}',
        shadow: 'none',
        paddingX: '0.875rem',
        paddingY: '0.625rem',
        borderRadius: '{border.radius.md}',
      },
      dropdown: {
        width: '2.5rem',
        color: '{text.muted.color}',
      },
      overlay: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        borderRadius: '{border.radius.md}',
        color: '{text.color}',
        shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      list: {
        padding: '0.5rem',
        gap: '0.25rem',
      },
      option: {
        focusBackground: '{surface.100}',
        selectedBackground: '{purple.500}',
        selectedFocusBackground: '{purple.600}',
        color: '{text.color}',
        focusColor: '{text.color}',
        selectedColor: '#ffffff',
        selectedFocusColor: '#ffffff',
        padding: '0.625rem 0.875rem',
        borderRadius: '{border.radius.sm}',
      },
    },

    badge: {
      root: {
        borderRadius: '{border.radius.md}',
        padding: '0.25rem 0.5rem',
        fontSize: '0.75rem',
        fontWeight: '500',
        minWidth: '1.5rem',
        height: '1.5rem',
      },
      colorScheme: {
        light: {
          primary: {
            background: '{purple.500}',
            color: '#ffffff',
          },
          success: {
            background: '{green.500}',
            color: '#ffffff',
          },
          warn: {
            background: '{yellow.500}',
            color: '{surface.900}',
          },
          danger: {
            background: '{red.500}',
            color: '#ffffff',
          },
        },
      },
    },
    menu: {
      root: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        borderRadius: '{border.radius.lg}',
        color: '{text.color}',
      },
      item: {
        focusBackground: '{surface.100}',
        color: '{text.color}',
        focusColor: '{text.color}',
        padding: '0.625rem 0.875rem',
        borderRadius: '{border.radius.sm}',
        gap: '0.5rem',
        icon: {
          color: '{text.muted.color}',
          focusColor: '{text.color}',
        },
      },
    },
    panel: {
      root: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        color: '{text.color}',
        borderRadius: '{border.radius.lg}',
      },
      header: {
        background: '{surface.0}',
        color: '{text.color}',
        padding: '1.25rem',
        borderColor: '{surface.200}',
        borderWidth: '0 0 1px 0',
        borderRadius: '{border.radius.lg} {border.radius.lg} 0 0',
      },
      toggleableHeader: {
        padding: '1rem 1.25rem',
      },
      title: {
        fontWeight: '600',
      },
      content: {
        padding: '1.25rem',
      },
      footer: {
        padding: '1rem 1.25rem',
      },
    },
    chart: {
      root: {
        borderRadius: '{border.radius.lg}',
      },
    },
    calendar: {
      root: {
        borderRadius: '{border.radius.lg}',
        background: '{surface.0}',
        color: '{text.color}',
      },
      panel: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        borderRadius: '{border.radius.lg}',
        shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      header: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        color: '{text.color}',
        padding: '1rem',
        fontWeight: '600',
        gap: '0.5rem',
        borderRadius: '{border.radius.lg} {border.radius.lg} 0 0',
      },
      title: {
        gap: '0.5rem',
        fontWeight: '600',
      },
      monthTitle: {
        fontSize: '1rem',
        fontWeight: '600',
      },
      yearTitle: {
        fontSize: '1rem',
        fontWeight: '600',
      },
      table: {
        fontSize: '0.875rem',
        margin: '0.5rem 0 0 0',
      },
      date: {
        hoverBackground: '{surface.100}',
        selectedBackground: '{purple.500}',
        rangeSelectedBackground: '{purple.100}',
        color: '{text.color}',
        hoverColor: '{text.color}',
        selectedColor: '#ffffff',
        rangeSelectedColor: '{purple.700}',
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '{border.radius.md}',
        padding: '0.5rem',
      },
      todayBackground: '{purple.100}',
      todayColor: '{purple.700}',
    },
  },
});

export default AkademiPreset;
