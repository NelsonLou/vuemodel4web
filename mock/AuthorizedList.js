export const mockList = Array(10).fill(1).map((_,index
  )=>{
  return {
    id: index,
    parentId: index > 5 ? [3,4,5][index%3] : [0,1,2][index%3],
    name:  `${[0,1,2][index%3]}-${index}菜单`,
    power: (index % 2) ? true : false
  }
})