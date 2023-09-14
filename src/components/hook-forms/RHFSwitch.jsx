import PropTypes from 'prop-types';
// form
import { Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel, FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

RHFSwitch.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFSwitch({ name, helperText,control, ...rest }) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel control={<Switch {...field} checked={field.value} />} {...rest} />
          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}
