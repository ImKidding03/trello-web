import React from "react"
import Box from "@mui/material/Box"
import Column from "./Column/Column"
import Button from "@mui/material/Button"
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumn({ columns }) {
  return (
    <SortableContext items={ columns.map(c => c._id) } strategy={ horizontalListSortingStrategy }>
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": { m: 2 },
        }}
      >

        {columns?.map(column=>(<Column key={column._id} column={column}/>))}
        
        <Box sx={{
          mx: 2,
          minWidth: '200px',
          bgcolor: '#ffffff3d',
          height: 'fit-content',
          borderRadius: '6px'
        }}>
          <Button sx={{ 
            color: 'white', 
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2,
            py: 1
          }} 
          startIcon={<NoteAddIcon/>}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumn
