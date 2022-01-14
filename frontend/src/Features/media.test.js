import * as mediaActions from './media'
import mediaReducer from './media'

describe('Media Reducer', () => {
  it('Should return void initial state', () => {
    expect(mediaReducer(undefined, { type: '@INIT' })).toEqual({
      data: null,
      error: null,
      status: 'void'
    })
  })

  it('Should add potographer id key on fetching', () => {
    expect(mediaReducer({ data: null, error: null, status: 'void' }, mediaActions.fetching()))
      .toEqual({ data: null, error: null, status: 'pending' })
  })

  it('should resolved freelance', () => {
    const state = mediaReducer(
      { data: null, error: null, status: 'pending' },
      mediaActions.resolved({
        mediaList: [],
      })
    )
    expect(state.status).toBe('resolved')
  })

  it('should switch to updating when fetching on resolved', () => {
    const state = mediaReducer(
      { data: [], error: null, status: 'resolved' },
      mediaActions.fetching()
    )
    expect(state.status).toBe('updating')
    expect(state.data).toEqual([])
  })

  it('should ignore rejected on resolved', () => {
    const state = mediaReducer(
      { data: [], error: null, status: 'resolved' },
      mediaActions.rejected('Oops')
    )
    expect(state.status).toBe('resolved')
    expect(state.data).toEqual([])
  })
})