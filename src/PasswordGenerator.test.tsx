import { render, screen } from '@testing-library/react'
import PasswordGenerator from './PasswordGenerator'

test('renders password generator component', () => {
  render(<PasswordGenerator />)
  expect(screen.getByTestId('password-generator')).toBeInTheDocument()
})
