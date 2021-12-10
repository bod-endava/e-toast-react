import React from 'react'
import Button from './index'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Unit Test: Button ', () => {
  test('OnClick Event ', () => {
    const clickHandler = jest.fn()
    const { getByText } = render(
        <Button onClick={clickHandler}>Click on me!</Button>
    )
    userEvent.click(getByText('Click on me!'))
    expect(clickHandler).toBeCalled()
  })
})
