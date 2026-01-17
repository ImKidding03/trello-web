import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { capitalizeFirstLetter } from '~/utilities/formater'//Hàm tự định nghĩa đc import vào

/* Biến style chung cho menu */
const menuStyle = {
              color: 'white',
              background: 'transparent',
              fontWeight: 'bold',
              border: 'none',
              paddingX: '5px',
              borderRadius: '7px',
              '.MuiSvgIcon-root': { color: 'white' },
              '&:hover':{ backgroundColor:'primary.50' },
}

 
function BoardBar( { board } ) {
  return (
    <Box px={2} sx={{ 
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%', 
        height: (theme)=>theme.trelloCustom.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'auto',
        "&::-webkit-scrollbar-track": { m: 2 }
        }}>
          {/* Board bar left */}
          {/* Board name, private/public, add to gg drive, automation, filter */}
          <Box sx={{ display: 'flex', alignItems:'center', '& .MuiChip-label': { lineHeight: 'normal'} }}>
            {/* Chip 1 */}
            <Chip sx={ menuStyle }
            icon={ <SpaceDashboardIcon/> } 
            label={board?.title} clickable />

            {/* Chip 2 */}
            <Chip sx={ menuStyle}    
            icon={ <VpnLockIcon/> } 
            label={capitalizeFirstLetter(board?.type)} clickable />

            {/* Chip 3 */}
            <Chip sx={ menuStyle }
            icon={ <AddToDriveIcon/> } 
            label="Add To Google Drive" clickable />

            {/* Chip 4 */}
            <Chip sx={ menuStyle }
            icon={ <BoltIcon/> } 
            label="Automation" clickable />

            {/* Chip 5 */}
            <Chip sx={ menuStyle }
            icon={ <FilterListIcon/> } 
            label="Filter" clickable />
          </Box>

          {/* Board bar right */}
          {/* invite, Avatar group */}
          <Box sx={{ display: 'flex', alignItems:'center', gap: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={ <PersonAddIcon/> }
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': { borderColor: 'white'}
                }}
                >
                  Invite
                  </Button>
              <AvatarGroup 
                max={5} 
                sx={{
                  gap: '9px',
                  '& .MuiAvatar-root':{
                    width: '34px',
                    height: '34px',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    '&:first-of-type': { backgroundColor: '#a4a0be'}
                  }
                }}>
                <Tooltip title="minh nhut">
                  <Avatar alt="mr nhut" src="src/assets/avatar.jpg" />
                </Tooltip>
                <Tooltip title="minh nhut">
                  <Avatar alt="mr nhut" src="src/assets/avatar.jpg" />
                </Tooltip>
                <Tooltip title="minh nhut">
                  <Avatar alt="mr nhut" src="src/assets/avatar.jpg" />
                </Tooltip>
                <Tooltip title="minh nhut">
                  <Avatar alt="mr nhut" src="src/assets/avatar.jpg" />
                </Tooltip>
                <Tooltip title="minh nhut">
                  <Avatar alt="mr nhut" src="src/assets/avatar.jpg" />
                </Tooltip>
                <Tooltip title="minh nhut">
                  <Avatar alt="mr nhut" src="src/assets/avatar.jpg" />
                </Tooltip>
              </AvatarGroup>
          </Box>
      </Box>
  )
}

export default BoardBar