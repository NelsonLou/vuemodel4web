export const mockList = Array(16).fill(1).map((_,index
  )=>{
  return {
    id: index,
    parentId: index > 8 ? [3,4,5,6,7,8][index%6] : [0,1,2][index%3],
    name:  `${[0,1,2][index%3]}-${index}菜单`,
    power: (index % 2) ? true : false
  }
})