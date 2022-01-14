import * as photographerActions from './photographer'
import photographerReducer from './photographer'

describe('Photographer Reducer', () => {
  it('Should return void initial state', () => {
    expect(photographerReducer(undefined, { type: '@INIT' })).toEqual({
      data: null,
      error: null,
      status: 'void'
    })
  })

  it('Should add potographer id key on fetching', () => {
    expect(photographerReducer({ data: null, error: null, status: 'void' }, photographerActions.fetching()))
      .toEqual({ data: null, error: null, status: 'pending' })
  })

  it('should resolved freelance', () => {
    const state = photographerReducer(
      { data: null, error: null, status: 'pending' },
      photographerActions.resolved({
        photographerList: [],
      })
    )
    expect(state.status).toBe('resolved')
  })

  it('should switch to updating when fetching on resolved', () => {
    const state = photographerReducer(
      { data: [], error: null, status: 'resolved' },
      photographerActions.fetching()
    )
    expect(state.status).toBe('updating')
    expect(state.data).toEqual([])
  })

  it('should ignore rejected on resolved', () => {
    const state = photographerReducer(
      { data: [], error: null, status: 'resolved' },
      photographerActions.rejected('Oops')
    )
    expect(state.status).toBe('resolved')
    expect(state.data).toEqual([])
  })
})