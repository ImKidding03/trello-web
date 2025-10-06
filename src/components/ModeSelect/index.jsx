import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

function ModeSelect() {
  const {mode, setMode} = useColorScheme()
  const handleChange = (event) => {
    const selected = event.target.value
    setMode(selected);
  };

  return (
    <FormControl size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
      >
      
        <MenuItem value='light'>
          <Box style={{ display: 'flex', alignItems: 'center', gap: "8px" }}>
            <LightModeIcon fontSize='small'/> Light
            </Box>
        </MenuItem>

        <MenuItem value='dark'>
          <Box style={{ display: 'flex', alignItems: 'center', gap: "8px" }}>
            <DarkModeIcon fontSize='small'/> Dark
          </Box>
        </MenuItem>

        <MenuItem value='system'>
          <Box style={{ display: 'flex', alignItems: 'center', gap: "8px" }}>
            <SettingsBrightnessIcon fontSize='small'/> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}Box
export default ModeSelect