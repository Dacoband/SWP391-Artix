import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
// Create a theme instance.
const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: 'lightgray', // Color of the switch when it is not checked
          '&$checked': {
            color: 'green', // Color of the switch thumb when it is checked
          },
          '&$checked + $track': {
            backgroundColor: 'green', // Color of the switch track when it is checked
          },
        },
        track: {
          backgroundColor: 'gray', // Color of the switch track when it is not checked
        },
      },
    },
  },
});
// Then wrap your switch component with the ThemeProvider
const CustomizedSwitch = ({ checked, onChange,...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Switch
        checked={checked}
        onChange={onChange}
        {...props}
        // other props
      />
    </ThemeProvider>
  );
};

export default CustomizedSwitch;