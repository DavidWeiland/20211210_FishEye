import { render, unmountComponentAtNode } from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import CardMedia from './index'
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

describe('When component is called,', () => {
  it("title of media isn't displayed if there are no props", () => {
    useSelectorMock.mockReturnValue({ data: { userId: 'test' } })
    act(() => {
      render(<Provider store={store}><MemoryRouter><CardMedia mediaUrl='' /></MemoryRouter></Provider>, container)
    })
    expect(container.textContent).toBe('')
  })
  
  it("title of media is displayed if there are props", () => {
    useSelectorMock.mockReturnValue({ data: { userId: 'test' } })
    act(() => {
      render(<Provider store={store}><MemoryRouter><CardMedia mediaUrl='xxx.jpg' title='Lonesome' /></MemoryRouter></Provider>, container)
    })
    expect(container.textContent).toBe('Lonesome')
  })
})