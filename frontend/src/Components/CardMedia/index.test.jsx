import { render } from '../../Utils/test'
import { screen } from '@testing-library/react'
import CardMedia from './'
import  * as redux from 'react-redux'

const useSelectorMock = jest.spyOn(redux, 'useSelector')

describe('When component is called,', () => {
  it("title of media isn't displayed if there are no props", () => {
    useSelectorMock.mockReturnValue({ data: { userId: 'test' } })
    
    render(
      <CardMedia
        mediaUrl=''
      />)
    
    const cardTitle = screen.getByRole('heading')
    expect(cardTitle.textContent).toBe('')
  })
  
  it("title of media is displayed if there are props", () => {
    useSelectorMock.mockReturnValue({ data: { userId: 'test' } })

    render(
      <CardMedia
        mediaUrl='xxx.jpg'
        title='Lonesome'
      />
    )

    const cardTitle = screen.getByRole('heading')
    expect(cardTitle.textContent).toBe('Lonesome')
  })
})