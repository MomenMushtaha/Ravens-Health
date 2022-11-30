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
      hoursSedentary: 50,
      hoursLightlyActive: 12,
      hoursFairlyActive: 31,
      hoursVeryActive: 54
  },
  {
      name: 'Sunday',
      hoursSedentary: 60,
      hoursLightlyActive: 76,
      hoursFairlyActive: 90,
      hoursVeryActive: 70
  },
  {
      name: 'Monday',
      hoursSedentary: 80,
      hoursLightlyActive: 89,
      hoursFairlyActive: 50,
      hoursVeryActive: 150
  },
  {
      name: 'Tuesday',
      hoursSedentary: 110,
      hoursLightlyActive: 87,
      hoursFairlyActive: 131,
      hoursVeryActive: 140
  },
  {
      name: 'Wednesday',
      hoursSedentary: 34,
      hoursLightlyActive: 33,
      hoursFairlyActive: 67,
      hoursVeryActive: 87
  },
  {
      name: 'Thursday',
      hoursSedentary: 45,
      hoursLightlyActive: 98,
      hoursFairlyActive: 56,
      hoursVeryActive: 99
  },
  {
    name: 'Friday',
    hoursSedentary: 130,
    hoursLightlyActive: 33,
    hoursFairlyActive: 23,
    hoursVeryActive: 120
  },
];




const data = [
  { name: 'Very Active Hours', value: 400 },
  { name: 'Lightly Active Hours', value: 300 },
  { name: 'Fairly Active Hours', value: 300 },
  { name: 'Sedentary Hours', value: 200 },
];

const COLORS = ['blue', 'red', 'green', 'black'];

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
      
      
      
      <h1 className="text-heading" style = {{fontFamily: "Consolas"}}>
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
                    <Line dataKey="hoursSedentary" 
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="hoursLightlyActive"
                        stroke="red" activeDot={{ r: 8 }} />
                    <Line dataKey="hoursFairlyActive"
                        stroke="green" activeDot={{ r: 8 }} />
                    <Line dataKey="hoursVeryActive"
                        stroke="blue" activeDot={{ r: 8 }} />
                    
                </LineChart>
                </ResponsiveContainer>

      
      
      
      </>
    );
  }
}