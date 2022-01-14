import { render } from '../../Utils/test'
import { screen } from '@testing-library/react'
import Header from './index'
import  * as redux from 'react-redux'

const useSelectorMock = jest.spyOn(redux, 'useSelector')

describe('When app start,', () => {
  it("'Se connecter' is displayed if there are no userId", () => {
    useSelectorMock.mockReturnValue({ data: { userId: '', name : 'David' } })
    
    render(<Header />)
    
    const spanConnect = screen.getByTestId('TestConnect')
    expect(spanConnect.textContent).toBe('Se connecter ')
  })
  
  it("name is displayed if there are userId", () => {
    useSelectorMock.mockReturnValue({ data: { userId: 'test', name : 'David' } })
    
    render(<Header />)
    
    const spanConnect = screen.getByTestId('TestConnect')
    expect(spanConnect.textContent).toBe('David ')
  })
})