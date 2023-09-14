import Slider from "components/mui-form/Slider";
import { Controller } from "react-hook-form";

const RHFSlider = ({ name, control, ...rest }) => {
  return <Controller name={name} control={control} render={({ field }) => <Slider {...field} {...rest} />} />;
};

export default RHFSlider;
