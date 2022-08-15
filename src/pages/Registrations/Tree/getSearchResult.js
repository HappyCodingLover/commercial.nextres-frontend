import { findNode } from './findNode'

export const getSearchResult = (term, tree) => {
  let treeDataCopy = JSON.parse(JSON.stringify(tree))
  let resArr = []
  getResultArr(term, treeDataCopy, resArr)

  let path = []
  resArr.forEach((node) => {
    path.push(findPathById([treeDataCopy], node.nodeId))
  })
  return combineResultArrAndPath(resArr, path)
}

/* this function returns the array of nodes which matches the search term */
export const getResultArr = (term, tree, resArr) => {
  if (tree.hasOwnProperty('name')) {
    if (isMatch(term, tree['name'])) {
      resArr.push(tree)
    }
    if (tree['children']) {
      getResultArr(term, tree['children'], resArr)
    }
  } else if (tree instanceof Array) {
    for (let i = 0; i < tree.length; i++) {
      if (typeof tree[i] === 'object') {
        getResultArr(term, tree[i], resArr)
      }
    }
  }
}

/* this function checks for if given node contains the search term,
    returns true if match, else return false
*/
export const isMatch = (term, nodeName) => {
  return nodeName.toLowerCase().indexOf(term.toLowerCase()) !== -1
}

/* this function returns the parent node array for given node(by id) */
export const findPathById = (array, id) => {
  if (typeof array !== 'undefined') {
    for (var i = 0; i < array.length; i++) {
      if (array[i].nodeId === id) return [{ nodeId: id, name: array[i].name }]
      var a = findPathById(array[i].children, id)
      if (a !== null) {
        a.unshift({ nodeId: array[i].nodeId, name: array[i].name })
        return a
      }
    }
  }
  return null
}

/* this function adds the corresponding path array to each node in search result array */
export const combineResultArrAndPath = (resArr, path) => {
  let resArrCopy = JSON.parse(JSON.stringify(resArr))
  let pathArrCopy = JSON.parse(JSON.stringify(path))

  let combineArr = []
  for (let i = 0; i < resArrCopy.length; i++) {
    let tempNode = resArrCopy[i]
    tempNode.path = pathArrCopy[i]
    combineArr.push(tempNode)
  }
  return combineArr
}

export const setSearchResult = (tree, searchResultArr, currentResIndex) => {
  let treeCopy = JSON.parse(JSON.stringify(tree))
  let index = currentResIndex
  clearActiveStyle(treeCopy)
  if (searchResultArr[index].path.length > 1) {
    // treeCopy.toggled = true
    for (let i = 0; i < searchResultArr[index].path.length; i++) {
      let parent = findNode(treeCopy, searchResultArr[index].path[i].nodeId)
      if (parent.children) {
        parent.toggled = true
      }
    }
  }
  let node = findNode(treeCopy, searchResultArr[index].nodeId)
  try {
    node.active = true
  } catch {}
  return { data: treeCopy, cursor: node, index: index }
}

/* to set all active nodes to false in treeData*/
export const clearActiveStyle = (tree) => {
  if (tree.hasOwnProperty('nodeId')) {
    if (tree.hasOwnProperty('active')) {
      delete tree['active']
    } else {
      if (tree['children']) {
        clearActiveStyle(tree['children'])
      }
    }
  } else if (tree instanceof Array) {
    for (let i = 0; i < tree.length; i++) {
      clearActiveStyle(tree[i])
    }
  }
}

// export const setToggleFalse = (tree) => {
//     if (tree.hasOwnProperty('nodeId')) {
//         if (tree.hasOwnProperty("toggled")) {
//             delete tree["toggled"]
//         } else {
//             if (tree["children"]) {
//                 setToggleFalse(tree["children"])
//             }
//         }
//     } else if (tree instanceof Array) {
//         for (let i = 0; i < tree.length; i++) {
//             setToggleFalse(tree[i])
//         }
//     }
// }
