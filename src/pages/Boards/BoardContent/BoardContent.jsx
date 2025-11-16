import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utilities/sorts'
import ListColumn from './ListColumns/ListColumn'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD:'ACIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  // const pointersensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 }} )
  const mousesensor = useSensor( MouseSensor, { activationConstraint: { distance: 10 }} )
  const touchsensor = useSensor( TouchSensor, {  activationConstraint: { delay: 250, tolerance: 500 }})

  const sensors = useSensors(mousesensor, touchsensor)
  //orderedColumns ban đầu có giá trị rỗng
  const [orderedColumns, setOrderedColumns] = useState([])


  const [activeDragItemId, setactiveDragItemId] = useState(null)

  const [activeDragItemType, setactiveDragItemType] = useState(null)

  const [activeDragItemData, setactiveDragItemData] = useState(null)

  //cập nhật lại giá trị mới cho orderedColumns bằng setOrderedColumns()
  useEffect(()=>{ setOrderedColumns(mapOrder( board?.columns, board?.columnOrderIds, '_id' )) }
    , [board])

  const handleDragStart = (e) =>{
    console.log('handleDragStart: ', e)
    setactiveDragItemId(e?.active?.id)
    setactiveDragItemType(e?.active?.data?.current?.columnId ? ACIVE_DRAG_ITEM_TYPE.CARD : ACIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(e?.active?.data?.current)
  }

  const handleDragEnd = (e) => {
    // console.log('handleDragEnd: ', e)
    const {active, over} = e

    if(!over) return 
    if(active.id != over.id){
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      // console.log('oldIndex: ', oldIndex)
      // console.log('newIndex: ', newIndex)
      // arrayMove sắp xếp lại mảng column ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex , newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns: ', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)
      setOrderedColumns(dndOrderedColumns)
    }    

    setactiveDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
  }

  const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({styles: {active: {opacity: '0.5'} } })
} 

    console.log('activeDragItemId: ', activeDragItemId)
    console.log('activeDragItemType: ', activeDragItemType)
    console.log('activeDragItemData: ', activeDragItemData)

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{ 
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
            width: '100%', 
            height: (theme) => theme.trelloCustom.boardcontentHeight,
            p: '10px 0'
            }}>
          <ListColumn columns={orderedColumns}/>
          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragItemType && null}
            {(activeDragItemType === ACIVE_DRAG_ITEM_TYPE.COLUMN) ? <Column column={activeDragItemData}/> : <Card card={activeDragItemData}/> }
          </DragOverlay>
      </Box>
    </DndContext>
  )
}


export default BoardContent