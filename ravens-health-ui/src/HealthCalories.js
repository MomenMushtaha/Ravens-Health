// Import necessary libraries and components
import React, {PureComponent, useState} from 'react';
import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    ReferenceLine,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';
import './HealthCalories.css';
import DaysDropdown from './DaysDropdown';
import {Select} from 'antd';
import healthData from './activity.json';



// Format the ticks on the X-axis
const tickFormatter = (date) => {
    const day = new Date(date).getDate() + 1;
    const month = new Date(date).toLocaleString('default', {month: 'short'});
    return `${month} ${day}`;
};

// Main component for the health calories visualization
export default function HealthCalories() {
    const [numDays, setNumDays] = useState(14);
    const lastDays = healthData.slice(-numDays);

    // Convert the data to the format required by the LineChart component
    const convertedData = lastDays.map((data) => ({
        ...data,
        key: data.Dates, // add the key property to display dates on x-axis
        BURN_CAL: data.BURN_CAL,
        AC_CAL: data.AC_CAL,
    }));

    // Update the number of days when the dropdown value changes
    const handleDropdownChange = (value) => {
        setNumDays(value);
    };

    // Render the main component
    return (
        <div className="container" height="80 vh">
            <div className="header" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1 style={{fontFamily: 'Consolas', fontSize: '24px', marginBottom: '-30px'}} className="text-heading">
                    . Ravens' Health .
                </h1>
                <h5 style={{fontFamily: 'Consolas', fontSize: '16px', marginBottom: '0px'}} className="text-heading">
                    Visualizing the calories burned during activity and the calories burned in total
                </h5>
                <div style={{display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom: '-20px'}}>
                    <span style={{
                        fontFamily: 'Consolas', fontSize: '14px',
                        fontWeight: 'bold',
                        marginRight: '8px',
                        marginTop: '7px'
                    }}>
                    Duration of Time to Analyze:
                    </span>
                    <DaysDropdown defaultValue="14" onSelect={handleDropdownChange}/>
                </div>
            </div>

            <div style={{flex: '50%', marginTop: '40px'}}>
                <h3 style={{textAlign: 'center', fontFamily: 'Consolas', margin: '0'}}> Calories Burned During Activity & in Total</h3>
                <ResponsiveContainer width="90%" height="60%">
                    <LineChart style={{fontFamily: 'Consolas'}} data={convertedData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="key"
                            interval={'preserveStartEnd'}
                            label={{
                                value: 'Date',
                                position: 'bottom',
                                offset: -8,
                                fontSize: '75%',
                            }}
                            tick={{fontSize: '50%', dx: -3}}
                            tickFormatter={tickFormatter}
                        />
                        <YAxis
                            label={{
                                value: 'Calories',
                                angle: -90,
                                position: 'insideLeft',
                                textAnchor: 'middle',
                                fontSize: '75%',
                                dy: -15, // move label down by 15%
                            }}
                            tick={{fontSize: '50%'}}
                            tickFormatter={(value) => value}
                        />
                        <Legend/>
                        <Tooltip/>
                        <ReferenceLine x={convertedData[convertedData.length - 1].key} stroke="#000000" strokeWidth={0.8} zIndex={-1}/>
                        <Line name="Active Calories" dataKey="AC_CAL" stroke='#4477AA' activeDot={{r: 8}}/>
                        <Line name="Burned Calories" dataKey="BURN_CAL" stroke='#EE6677' activeDot={{r: 8}}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

    