//sort column/cards
export const mapOrder = (originalArray, orderArray, key) =>{
    if(!originalArray || !orderArray || !key) return []
    const cloneArray = [...originalArray]
    const orderedArray = cloneArray.sort((a, b) => {
        return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
    })
    return orderedArray
}


