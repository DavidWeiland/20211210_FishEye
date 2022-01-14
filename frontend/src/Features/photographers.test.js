import * as photographersActions from './photographers'
import photographersReducer from './photographers'

describe('Photographers Reducer', () => {
  it('Should return void initial state', () => {
    expect(photographersReducer(undefined, { type: '@INIT' })).toEqual({
      data: null,
      error: null,
      status: 'void'
    })
  })

  it('Should add potographer id key on fetching', () => {
    expect(photographersReducer({ data: null, error: null, status: 'void' }, photographersActions.fetching()))
      .toEqual({ data: null, error: null, status: 'pending' })
  })

  it('should resolved freelance', () => {
    const state = photographersReducer(
      { data: null, error: null, status: 'pending' },
      photographersActions.resolved({
        photographersList: [],
      })
    )
    expect(state.status).toBe('resolved')
  })

  it('should switch to updating when fetching on resolved', () => {
    const state = photographersReducer(
      { data: [], error: null, status: 'resolved' },
      photographersActions.fetching()
    )
    expect(state.status).toBe('updating')
    expect(state.data).toEqual([])
  })

  it('should ignore rejected on resolved', () => {
    const state = photographersReducer(
      { data: [], error: null, status: 'resolved' },
      photographersActions.rejected('Oops')
    )
    expect(state.status).toBe('resolved')
    expect(state.data).toEqual([])
  })
})