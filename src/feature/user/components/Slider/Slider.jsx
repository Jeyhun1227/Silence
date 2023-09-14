import { Container, SliderContainer } from "./styled";
import { FormLabel, Typography } from "@mui/material";
import RHFSlider from "components/hook-forms/RHFSlider";

const Slider = ({ label, multiple, control, name }) => {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <Container>
        {multiple ? (
          <>
            <SliderContainer>
              <Typography sx={{ mr: 2 }} variant="caption">
                Left
              </Typography>
              <RHFSlider valueLabelDisplay="auto" min={0} max={100} control={control} name={`${name}.left`} />
            </SliderContainer>
            <SliderContainer>
              <Typography sx={{ mr: 2 }} variant="caption">
                Right
              </Typography>
              <RHFSlider valueLabelDisplay="auto" min={0} max={100} control={control} name={`${name}.right`} />
            </SliderContainer>
          </>
        ) : (
          <SliderContainer>
            <RHFSlider valueLabelDisplay="auto" min={0} max={100} control={control} name={`${name}.value`} />
          </SliderContainer>
        )}
      </Container>
    </div>
  );
};

export default Slider;
