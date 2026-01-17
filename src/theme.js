// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = "50px"
const COLUMN_FOOTER_HEIGHT = "56px"



// Create a theme instance.
const theme = extendTheme({
  trelloCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardcontentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: teal,
  //       secondary: deepOrange
  //     }
  //   },

  //   dark: {
  //     palette: {
  //       primary: cyan,
  //       secondary: orange
  //     }
  //   }
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, & *": { 
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "white",
          },
        },
      },
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          borderWidth: '1px',
          '&.MuiButton-outlined':{ borderColor: 'rgba(255,255,255,0.5)' },       
          '&:hover .MuiButton-outlined':{ borderColor: 'rgba(255,255,255,1)' },       
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: () => ({ // {theme}
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline':{
          //     borderColor: theme.palette.primary.light
          // },
          // '&:hover':{
          //   '.MuiOutlinedInput-notchedOutline':{
          //     borderColor: theme.palette.primary.main
          // }
          // },
          '& fieldset':{
            borderWidth: '1px !important',
            opacity: 0.5
          },
          '&:hover fieldset':{ opacity: 1 },
          '&.Mui-focused fieldset':{ opacity: 1 },
        }),
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    }
  }
  // ... các tùy chỉnh khác
})

export default theme