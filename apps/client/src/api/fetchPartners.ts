import { Parner } from '../Table';
import { makeApi } from './base';

export const fetchPartners = makeApi({
  'method': 'get',
  "url": "/partners",
  //@ts-ignore
  'defaultData': [],
  //@ts-ignore
  'mockData': []
});
