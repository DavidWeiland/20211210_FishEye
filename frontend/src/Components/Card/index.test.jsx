import { render, screen } from '@testing-library/react'
import Card from './'

describe('When component is called,', () => {
  it("photographer's name isn't displayed if there are no props", () => {

    render(
      <Card
        tags={[]} 
      />
    )
    
    const cardTitle = screen.getByRole('heading')
    expect(cardTitle.textContent).toBe('')
  
  })
  
  it("photographer's name is displayed if there are props", () => {

    render(
      <Card
        tags={[ "Portrait", "Art" ]}
        name='David Weiland'
      />
    )

    const cardTitle = screen.getByRole('heading')
    expect(cardTitle.textContent).toBe('David Weiland')
  })
})