import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import HealthSleep from './HealthSleep';
import HealthActivity from './HealthActivity';
import HealthCalories from './HealthCalories';
import HealthSteps from './HealthSteps';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function App() {
  const [index, setIndex] = useState(0);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const handleTabClick = (key) => {
    setIndex(Number(key));
  };

  return (
    <div>
      <div style={{ paddingLeft: '20px' }}>
        <Tabs activeKey={String(index)} onTabClick={handleTabClick}>
          <TabPane tab="Steps" key="0"></TabPane>
          <TabPane tab="Activity" key="1"></TabPane>
          <TabPane tab="Calories" key="2"></TabPane>
          <TabPane tab="Sleep" key="3"></TabPane>
        </Tabs>
      </div>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div>
          <HealthSteps />
        </div>
        <div>
          <HealthActivity />
        </div>
        <div>
          <HealthCalories />
        </div>
        <div>
          <HealthSleep />
        </div>
      </SwipeableViews>
    </div>
  );
}

export default App;


