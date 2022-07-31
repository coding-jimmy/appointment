/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';
import dayjs from 'dayjs'

const getFirstItem = async (option) => {
  return  Database.query().select('*').from('calendar').where(option).first();
}

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/info', async () => {
  return Database.query().select('*').from('users').where('id', 1);
})

Route.group(() => {
  Route.get('/partners', async () => {
    return Database.query().select('*').from('users').where('role', 'partner');
  });

  Route.get('/timesegs', async () => {
    return Database.query().select('*').from('calendar');
  });

  Route.post('/pick-free-time', async (ctx) => {
    const { timeId, userId } = ctx.request.all();

    //判断timeId+userId是否存在
    const first = await getFirstItem({ timeId, userId });
    const hasPick = !!first
    if(hasPick) {
      throw Error('同一个partner同一个时间段不要重复选择')
    }

    return Database.insertQuery().table('events').insert({ time_id: timeId, partner_id: userId });

  })
  Route.post('/entre-pick', async (ctx) => {
    const { timeId, partnerId, ertreId} = ctx.request.all();

    //判断timeId+userId是否存在
    const res = await Database.query().select('*').from('calendar').where({ timeId, userId } );
    const hasPick = !!res
    if(hasPick) {
      throw Error('同一个partner同一个时间段不要重复选择')
    }
    //判断是否已经约过该partner了
    // res.reduce((e))

    // redis


    return Database.insertQuery().table('events').insert({ time_id: timeId, partner_id: userId });

  })



  Route.get('/events/list', async () => {
    return Database.query().select('*').from('users').where('id', 1);
  })
}).prefix('api')


// Route.get('/mock', async () => {
//   const base = '2022-07-21T02:20:00'
//   const FORMAT = 'YYYY-MM-DD  HH:mm:ss'
//   const length = 4 * 24 * 3
//   for (let i = 0; i < length; i++) {
//     let start_time = dayjs(base).add(15 * i, 'minute')
//     const end_time = dayjs(start_time).add(15, 'minute')
//     // console.log('startTime', start_time.format('YYYY-MM-DD  HH:mm:ss'), 'i=', i)
//     await Database.insertQuery().table('calendar').insert({
//       start_time: start_time.format(FORMAT),
//       end_time: end_time.format(FORMAT),
//       year: start_time.year(),
//       month: start_time.month() + 1,
//       day: start_time.date()
//     })
//   }

// })
