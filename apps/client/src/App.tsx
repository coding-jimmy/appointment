import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import MyTable from './Table';
import { Row } from '@unstyled-ui/layout';
import { Button } from 'antd';
import { useForceUpdate } from '@c3/hooks';

export type Role = 'entrep' | 'partner';

function App() {
  // const role = localStorage.getItem('user_role');
  const [userId, setUserId] = useState(0);
  const [userRole, setRole] = useState<Role>('entrep');
  const isLogined = !!userId;

  return (
    <div className="App">
      {isLogined ? (
        userRole === 'entrep' ? (
          `创业者id-${userId}已登录`
        ) : (
          `合伙人id-${userId}已登录`
        )
      ) : (
        <Row>
          <Button
            onClick={() => {
              setRole('entrep');
              setUserId(5);
            }}
          >
            创业者登录
          </Button>
          <Button
            onClick={() => {
              setRole('partner');
              setUserId(1);
            }}
          >
            合伙人登录
          </Button>
        </Row>
      )}

      <MyTable userId={userId} userRole={userRole}/>
    </div>
  );
}

export default App;
