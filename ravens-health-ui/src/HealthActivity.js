import React, { useState } from 'react'; 
import './HealthActivity.css';
import healthData from './activity.json';
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
  PieChart,
  Pie,
  Sector,
  Cell,
} from 'recharts';
import DaysDropdown from './DaysDropdown';
import { Select } from 'antd';




const { Option } = Select;
const lastNDays = (n) => healthData.slice(-n);

// convert active data from minutes to hours


// specifying the colors to be used in the pie chart

const COLORS = ['#4477AA', '#EE6677', '#CCBB44', '#228833'];



const tickFormatter = (date) => {
  const day = new Date(date).getDate() + 1;
  const month = new Date(date).toLocaleString('default', { month: 'short' });
  return `${month} ${day}`;
};






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

const HealthActivity = () => {
  const [numDays, setNumDays] = useState(14);
  const [activeIndex, setActiveIndex] = useState(0);
  const data = lastNDays(numDays);

  const convertedData = data.map((data) => ({
    ...data,
    key: data.Dates, // add the key property to display dates on x-axis
    SED_MINS: data.SED_MINS / 60,
    L_AC_MINS: data.L_AC_MINS / 60,
    F_AC_MINS: data.F_AC_MINS / 60,
    V_AC_MINS: data.V_AC_MINS / 60,
  }));
  
  // finding the average for each active data for the pie chart
  const averages = data.length > 0 ? [
    {
      name: 'Sedentary Hours',
      value: parseFloat(
        (convertedData.reduce((total, data) => total + data.SED_MINS, 0) / convertedData.length).toFixed(1),
      ),
    },
    {
      name: 'Light Active Hours',
      value: parseFloat(
        (convertedData.reduce((total, data) => total + data.L_AC_MINS, 0) / convertedData.length).toFixed(1),
      ),
    },
    {
      name: 'Fairly Active Hours',
      value: parseFloat(
        (convertedData.reduce((total, data) => total + data.F_AC_MINS, 0) / convertedData.length).toFixed(1),
      ),
    },
    {
      name: 'Very Active Hours',
      value: parseFloat(
        (convertedData.reduce((total, data) => total + data.V_AC_MINS, 0) / convertedData.length).toFixed(1),
      ),
    },
  ] : [];

  
  const convertedDataWith1SigFig = convertedData.map((data) => ({
    ...data,
    SED_MINS: parseFloat(data.SED_MINS.toFixed(1)),
    L_AC_MINS: parseFloat(data.L_AC_MINS.toFixed(1)),
    F_AC_MINS: parseFloat(data.F_AC_MINS.toFixed(1)),
    V_AC_MINS: parseFloat(data.V_AC_MINS.toFixed(1)),
  }));

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleDropdownChange = (value) => {
    setNumDays(value);
  };
  return (
    <div className="container" height="80 vh">
<div
        className="header"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h1
          style={{ fontFamily: 'Consolas', fontSize: '24px', marginBottom: '-30px' }}
          className="text-heading"
        >
          . Ravens' Health .
        </h1>
        <h5
          style={{ fontFamily: 'Consolas', fontSize: '16px', marginBottom: '0px' }}
          className="text-heading"
        >
          Visualizing how much of the patient's day was spent on each activity
        </h5>
        <div
          style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom: '-20px' }}
        >
          <span style={{ fontFamily: 'Consolas', fontSize: '14px', fontWeight: 'bold', marginRight: '8px', marginTop: '7px'}}>
            Duration of Time to Analyze:
          </span>
          <DaysDropdown defaultValue="14" onSelect={handleDropdownChange} />
        </div>
      </div>      
      <div style={{ width: "90%", height: "650px", display: "flex" }}>
  <ResponsiveContainer width="50%" height="55%" >
    <PieChart style={{ fontFamily: "Consolas" }}>
    <Pie
  activeIndex={activeIndex}
  activeShape={renderActiveShape}
  data={averages}
  cx="50%"
  cy="50%"
  innerRadius={90}
  outerRadius={110}
  fill="#8884d8"
  dataKey="value"
  onMouseEnter={onPieEnter}
>
  {averages.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>

  <div style={{ flex: '50%', padding: '0 8px' , marginTop: '40px'}}>
  <h3 style={{ textAlign: 'center', fontFamily: 'Consolas' , margin: '0'  }}> The Amount of Hours Spent During Each Level of Activity </h3>
    <ResponsiveContainer width="100%" aspect={2}>
      <LineChart style={{ fontFamily: 'Consolas' }} data={convertedDataWith1SigFig}margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
      <CartesianGrid vertical={false}/>
        <XAxis
              dataKey="key"
              interval={'preserveStartEnd'}
              label={{
                value: 'Date',
                position: 'bottom',
                offset: -9,
                fontSize: '75%',
              }}
              tick={{ fontSize: '50%', dx: -3 }}
              tickFormatter={tickFormatter}
            />
            <YAxis
              label={{
                value: 'Hours',
                angle: -90,
                position: 'insideLeft',
                textAnchor: 'middle',
                fontSize: '75%',
                dy: -15, // move label down by 15%
                dx: 25 // move label left by 15%
              }}
              tick={{ fontSize: '50%' }}
              tickFormatter={(value) => value}
            />        <Legend />
        <Tooltip />
        <ReferenceLine x={convertedData[convertedData.length - 1].key} stroke="#000000" strokeWidth={0.8} zIndex={-1} />
        <Line name="Sedentary Hours" dataKey="SED_MINS" stroke='#4477AA' activeDot={{ r: 8 }} />
        <Line name="Lightly Active Hours" dataKey="L_AC_MINS" stroke='#EE6677' activeDot={{ r: 8 }} />
        <Line name="Fairly Active Hours" dataKey="F_AC_MINS" stroke='#CCBB44' activeDot={{ r: 8 }} />
        <Line name="Very Active Hours" dataKey="V_AC_MINS" stroke='#228833' activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
</div>
);
};

export default HealthActivity;    


