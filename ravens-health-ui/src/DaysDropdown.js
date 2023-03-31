// Import necessary libraries and components
import React from 'react';
import {Select} from 'antd';

// Destructure Option from Select for convenience
const {Option} = Select;

// Define the DaysDropdown functional component
const DaysDropdown = ({defaultValue, onSelect}) => {
    // Render the dropdown component with the provided default value and callback function
    return (
        <Select defaultValue={defaultValue} onChange={onSelect} style={{width: 120}}>
            <Option value="7">7 Days</Option>
            <Option value="14">14 Days</Option>
            <Option value="21">21 Days</Option>
        </Select>
    );
};

// Export the DaysDropdown component for use in other modules
export default DaysDropdown;
