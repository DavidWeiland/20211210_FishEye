import { render, unmountComponentAtNode } from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import Header from './index'
import { Provider } from 'react-redux'
import  * as redux from 'react-redux'
import configureMockStore from 'redux-mock-store'

const initialState = {}
const mockStore = configureMockStore()
let store = mockStore(initialState)
let container = null
const useSelectorMock = jest.spyOn(redux, 'useSelector')

beforeEach(() => {
  useSelectorMock.mockClear()
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe('When app start,', () => {
  it("'Se connecter' is displayed if there are no userId", () => {
    useSelectorMock.mockReturnValue({ data: { userId: '', name : 'David' } })
    act(() => {
      render(<Provider store={store}><MemoryRouter><Header /></MemoryRouter></Provider>, container)
    })
    expect(container.textContent).toBe('Se connecter ')
  })
  
  it("name is displayed if there are userId", () => {
    useSelectorMock.mockReturnValue({ data: { userId: 'test', name : 'David' } })
    act(() => {
      render(<Provider store={store}><MemoryRouter><Header /></MemoryRouter></Provider>, container)
    })
    expect(container.textContent).toBe('David ')
  })
})