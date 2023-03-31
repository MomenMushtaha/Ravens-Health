// Import necessary libraries and components
import React, {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import HealthSleep from './HealthSleep';
import HealthActivity from './HealthActivity';
import HealthCalories from './HealthCalories';
import HealthSteps from './HealthSteps';
import {Tabs} from 'antd';

// Destructure TabPane from Tabs for convenience
const {TabPane} = Tabs;

// Define the App functional component
function App() {
    // Declare state for the current index of the tabs
    const [index, setIndex] = useState(0);

    // Function to handle changing the index when swiping between views
    const handleChangeIndex = (index) => {
        setIndex(index);
    };

    // Function to handle tab click and update the index accordingly
    const handleTabClick = (key) => {
        setIndex(Number(key));
    };

    // Render the main component
    return (
        <div>
            <div style={{paddingLeft: '20px'}}>
                {/* Render the tabs with the active tab set to the current index */}
                <Tabs activeKey={String(index)} onTabClick={handleTabClick}>
                    <TabPane tab="Steps" key="0"></TabPane>
                    <TabPane tab="Activity" key="1"></TabPane>
                    <TabPane tab="Calories" key="2"></TabPane>
                    <TabPane tab="Sleep" key="3"></TabPane>
                </Tabs>
            </div>
            {/* Render the swipeable views with the current index */}
            <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                <div>
                    <HealthSteps/>
                </div>
                <div>
                    <HealthActivity/>
                </div>
                <div>
                    <HealthCalories/>
                </div>
                <div>
                    <HealthSleep/>
                </div>
            </SwipeableViews>
        </div>
    );
}

// Export the App component for use in other modules
export default App;
