import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { UserMeta } from "@prisma/client";

const steps = ["Basic Info", "Traffic Sources", "Create Profile"];

// RegEx for matching phone numbers
// 0100339933
const phoneRegEx = /^0\d{10}$/;

const RegisterForm: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const { data: session, status } = useSession();

  // Router Initializing
  const router = useRouter();

  // App Category Radio Input state
  const [ws_appCategory, setWs_appCategory] = React.useState<string>("");

  const [formIsValid, setFormIsValid] = React.useState<boolean>(false);

  const appCategoryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWs_appCategory(e.target.value);
  };

  // Input states
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [whatsNumber, setWhatsNumber] = React.useState("");

  function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
  }

  function handleCountryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCountry(event.target.value);
  }

  function handleCityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  function handlePhoneNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(event.target.value);
  }

  function handleWhatsNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    setWhatsNumber(event.target.value);
  }

  // Input refs
  const companyNameInputRef = React.useRef<HTMLInputElement | null>(null);
  const websiteLinkInputRef = React.useRef<HTMLInputElement | null>(null);

  const ws_webSiteNameInputRef = React.useRef<HTMLInputElement | null>(null);

  const mb_searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const mb_socialInputRef = React.useRef<HTMLInputElement | null>(null);
  const mb_nativeInputRef = React.useRef<HTMLInputElement | null>(null);
  const mb_displayInputRef = React.useRef<HTMLInputElement | null>(null);
  const mb_videoInputRef = React.useRef<HTMLInputElement | null>(null);
  const mb_othersInputRef = React.useRef<HTMLInputElement | null>(null);

  const sm_facebookInputRef = React.useRef<HTMLInputElement | null>(null);
  const sm_twitterInputRef = React.useRef<HTMLInputElement | null>(null);
  const sm_instagramInputRef = React.useRef<HTMLInputElement | null>(null);
  const sm_tiktokInputRef = React.useRef<HTMLInputElement | null>(null);
  const sm_snapchatInputRef = React.useRef<HTMLInputElement | null>(null);
  const sm_pinterestInputRef = React.useRef<HTMLInputElement | null>(null);
  const sm_youtubeInputRef = React.useRef<HTMLInputElement | null>(null);
  const sm_linkedinInputRef = React.useRef<HTMLInputElement | null>(null);
  const sm_whatsappInputRef = React.useRef<HTMLInputElement | null>(null);
  const sm_telegramInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    // Check phone and whatsapp numbers against regex
    const phoneCheck = phoneRegEx.test(phoneNumber);
    const whatsCheck = phoneRegEx.test(whatsNumber);

    setFormIsValid(
      !!firstName &&
        !!lastName &&
        !!country &&
        !!city &&
        phoneCheck &&
        whatsCheck
    );
  }, [firstName, lastName, country, city, phoneNumber, whatsNumber]);

  function onConfirmRegister() {
    if (session?.user.userId) {
      const newUser: Partial<UserMeta> = {
        firstName,
        lastName,
        country,
        city,
        phoneNumber,
        whatsNumber,
        companyName: companyNameInputRef.current?.value || null,
        websiteLink: websiteLinkInputRef.current?.value || null,

        ws_webSiteName: ws_webSiteNameInputRef.current?.value || null,
        ws_appCategory,

        mb_search: mb_searchInputRef.current?.value || null,
        mb_social: mb_socialInputRef.current?.value || null,
        mb_native: mb_nativeInputRef.current?.value || null,
        mb_display: mb_displayInputRef.current?.value || null,
        mb_video: mb_videoInputRef.current?.value || null,
        mb_others: mb_othersInputRef.current?.value || null,

        sm_facebook: sm_facebookInputRef.current?.value || null,
        sm_twitter: sm_twitterInputRef.current?.value || null,
        sm_instagram: sm_instagramInputRef.current?.value || null,
        sm_tiktok: sm_tiktokInputRef.current?.value || null,
        sm_snapchat: sm_snapchatInputRef.current?.value || null,
        sm_pinterest: sm_pinterestInputRef.current?.value || null,
        sm_youtube: sm_youtubeInputRef.current?.value || null,
        sm_linkedin: sm_linkedinInputRef.current?.value || null,
        sm_whatsapp: sm_whatsappInputRef.current?.value || null,
        sm_telegram: sm_telegramInputRef.current?.value || null,
        privilege: "publisher",
        reqNumber: 3,
        last_login: new Date(),
        userId: session?.user.userId,
      };

      fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          router.push("/campaigns");
        })
        .then();
    }
  }

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
    <Box sx={{ width: "100%" }}>
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
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box component="div">
            {/* STEP #0 */}
            <Box
              component="div"
              sx={{
                display: `${activeStep === 0 ? "flex" : "none"}`,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  sx={{ m: 2 }}
                  value={firstName}
                  onChange={handleFirstNameChange}
                  helperText="Required"
                />
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  sx={{ m: 2 }}
                  value={lastName}
                  onChange={handleLastNameChange}
                  helperText="Required"
                />
              </Box>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Country"
                  variant="standard"
                  sx={{ m: 2 }}
                  value={country}
                  onChange={handleCountryChange}
                  helperText="Required"
                />
                <TextField
                  id="standard-basic"
                  label="City"
                  variant="standard"
                  sx={{ m: 2 }}
                  value={city}
                  onChange={handleCityChange}
                  helperText="Required"
                />
              </Box>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Phone Number"
                  variant="standard"
                  sx={{ m: 2 }}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  helperText="Required"
                />
                <TextField
                  id="standard-basic"
                  label="Whats Number"
                  variant="standard"
                  sx={{ m: 2 }}
                  value={whatsNumber}
                  onChange={handleWhatsNumberChange}
                  helperText="Required"
                />
              </Box>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Company Name"
                  variant="standard"
                  sx={{ m: 2 }}
                  inputRef={companyNameInputRef}
                />
                <TextField
                  id="standard-basic"
                  label="Website Link"
                  variant="standard"
                  sx={{ m: 2 }}
                  inputRef={websiteLinkInputRef}
                />
              </Box>
            </Box>

            {/* STEP #1 */}
            <Box
              component="div"
              sx={{
                display: `${activeStep === 1 ? "flex" : "none"}`,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Accordion sx={{ width: "100%", my: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Website</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    component="div"
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Add website name"
                      variant="outlined"
                      inputRef={ws_webSiteNameInputRef}
                    />
                    <FormControl sx={{ my: 2 }}>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Please select the app Category
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={ws_appCategory}
                        onChange={appCategoryChangeHandler}
                      >
                        <FormControlLabel
                          value="coupon"
                          control={<Radio />}
                          label="Coupon"
                        />
                        <FormControlLabel
                          value="cashback"
                          control={<Radio />}
                          label="Cashback"
                        />
                        <FormControlLabel
                          value="price-comparison"
                          control={<Radio />}
                          label="Price Comparison"
                        />
                        <FormControlLabel
                          value="content"
                          control={<Radio />}
                          label="Content"
                        />
                        <FormControlLabel
                          value="others"
                          control={<Radio />}
                          label="Others"
                        />
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
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Search"
                      variant="outlined"
                      sx={{ m: 1 }}
                      inputRef={mb_searchInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Social"
                      variant="outlined"
                      sx={{ m: 1 }}
                      inputRef={mb_socialInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Native"
                      variant="outlined"
                      sx={{ m: 1 }}
                      inputRef={mb_nativeInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Display"
                      variant="outlined"
                      sx={{ m: 1 }}
                      inputRef={mb_displayInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Video"
                      variant="outlined"
                      sx={{ m: 1 }}
                      inputRef={mb_videoInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Others"
                      variant="outlined"
                      sx={{ m: 1 }}
                      inputRef={mb_othersInputRef}
                    />
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
                <AccordionDetails
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    component="div"
                    sx={{
                      maxWidth: "60rem",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Facebook username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FacebookIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_facebookInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Twitter username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TwitterIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_twitterInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Instagram username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <InstagramIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_instagramInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Pinterest username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PinterestIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_pinterestInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Youtube username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <YouTubeIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_youtubeInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="LinkedIn username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkedInIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_linkedinInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Whatsapp username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WhatsAppIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_whatsappInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Telegram username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TelegramIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_telegramInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Snapchat username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RemoveIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_snapchatInputRef}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Tiktok username"
                      variant="outlined"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <div className="w-6"></div>
                          </InputAdornment>
                        ),
                      }}
                      inputRef={sm_tiktokInputRef}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>

            {/* STEP #2 */}
            <Box
              component="div"
              sx={{
                display: `${activeStep === 2 ? "flex" : "none"}`,
                flexDirection: "column",
                alignItems: "center",
                margin: "2rem",
              }}
            >
              <Typography sx={{ my: "1rem" }}>
                Thanks for registering with us, To finish registeration click
                Confirm!
              </Typography>
              <Button variant="outlined" onClick={onConfirmRegister}>
                confirm
              </Button>
            </Box>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep < steps.length - 1 && (
              <Button onClick={handleNext} disabled={!formIsValid}>
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default RegisterForm;
