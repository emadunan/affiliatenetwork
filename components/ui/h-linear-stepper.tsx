import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

const steps = ['Basic Info', 'Traffic Sources', 'Create Profile'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box component="div">
            {/* STEP #0 */}
            <Box component="div" sx={{ display: `${activeStep === 0 ? "flex" : "none"}`, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Box component="div" sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <TextField id="standard-basic" label="First Name" variant="standard" sx={{ m: 2 }} />
                <TextField id="standard-basic" label="Last Name" variant="standard" sx={{ m: 2 }} />
              </Box>
              <Box component="div" sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <TextField id="standard-basic" label="Country" variant="standard" sx={{ m: 2 }} />
                <TextField id="standard-basic" label="City" variant="standard" sx={{ m: 2 }} />
              </Box>
              <Box component="div" sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <TextField id="standard-basic" label="Phone Number" variant="standard" sx={{ m: 2 }} />
                <TextField id="standard-basic" label="Whats Number" variant="standard" sx={{ m: 2 }} />
              </Box>
              <Box component="div" sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <TextField id="standard-basic" label="Company Name" variant="standard" sx={{ m: 2 }} />
                <TextField id="standard-basic" label="Website Link" variant="standard" sx={{ m: 2 }} />
              </Box>
            </Box>
            {/* STEP #1 */}
            <Box component="div" sx={{ display: `${activeStep === 1 ? "flex" : "none"}`, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Accordion sx={{ width: "100%", my: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Website</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box component="div" sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <TextField id="outlined-basic" label="Add website name" variant="outlined" />
                    <FormControl sx={{ my: 2 }}>
                      <FormLabel id="demo-row-radio-buttons-group-label">Please select the app Category</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel value="coupon" control={<Radio />} label="Coupon" />
                        <FormControlLabel value="cashback" control={<Radio />} label="Cashback" />
                        <FormControlLabel value="price-comparison" control={<Radio />} label="Price Comparison" />
                        <FormControlLabel value="content" control={<Radio />} label="Content" />
                        <FormControlLabel value="others" control={<Radio />} label="Others" />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ my: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Media Buying</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box component="div" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <TextField id="outlined-basic" label="Search" variant="outlined" sx={{ m: 1 }} />
                    <TextField id="outlined-basic" label="Social" variant="outlined" sx={{ m: 1 }} />
                    <TextField id="outlined-basic" label="Native" variant="outlined" sx={{ m: 1 }} />
                    <TextField id="outlined-basic" label="Display" variant="outlined" sx={{ m: 1 }} />
                    <TextField id="outlined-basic" label="Video" variant="outlined" sx={{ m: 1 }} />
                    <TextField id="outlined-basic" label="Others" variant="outlined" sx={{ m: 1 }} />
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ width: "100%", my: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Social</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", justifyContent: "center" }}>
                  <Box component="div" sx={{ maxWidth: "60rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <TextField id="outlined-basic" label="Facebook username" variant="outlined" sx={{ m: 1 }} InputProps={{
                      startAdornment: (<InputAdornment position="start"><FacebookIcon /></InputAdornment>)
                    }} />
                    <TextField id="outlined-basic" label="Twitter username" variant="outlined" sx={{ m: 1 }} InputProps={{
                      startAdornment: (<InputAdornment position="start"><TwitterIcon /></InputAdornment>)
                    }} />
                    <TextField id="outlined-basic" label="Instagram username" variant="outlined" sx={{ m: 1 }} InputProps={{
                      startAdornment: (<InputAdornment position="start"><InstagramIcon /></InputAdornment>)
                    }} />

                    <TextField id="outlined-basic" label="Pinterest username" variant="outlined" sx={{ m: 1 }} InputProps={{
                      startAdornment: (<InputAdornment position="start"><PinterestIcon /></InputAdornment>)
                    }} />
                    <TextField id="outlined-basic" label="Youtube username" variant="outlined" sx={{ m: 1 }} InputProps={{
                      startAdornment: (<InputAdornment position="start"><YouTubeIcon /></InputAdornment>)
                    }} />
                    <TextField id="outlined-basic" label="LinkedIn username" variant="outlined" sx={{ m: 1 }} InputProps={{
                      startAdornment: (<InputAdornment position="start"><LinkedInIcon /></InputAdornment>)
                    }} />
                    <TextField id="outlined-basic" label="Whatsapp username" variant="outlined" sx={{ m: 1 }} InputProps={{
                      startAdornment: (<InputAdornment position="start"><WhatsAppIcon /></InputAdornment>)
                    }} />
                    <TextField id="outlined-basic" label="Telegram username" variant="outlined" sx={{ m: 1 }} InputProps={{
                      startAdornment: (<InputAdornment position="start"><TelegramIcon /></InputAdornment>)
                    }} />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            {/* STEP #1 */}
            <Box component="div" sx={{ display: `${activeStep === 2 ? "flex" : "none"}`, flexDirection: "column", alignItems: "center", margin: "2rem" }}>
              <Typography sx={{ my: "1rem" }}>Thanks for registering with us, To finish registeration click Confirm!</Typography>
              <Button variant="outlined">confirm</Button>
            </Box>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep < steps.length - 1 && (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
        </React.Fragment>
      )
      }
    </Box >
  );
}