// Import necessary libraries and components
import React, {useState} from 'react';
import {
    LineChart,
    ResponsiveContainer,
    Tooltip,
    ReferenceLine,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';
import './HealthSteps.css';
import DaysDropdown from './DaysDropdown';
import healthData from './activity.json';

// Format the ticks on the X-axis
const tickFormatter = (date) => {
    const day = new Date(date).getDate() + 1;
    const month = new Date(date).toLocaleString('default', {month: 'short'});
    return `${month} ${day}`;
};


// Main component for the health sleep visualization
export default function HealthSteps() {
    const [numDays, setNumDays] = useState(14);
    const lastDays = healthData.slice(-numDays);

    // Convert the data to the format required by the LineChart component
    const convertedData = lastDays.map((data) => ({
        ...data,
        key: data.Dates, // add the key property to display dates on x-axis
        FLOORS: data.FLOORS,
        STEPS: data.STEPS,
        DISTANCE: data.DISTANCE / 1000,
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
                    Visualizing the Steps Taken, Floors Climbed , and the Distance Travelled
                </h5>
                <div style={{display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom: '-20px'}}>
                    <span style={{
                        fontFamily: 'Consolas',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginRight: '8px',
                        marginTop: '7px'
                    }}>
                    Duration of Time to Analyze:
                    </span>
                    <DaysDropdown defaultValue="14" onSelect={handleDropdownChange}/>
                </div>
            </div>


            <div style={{height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
                    <div style={{flex: '50%', marginTop: '40px'}}>
                        <h3 style={{textAlign: 'center', fontFamily: 'Consolas', margin: '0'}}>Distance Travelled</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart style={{fontFamily: 'Consolas'}} data={convertedData}
                                       margin={{top: 10, right: 20, bottom: 10, left: 10}}>
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
                                        value: 'Distance (km)',
                                        angle: -90,
                                        position: 'Center',
                                        textAnchor: 'middle',
                                        fontSize: '75%',
                                        dy: -15, // move label down by 15%
                                        dx: -15, // move label left by 15%
                                    }}
                                    tick={{fontSize: '50%'}}
                                    tickFormatter={(value) => value}
                                />
                                <ReferenceLine x={convertedData[convertedData.length - 1].key} stroke="#000000"
                                               strokeWidth={0.8} zIndex={-1}/>
                                <Tooltip/>
                                <Line name="Distance" dataKey="DISTANCE" stroke='#EE6677' activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{flex: '50%', padding: '0 8px', marginTop: '40px'}}>
                        <h3 style={{textAlign: 'center', fontFamily: 'Consolas', margin: '0'}}> Steps Taken</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart style={{fontFamily: 'Consolas'}} data={convertedData}
                                       margin={{top: 10, right: 20, bottom: 10, left: 10}}>
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
                                        value: '# of Steps',
                                        angle: -90,
                                        position: 'insideCenter',
                                        textAnchor: 'middle',
                                        fontSize: '75%',
                                        dy: -15, // move label down by 15%
                                        dx: -20, // move label left by 20%
                                    }}
                                    tick={{fontSize: '50%'}}
                                    tickFormatter={(value) => value}
                                />
                                <Tooltip/>
                                <ReferenceLine x={convertedData[convertedData.length - 1].key} stroke="#000000"
                                               strokeWidth={0.8} zIndex={-1}/>
                                <Line name="Steps" dataKey="STEPS" stroke='#4477AA' activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '49%',
                    marginTop: '10px'
                }}>
                    <h3 style={{textAlign: 'center', fontFamily: 'Consolas', margin: '0'}}>Floors Climbed</h3>
                    <div style={{width: '100%', height: 250}}>
                        <ResponsiveContainer>
                            <LineChart style={{fontFamily: 'Consolas'}} data={convertedData}
                                       margin={{top: 10, right: 20, bottom: 10, left: 10}}>
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey="key"
                                    interval={0}
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
                                        value: '# of Floors',
                                        angle: -90,
                                        position: 'insideCenter',
                                        textAnchor: 'middle',
                                        fontSize: '75%',
                                        dy: -15, // move label down by 15%
                                        dx: -10, // move label left by 10%
                                    }}
                                    tick={{fontSize: '50%'}}
                                    tickFormatter={(value) => value}
                                />
                                <ReferenceLine x={convertedData[convertedData.length - 1].key} stroke="#000000" strokeWidth={0.8} zIndex={-1}/>
                                <Tooltip/>
                                <Line name="Floors" dataKey="FLOORS" stroke='#CCBB44' activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

