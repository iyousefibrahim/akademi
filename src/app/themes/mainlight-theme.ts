import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Silver + Indigo theme
export const MainLightTheme = definePreset(Aura, {
  primitive: {
    silver: {
      50: '#f4f6f8',
      100: '#e3e8ef',
      200: '#cdd5e1',
      300: '#abc0d3',
      400: '#899bb1',
      500: '#6c7f93',
      600: '#56667a',
      700: '#465362',
      800: '#3c4552',
      900: '#333b45',
    },
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1', // Primary
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
  },
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{silver.50}',
          100: '{silver.100}',
          200: '{silver.200}',
          300: '{silver.300}',
        },
        text: {
          color: '{silver.900}',
        },
      },
    },
  },
});
