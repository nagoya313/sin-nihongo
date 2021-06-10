import { Control, Controller, Path } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import { RadioGroup as MuiRadioGroup } from '@material-ui/core';

type Label = {
  value: string;
  label: string;
};

type Props<Values> = {
  name: Path<Values>;
  title: string;
  labels: Label[];
  control: Control<Values>;
  type: 'text' | 'number' | 'boolean';
};

const numberToString = (value: number) => {
  return isNaN(value) || value === 0 || value === null ? '' : value.toString();
};

const booleanToString = (value: boolean) => {
  return typeof value === 'undefined' ? '' : value.toString();
};

const stringToNumber = (value: string) => {
  const output = parseInt(value, 10);
  return isNaN(output) ? null : output;
};

const stringToBoolean = (value: string) => {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }
  return undefined;
};

export function RadioGroup<Values>({ name, title, labels, control, type }: Props<Values>) {
  const input = type === 'number' ? numberToString : booleanToString;
  const output = type === 'number' ? stringToNumber : stringToBoolean;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl component="fieldset">
          <FormLabel component="legend">{title}</FormLabel>
          <MuiRadioGroup
            value={input(field.value)}
            onChange={(e) => {
              field.onChange(output(e.target.value));
            }}
            row
          >
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
      )}
    />
  );
}
