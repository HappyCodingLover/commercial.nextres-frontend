export function createReducer(initialState: any, handlers: any) {
  return function reducer(state = initialState, action: any) {
    if (handlers[action.type]) {
      return handlers[action.type](state, action)
    }
    return state
  }
}
