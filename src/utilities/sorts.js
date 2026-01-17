//sort column/cards
export const mapOrder = (originalArray, orderArray, key) =>{
    if(!originalArray || !orderArray || !key) return [] // nếu kh tồn tại 1 trong 3 thì return mảng rỗng
    const cloneArray = [...originalArray]
    const orderedArray = cloneArray.sort((a, b) => {
        return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
    })
    return orderedArray
}


