import fetch from 'axios'
import { describe, expect, it } from 'vitest'
describe('suite name', () => {
  it.skip('read user info', async () => {
    const r = await fetch.get('http://localhost:64784/info')
    expect(r.data[0].id).toEqual(101)
  })

  it('login', async () => {
    const r = await fetch.post('http://localhost:64784/login', {
      email: '277149066@qq.com',
      password: '12345678',
      way: 'email',
    })
    const data = r.data;
    console.log('data', data)
    expect(data.type).toEqual('bearer')

  })


})
