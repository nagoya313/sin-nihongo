import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import { RadioGroup as MuiRadioGroup } from '@material-ui/core';

type Label = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  labels: Label[];
};

export const RadioGroup: React.FC<Props> = ({ value, title, onChange, labels }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      <MuiRadioGroup row value={value} onChange={onChange}>
        {labels.map((label) => (
          <FormControlLabel
            key={`form_control_label_${label.label}_${label.value}`}
            value={label.value}
            control={<Radio color="primary" />}
            label={label.label}
            labelPlacement="top"
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};
