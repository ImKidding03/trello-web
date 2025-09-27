import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
// import useMediaQuery from '@mui/material/useMediaQuery'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'


import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'


function ModeSelect() {
  const {mode, setMode} = useColorScheme()
  const handleChange = (event) => {
    const selected = event.target.value
    setMode(selected);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
      >
      
        <MenuItem value='light'><div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><LightModeIcon fontSize='small'/> Light</div></MenuItem>
        <MenuItem value='dark'><div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><DarkModeIcon fontSize='small'/> Dark</div></MenuItem>
        <MenuItem value='system'><div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><SettingsBrightnessIcon fontSize='small'/> System</div></MenuItem>
      </Select>
    </FormControl>
  );
}

function ModeToggle(){
  const {mode, setMode} = useColorScheme()
  /* const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  console.log("🚀 ~ ModeToggle ~ prefersDarkMode:", prefersDarkMode)
  console.log("🚀 ~ ModeToggle ~ prefersLightMode:", prefersLightMode) */
  return (
    <Button onClick={()=>{
      setMode(mode === 'light' ? 'dark' : 'light')
    }} 
    > 
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {
    
  return (
    <>
      <ModeSelect/>
      <hr />
      <ModeToggle/>
      <div>MinhNhut - Học lập trình</div>
      <Typography variant='body2' color="text.secondary">Test test</Typography>
      <AccessAlarmIcon/>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App


