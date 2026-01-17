import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { ReactComponent as TrelloIcon } from '~/assets/trello-icon.svg'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AccountMenu from './Menu/AccountMenu'
import Recent from './Menu/Recent'
import Started from './Menu/Started'
import Template from './Menu/Template'
import Workspace from './Menu/Workspace'
import CloseIcon from '@mui/icons-material/Close'



function AppBar() {

  const [searchValue, setSearchValue] = useState('')

  return (
    <Box px={2} sx={{ 
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0',
        width: '100%', 
        height: (theme)=>theme.trelloCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        "&::-webkit-scrollbar-track": { m: 2 }
        }}>
          <Box sx={{ display: 'flex', alignItems:'center', gap: 2 }}>
              {/* App Bar left */}
            <AppsIcon sx={{ color: 'white'}}/>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5}}>
              <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'white'}}/>
              <Typography sx={{ fontSize: '1.2rem', color: 'white', fontWeight: 'Bold'}}>Trello</Typography>
            </Box>
          
            <Box sx={{ display: { xs: 'none', md: 'flex', gap: 1 }}}>
              {/* external component */}
              <Workspace/>
              <Recent/>
              <Template/>
              <Started/>
              {/* button */}
              <Button 
                variant="outlined" 
                sx={{ 
                  color: 'white',
                  border: 'none',
                  '&:hover': { border: 'none' }
                }} 
                startIcon={<AddToPhotosIcon/>}
                >
                  Create
              </Button>
            </Box>
          </Box>
          
          {/* App Bar right */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <TextField 
              id="outlined-search" 
              label="Search..." 
              type="text" 
              size='small'
              value={ searchValue }
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'white'}} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <CloseIcon
                      onClick = {() => setSearchValue('')}
                      sx={{ 
                        width: '15px',
                        height: '15px',
                        color: searchValue ? 'white' : 'transparent',
                        cursor: 'pointer'
                      }}
                    />
                  )
                
              }}
              sx={{ 
                minWidth: `120px`,
                maxWidth: '170px',
                '& label': { color: 'white'},
                '& input': { color: 'white'},
                '& label.Mui-focused': { color: 'white'},
                '& .MuiOutlinedInput-root': { 
                  '& fieldset':{ borderColor: 'white' },
                  '&:hover fieldset':{ borderColor: 'white' },
                  '&.Mui-focused fieldset':{ borderColor: 'white' },
                }


              }}/>

            <ModeSelect/>

            <Tooltip title="Notification" sx={{ cursor: 'pointer', color: 'white'}}>
              <Badge color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </Tooltip>
            
            <Tooltip title="Help">             
                <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white'}}/>
            </Tooltip>

            <AccountMenu/>

          </Box>
        
      </Box>
  )
}

export default AppBar