import { cyan, deepOrange, orange } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { teal } from '@mui/material/colors'


// Create a theme instance.
const theme = extendTheme({
  // **Loại bỏ** cssVariables: true ở đây
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },

    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
  // ... các tùy chỉnh khác
})

export default theme