// DaysDropdown.js
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const DaysDropdown = ({ defaultValue, onSelect }) => {
  return (
    <Select defaultValue={defaultValue} onChange={onSelect} style={{ width: 120 }}>
      <Option value="7">7 Days</Option>
      <Option value="14">14 Days</Option>
      <Option value="21">21 Days</Option>
    </Select>
  );
};

export default DaysDropdown;