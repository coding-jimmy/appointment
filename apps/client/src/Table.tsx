import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import { formatTime, isEmpty, s } from '@c3/utils';
import { useApi } from '@c3/api';
import { fetchSegs } from './api/fetchTimeSegs';
import { fetchPartners } from './api/fetchPartners';
import { useMount } from '@c3/hooks';
import { Role } from './App';
import { pickFreeTime } from './api/pickFreeTime';

type DataType = {
  key: string;
  time: TimeSeg;
} & { [idx: string]: any };
const FORMAT = 'MM-DD  HH:mm';

export type Parner = { name: string; id: number };
export type TimeSeg = { id: number; start_time: string; end_time: string };

const buildColumns = (
  partners: Parner[],
  role: Role,
  userId: number
): ColumnsType<DataType> => {
  return [
    {
      title: 'time_id',
      dataIndex: 'time_id',
      key: 'time_id',
      //@ts-ignore
      render: (a, b) => (
        <div>
          <span>
            {formatTime(b.time.start_time, FORMAT)}-
            {formatTime(b.time.end_time, FORMAT)}
          </span>
        </div>
      ),
    },
  ].concat(
    partners.map((e, idx) => ({
      title: e.name,
      dataIndex: e.name,
      key: s(e.id),
      render: (a, b) => (
        <div>
          {/* {JSON.stringify(b)} */}
          {b[`partner${idx}`] === 'free' ? (
            role === 'entrep' ? (
              <Button >选择</Button>
            ) : (
              ''
            )
          ) : (
            ''
          )}
          {b[`partner${idx}`] === '' ? (
            role === 'partner' ? (
              <Button
                onClick={() => {
                  pickFreeTime(b.time.id, userId);
                }}
              >
                选择
              </Button>
            ) : (
              ''
            )
          ) : (
            ''
          )}
          <Button
            onClick={() => {
            //   pickFreeTime(b.time.id, userId);
            }}
          >
            取消
          </Button>
        </div>
      ),
    }))
  );
};

const buildData = (timeSegs: TimeSeg[], partners: Parner[]): DataType[] => {
  let res: DataType[] = [];
  for (let time of timeSegs) {
    let row: DataType = { key: s(time.id), time: time };
    for (let partner of partners) {
      row[partner.name] = '';
      // query events table to find(time_id, partner_id)是否存在和是否enterp_id有值？如果存在则说明partern已经选择过，
      const existd = true;
      if (existd) {
        row[partner.name] = '';
      }
      res.push(row);
    }
  }
  return res;
};

type MyTableProps = {
  userId: number;
  userRole: Role;
};
const MyTable: React.FC<MyTableProps> = props => {
  const { userId, userRole } = props;
  const [timesegs, fetchS] = useApi(fetchSegs);
  const [partners, fetchP] = useApi(fetchPartners);
  useMount(async () => {
    await fetchS(undefined);
    await fetchP(undefined);
  });

  //@ts-ignore
  const column = buildColumns(partners, userRole, userId);
  //@ts-ignore
  const data = buildData(timesegs, partners);

  return <Table columns={column} dataSource={data} />;
};

export default MyTable;
