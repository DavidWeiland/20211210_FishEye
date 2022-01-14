import * as userActions from './user'
import userReducer from './user'

describe('User Reducer', () => {
  it('Should return void initial state', () => {
    expect(userReducer(undefined, { type: '@INIT' })).toEqual({
      data: null,
      error: null,
      status: 'void'
    })
  })

  it('Should add potographer id key on fetching', () => {
    expect(userReducer({ data: null, error: null, status: 'void' }, userActions.fetching()))
      .toEqual({ data: null, error: null, status: 'pending' })
  })

  it('should resolved freelance', () => {
    const state = userReducer(
      { data: null, error: null, status: 'pending' },
      userActions.resolved({
        userList: [],
      })
    )
    expect(state.status).toBe('resolved')
  })

  it('should switch to updating when fetching on resolved', () => {
    const state = userReducer(
      { data: [], error: null, status: 'resolved' },
      userActions.fetching()
    )
    expect(state.status).toBe('updating')
    expect(state.data).toEqual([])
  })

  it('should ignore rejected on resolved', () => {
    const state = userReducer(
      { data: [], error: null, status: 'resolved' },
      userActions.rejected('Oops')
    )
    expect(state.status).toBe('resolved')
    expect(state.data).toEqual([])
  })

  it('should switch to reset on resolved', () => {
    const state = userReducer(
      { data: [], error: null, status: 'pending' },
      userActions.reset()
    )
    expect(state.status).toBe('void')
    expect(state.data).toEqual(null)
  })
})