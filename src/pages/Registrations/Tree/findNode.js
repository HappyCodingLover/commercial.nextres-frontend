export const findNode = (treeData, nodeId) => {
  let node = null
  if (treeData.hasOwnProperty('nodeId')) {
    if (treeData['nodeId'] === nodeId) {
      node = treeData
      return node
    } else {
      if (treeData['children']) {
        node = findNode(treeData['children'], nodeId)
        if (node) {
          return node
        }
      }
    }
  } else if (treeData instanceof Array) {
    for (let i = 0; i < treeData.length; i++) {
      if (typeof treeData[i] === 'object') {
        if (treeData[i].hasOwnProperty('nodeId')) {
          node = findNode(treeData[i], nodeId)
          if (node) {
            return node
          }
        }
      }
    }
    return null
  }
  return null
}
