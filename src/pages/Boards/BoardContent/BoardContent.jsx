import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { cloneDeep, isEmpty } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { mapOrder } from '~/utilities/sorts'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import ListColumn from './ListColumns/ListColumn'
import { generatePlaceholderCard } from '~/utilities/formater'

const ACIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD:'ACIVE_DRAG_ITEM_TYPE_CARD'
}


function BoardContent({ board }) {

    //const pointersensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 }} )
    const mousesensor = useSensor( MouseSensor, { activationConstraint: { distance: 10 }} )
    const touchsensor = useSensor( TouchSensor, {  activationConstraint: { delay: 250, tolerance: 500 }})
    const sensors = useSensors(mousesensor, touchsensor)

    //orderedColumns ban đầu có giá trị rỗng
    const [orderedColumns, setOrderedColumns] = useState([])
    const [activeDragItemId, setactiveDragItemId] = useState(null)
    const [activeDragItemType, setactiveDragItemType] = useState(null)
    const [activeDragItemData, setactiveDragItemData] = useState(null)
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

    //điểm va chạm cuối cùng trước đó
    const lastOverId = useRef(null)

    //cập nhật lại giá trị mới cho orderedColumns bằng setOrderedColumns()
    useEffect(()=> { setOrderedColumns(mapOrder( board?.columns, board?.columnOrderIds, '_id' ) ) }, [board])
    
    const findColumnByCardId = (cardId) => {
      return orderedColumns.find(column => column.cards.map(card => card._id).includes(cardId))
    }

    //hàm xử lí chung kéo card giữa 2 column khác nhau
    const moveCardBetweenColumns = (
      overColumn, 
      overCardId,
      active,
      over,
      activeColumn,
      activeDraggingCardId,
      activeDraggingCardData
    ) => {
      setOrderedColumns(prevColumns => {
          const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)
        
          let newCardIndex
          const isBeLowOverItems = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
          const modifier = isBeLowOverItems ? 1 : 0
          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

          // console.log('isBeLowOverItems: ', isBeLowOverItems)
          // console.log('modifier: ', modifier)
          // console.log('newCardIndex: ', newCardIndex)

          const nextColumns = cloneDeep(prevColumns)

          const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
          const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

          if(nextActiveColumn){
            // Xoá card ở column active 
            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

            if(isEmpty(nextActiveColumn.cards)){
            nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
            }
            // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
            nextActiveColumn.cardOrderIds =  nextActiveColumn.cards.map(card => card._id)
          }
          
          if(nextOverColumn){
            // kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì cần xoá nó trước
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
            // Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

            //xoá placeholdercard đi nếu có tồn tại
            nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
            // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
            nextOverColumn.cardOrderIds =  nextOverColumn.cards.map(card => card._id)
          }
          return nextColumns
      })
    }

    //hàm xử lí khi bắt đầu kéo
    const handleDragStart = (e) =>{
      // console.log('handleDragStart: ', e)
      setactiveDragItemId(e?.active?.id)
      setactiveDragItemType(e?.active?.data?.current?.columnId ? ACIVE_DRAG_ITEM_TYPE.CARD : ACIVE_DRAG_ITEM_TYPE.COLUMN)
      setactiveDragItemData(e?.active?.data?.current)
      
      // console.log('activeDragItemType', activeDragItemType)
      // console.log('activeDragItemData', activeDragItemData)
      if(e?.active?.data?.current?.columnId){
        setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id))
      }
    }

    //hàm xử lí khi đang kéo
    const handleDragOver = (e) =>{
      if(activeDragItemType === ACIVE_DRAG_ITEM_TYPE.COLUMN) return
      // console.log('handleDragOver: ', e)
      const {active, over} = e
      //Cần đảm bảo nếu không tồn tại active hoặc over thì không làm gì tránh crash trang
      if(!active || !over) return
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData} } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // console.log('activeColumn: ',activeColumn )
      // console.log('overColumn: ',overColumn )

      //nếu không tôn tại 1 trong 2 column thì không làm gì hết, tránh crash trang
      if(!activeColumn || !overColumn) return

      //Xử lí logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong 
      // chính column ban đầu của nó thì không làm gì
      //Vì đây là đoạn code xử lí lúc kéo, còn xử lí kéo xong xuôi thì lại là vấn đề khác ở handleDragEnd
      if(activeColumn._id !== overColumn._id){
        // console.log('Code đã chạy vào đây')
        moveCardBetweenColumns(
          overColumn, 
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      }
    }

    //hàm xử lí khi kéo hoàn tất
    const handleDragEnd = (e) => {
      console.log('handleDragEnd: ', e)
      const {active, over} = e
      if(!active || !over) return 
      if(activeDragItemType === ACIVE_DRAG_ITEM_TYPE.CARD){
        
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData} } = active
        const { id: overCardId } = over

        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)
        // console.log('oldColumnWhenDraggingCard: ',oldColumnWhenDraggingCard )
        // console.log('overColumn: ',overColumn )
        //nếu không tôn tại 1 trong 2 column thì không làm gì hết, tránh crash trang
        if(!activeColumn || !overColumn) return

        if(oldColumnWhenDraggingCard._id !== overColumn._id){
          // console.log('Kéo thả card trong 2 column khác nhau')
            moveCardBetweenColumns(
              overColumn, 
              overCardId,
              active,
              over,
              activeColumn,
              activeDraggingCardId,
              activeDraggingCardData
            )
        }
        else{
          const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
          const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
          const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex , newCardIndex)
          console.log({ activeDragItemId, overCardId, oldCardIndex, newCardIndex })

          setOrderedColumns(prevColumns => {
            const nextColumns = cloneDeep(prevColumns)
            const targetColumn = nextColumns.find(column => column._id === overColumn._id)

            targetColumn.cards = dndOrderedCards
            targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
            console.log('targetColumn: ', targetColumn)

            return nextColumns
          })
        }
      }

      
      if(activeDragItemType === ACIVE_DRAG_ITEM_TYPE.COLUMN && active.id != over.id){

        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        // console.log('oldIndex: ', oldIndex)
        // console.log('newIndex: ', newIndex)
        // arrayMove sắp xếp lại mảng column ban đầu
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex , newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log('dndOrderedColumns: ', dndOrderedColumns)
        // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)
        setOrderedColumns(dndOrderedColumns)
      }
          
      setactiveDragItemId(null)
      setactiveDragItemType(null)
      setactiveDragItemData(null)
      setOldColumnWhenDraggingCard(null)
    }

    const dropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } } ) } 

    //hàm xử li flickering khi kéo card
    const collisionDetectionStratery = useCallback((args) =>
    {
      if(activeDragItemType === ACIVE_DRAG_ITEM_TYPE.COLUMN){
        return closestCorners({ ...args })
      }
      // console.log('args: ', args)
      const pointerIntersections = pointerWithin(args)
      if(!pointerIntersections?.length) return

      // const intersections = pointerIntersections.length > 0
      // ? pointerIntersections
      // : rectIntersection(args)
      
      let overId = getFirstCollision(pointerIntersections, 'id')
      if(overId){
        console.log('overId before: ', overId)
        const checkColumn = orderedColumns.find(column => column._id == overId)
        if(checkColumn){
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(container => {
              return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
            })
          })[0]?.id
          console.log('overId after: ', overId)
        }

        lastOverId.current = overId
        return [{id: overId}]
      }
      
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    }, [activeDragItemType])
      // console.log('activeDragItemId: ', activeDragItemId)
      // console.log('activeDragItemType: ', activeDragItemType)
      // console.log('activeDragItemData: ', activeDragItemData)
  return (
    <DndContext  
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={ collisionDetectionStratery }
      // collisionDetection={ closestCorners }
    >
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