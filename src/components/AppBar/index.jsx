import AppsIcon from '@mui/icons-material/Apps'
import MailIcon from '@mui/icons-material/Mail'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ReactComponent as TrelloIcon } from '~/assets/trello-icon.svg'
import ModeSelect from '~/components/ModeSelect'
import Recent from './Menu/Recent'
import Started from './Menu/Started'
import Template from './Menu/Template'
import Workspace from './Menu/Workspace'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountMenu from './Menu/AccountMenu'
import { Padding } from '@mui/icons-material'

function AppBar() {
  return (
    <Box px={2} sx={{ 
        bgcolor: (theme) => theme.palette.background.default,
        width: '100%', 
        height: (theme)=>theme.trelloCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems:'center', gap: 2 }}>
              {/* App Bar left */}
            <AppsIcon sx={{ color: 'primary.main'}}/>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5}}>
              <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main'}}/>
              <Typography sx={{ fontSize: '1.2rem', color: 'primary.main', fontWeight: 'Bold'}}>Trello</Typography>
            </Box>

            {/* external component */}
            <Workspace/>
            <Recent/>
            <Template/>
            <Started/>

            {/* button */}
             <Button variant="outlined">Create</Button>
          </Box>
          

          {/* App Bar right */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <TextField id="outlined-search" label="Search..." type="search" size='small'/>

            <ModeSelect/>

            <Tooltip title="Notification" sx={{ cursor: 'pointer', color: 'primary.main'}}>
              <Badge color="secondary" variant="dot">
                <NotificationsIcon />
              </Badge>
            </Tooltip>
            
            <Tooltip title="Help">             
                <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main'}}/>
            </Tooltip>

            <AccountMenu/>

          </Box>
        
      </Box>
  )
}

export default AppBar