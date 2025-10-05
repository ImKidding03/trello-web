import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloLogo} from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpace from './Menu/WorkSpace'
import Recent from './Menu/Recent'
import Started from './Menu/Started'
import Template from './Menu/Template'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountMenu from './Menu/Profile'


function AppBar() {
  return (
    <Box px={2} sx={{ 
        // backgroundColor: '#fff',
        width: '100%', 
        height: (theme)=>theme.trelloCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: (theme) => theme.palette.background.default
        }}>
          {/* header left -------------------- */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
            <AppsIcon sx={{ color: 'primary.main'}}/>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
              <SvgIcon component={TrelloLogo} inheritViewBox sx={{ color: 'primary.main'}}></SvgIcon>
              <Typography sx={{ fontSize: '1.2rem', fontWeight:'bold', color: 'primary.main'}}>Trello</Typography>
            </Box>
            
            <WorkSpace/>
            <Recent/>
            <Started/>
            <Template/>

            <Button variant="outlined">Create</Button>
          </Box>

          {/* header right ----------------------- */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <TextField id="outlined-search" label="Search..." type="search" size='small'/>
            <ModeSelect/>

             <Tooltip title="Notification">
            <Badge badgeContent={4} variant="dot" color="secondary" sx={{ cursor: 'pointer'}}>
              <NotificationsIcon color="action" />
            </Badge>
            </Tooltip>
            
             <Tooltip title="Help?">
                <HelpOutlineIcon sx={{ cursor: 'pointer'}}/>
            </Tooltip>

            <AccountMenu/>
          </Box>
        
      </Box>
  )
}

export default AppBar