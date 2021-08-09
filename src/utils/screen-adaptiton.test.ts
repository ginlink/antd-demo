import { t } from './screen-adaptiton'
import { sum } from './sum'

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3)
  expect(sum(2, 2)).toEqual(4)
})

it('adaption test', () => {
  expect(t`
    width: 100px;
    {
      width: 50px;
    }
  `).toBeDefined()
})
