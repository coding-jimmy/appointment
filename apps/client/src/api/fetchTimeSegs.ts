import { makeApi } from "./base";

export const fetchSegs = makeApi({
    'method': 'get',
    "url": "/timesegs",
    //@ts-ignore
    'defaultData': [],
    //@ts-ignore
    'mockData': []
})