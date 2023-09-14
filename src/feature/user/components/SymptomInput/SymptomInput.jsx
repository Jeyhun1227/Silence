import symptomTypes from "constants/symptomTypes";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "../Slider";
import RHFCheckbox from "components/hook-forms/RHFCheckbox";

const SymptomInput = ({ type, ...props }) => {
  if (type === symptomTypes.SINGLE_SLIDER) return <Slider {...props} />;
  if (type === symptomTypes.DOUBLE_SLIDER) return <Slider multiple {...props} />;
  if (type === symptomTypes.CHECKBOX)
    return <FormControlLabel control={<RHFCheckbox {...props} name={`${props.name}.value`} />} label={props?.label} />;
};

export default SymptomInput;
