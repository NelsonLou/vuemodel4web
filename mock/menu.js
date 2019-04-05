export const menus = Array(10).fill(1).map((_,index
  )=>{
  return {
    id: index,
    parentId: [0,1,2][index%3],
    name:  `${[0,1,2][index%3]}-${index}菜单`
  }
})