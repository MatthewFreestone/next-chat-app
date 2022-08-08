import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

global.fetch = jest.fn(async () => {
  // @ts-ignore
  const resp: Response = {
    json: () => Promise.resolve({data: undefined})
  }
  return resp
})

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading')

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("Chat App")
  })
})