//Raven's Health -> Visualizing the activity data
//Mo'min Mushtaha - 101114546

import React, {PureComponent} from 'react';
import './App.css';
import healthData from './health1.json';
import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Sector,
    Cell
} from 'recharts';



//finding the average for each activity data for the pie chart

const Sedentary_data = healthData.map((healthData)=>healthData.SED_MINS);
const Light_active_data = healthData.map((healthData)=>healthData.L_AC_MINS);
const Fair_active_data = healthData.map((healthData)=>healthData.F_AC_MINS);
const Very_active_data = healthData.map((healthData)=>healthData.V_AC_MINS);




const averages = [
  {name: 'Very Active Hours', value: parseFloat(((Very_active_data.reduce((total, score) => total + score, 0))
   / healthData.length).toFixed(2))},
  {name: 'Lightly Active Hours', value: parseFloat(((Light_active_data.reduce((total, score) => total + score, 0)) 
  / healthData.length).toFixed(2))},
  {name: 'Fairly Active Hours', value: parseFloat(((Fair_active_data.reduce((total, score) => total + score, 0)) 
  / healthData.length).toFixed(2)) },
  {name: 'Sedentary Hours', value: parseFloat(((Sedentary_data.reduce((total, score) => total + score, 0)) 
  / healthData.length).toFixed(2))},
];

//specifying the colors to be used in the pie chart

const COLORS = ['blue', 'red', 'green', 'black'];


//creating the interactive pie chart

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent} = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333"> 
      {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#333">
      {` of total hours`}
      </text>
    </g>
  );
};


export default class Example extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };


render() {
  return (
      
    <>
    <h1 className="text-heading" style = {{fontFamily: "Consolas"}}>
      . Ravens' Health .
    </h1>
    <h5 className="text-heading" style = {{fontFamily: "Consolas"}}>
         Visualizing the activity data    
    </h5>
      <ResponsiveContainer width="60%" aspect={3} margin={{right: 200, up: 400}}>
        <PieChart style = {{fontFamily: "Consolas"}} width={600} height={900} margin={{right: 200, down: 400}}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={averages}
            cx="50%"
            cy="45%"
            innerRadius={90}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          >
              
         {averages.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
         {averages.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" aspect={5}>
        <LineChart style = {{fontFamily: "Consolas"}} data = {healthData} margin={{ right: 200, left: 505, down: 400, up:200}}>
          <CartesianGrid />
          <XAxis dataKey="key" interval={'preserveStartEnd'}/>
          <YAxis   label={{ value: 'Minutes', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
          <Legend />
          <Tooltip />
            <Line name= "Sedentary Hours" dataKey="SED_MINS" stroke="black" activeDot={{ r: 8 }} />
            <Line name= "Very Active Hours" dataKey="V_AC_MINS" stroke="blue" activeDot={{ r: 8 }} />
            <Line name= "Fairly Active Hours" dataKey="F_AC_MINS" stroke="green" activeDot={{ r: 8 }} />
            <Line name= "Lightly Active Hours" dataKey="L_AC_MINS" stroke="red" activeDot={{ r: 8 }} />   
        </LineChart>
      </ResponsiveContainer>
    </>
    );
  }
}