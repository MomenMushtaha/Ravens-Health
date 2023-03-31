import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import DaysDropdown from "../DaysDropdown";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/DaysDropdown">
                <DaysDropdown/>
            </ComponentPreview>
        </Previews>
    )
};

export default ComponentPreviews