import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Card from './index'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe('When component is called,', () => {
  it("photographer's name isn't displayed if there are no props", () => {
    act(() => {
      render(<Card tags={[]} />, container)
    })
    expect(container.textContent).toBe(',  €/jour,')
  
  })
  
  it("photographer's name is displayed if there are props", () => {
    act(() => {
        render(<Card tags={["Portrait", "Art"]} name='David' />, container)
    })
    expect(container.textContent).toBe('David,  €/jour,#Portrait#Art')
  })
})