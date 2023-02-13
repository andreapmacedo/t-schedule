import React from 'react';

import {
    Container,
    ToggleLabel,
    ToggleSelector
} from './styles';

interface IToggleProps {
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

const Toggle: React.FC<IToggleProps> = ({
    labelLeft,
    labelRight,
    checked,
    onChange
}) => (
    <Container>
        <ToggleLabel>{labelLeft}</ToggleLabel>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleSelector                    
            checked={checked}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={onChange}
        />
        <ToggleLabel>{labelRight}</ToggleLabel>
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
)

export default Toggle;