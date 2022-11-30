import React, { PureComponent } from 'react';
import './App.css';
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
    Cell,
    LabelList
} from 'recharts';


const pdata = [
  {
      name: 'Saturday',
      hoursLightSleep: 50,
      hoursREMSleep: 12,
      hoursDeepSleep: 31,
      hoursAwake: 54
  },
  {
      name: 'Sunday',
      hoursLightSleep: 60,
      hoursREMSleep: 76,
      hoursDeepSleep: 90,
      hoursAwake: 70
  },
  {
      name: 'Monday',
      hoursLightSleep: 80,
      hoursREMSleep: 89,
      hoursDeepSleep: 50,
      hoursAwake: 150
  },
  {
      name: 'Tuesday',
      hoursLightSleep: 110,
      hoursREMSleep: 87,
      hoursDeepSleep: 131,
      hoursAwake: 140
  },
  {
      name: 'Wednesday',
      hoursLightSleep: 34,
      hoursREMSleep: 33,
      hoursDeepSleep: 67,
      hoursAwake: 87
  },
  {
      name: 'Thursday',
      hoursLightSleep: 45,
      hoursREMSleep: 98,
      hoursDeepSleep: 56,
      hoursAwake: 99
  },
  {
    name: 'Friday',
    hoursLightSleep: 130,
    hoursREMSleep: 33,
    hoursDeepSleep: 23,
    hoursAwake: 120
  },
];




const data = [
  { name: 'Light Sleep Hours', value: 400 },
  { name: 'REM Sleep Hours', value: 300 },
  { name: 'Deep Sleep Hours', value: 300 },
  { name: 'Awake Hours', value: 200 },
];

const COLORS = ['violet', 'purple', 'grey', 'brown'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
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
      
      
      
      <h1 className="text-heading" style = {{fontFamily: "Consolas"}} >
              . Ravens' Health .
              
            </h1>
            


            <ResponsiveContainer width="60%" aspect={3} 
            margin={{ right: 200, up:400}} >
      <PieChart style = {{fontFamily: "Consolas"}} width={600} height={900} margin={{ right: 200, down:400}}  >
      <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={90}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          >
              
        
         {
           data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
         }
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
      </ResponsiveContainer>

      


            <ResponsiveContainer width="100%" aspect={5} 
            >
            <LineChart style = {{fontFamily: "Consolas"}} data={pdata} margin={{ right: 200, left:505 , down:400, up:200} } 
            >
                    <CartesianGrid />
                    <XAxis dataKey="name" 
                        interval={'preserveStartEnd'} >
                            </XAxis>
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
                    <Legend />
                    <Tooltip />
                    <Line dataKey="hoursAwake" 
                        stroke="brown" activeDot={{ r: 8 }} />
                    <Line dataKey="hoursLightSleep"
                        stroke="violet" activeDot={{ r: 8 }} />
                    <Line dataKey="hoursDeepSleep"
                        stroke="grey" activeDot={{ r: 8 }} />
                    <Line dataKey="hoursREMSleep"
                        stroke="purple" activeDot={{ r: 8 }} />
                    
                </LineChart>
                </ResponsiveContainer>

      
      
      
      </>
    );
  }
}
