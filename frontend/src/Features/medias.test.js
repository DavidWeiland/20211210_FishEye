import * as mediasActions from './medias'
import mediasReducer from './medias'

describe('Medias Reducer', () => {
  it('Should return void initial state', () => {
    expect(mediasReducer(undefined, { type: '@INIT' })).toEqual({
      data: null,
      error: null,
      status: 'void'
    })
  })

  it('Should add potographer id key on fetching', () => {
    expect(mediasReducer({ data: null, error: null, status: 'void' }, mediasActions.fetching()))
      .toEqual({ data: null, error: null, status: 'pending' })
  })

  it('should resolved freelance', () => {
    const state = mediasReducer(
      { data: null, error: null, status: 'pending' },
      mediasActions.resolved({
        mediasList: [],
      })
    )
    expect(state.status).toBe('resolved')
  })

  it('should switch to updating when fetching on resolved', () => {
    const state = mediasReducer(
      { data: [], error: null, status: 'resolved' },
      mediasActions.fetching()
    )
    expect(state.status).toBe('updating')
    expect(state.data).toEqual([])
  })

  it('should ignore rejected on resolved', () => {
    const state = mediasReducer(
      { data: [], error: null, status: 'resolved' },
      mediasActions.rejected('Oops')
    )
    expect(state.status).toBe('resolved')
    expect(state.data).toEqual([])
  })
})