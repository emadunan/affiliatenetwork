import { FC, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { UserWithMeta } from "@prisma/client/scalar";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import RemoveIcon from "@mui/icons-material/Remove";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EditUser: FC = () => {
  // Input states
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [whatsNumber, setWhatsNumber] = useState<string>();

  // App Category Radio Input state
  const [ws_appCategory, setWs_appCategory] = useState<string>();

  // Input refs
  const companyNameInputRef = useRef<HTMLInputElement | null>(null);
  const websiteLinkInputRef = useRef<HTMLInputElement | null>(null);

  const ws_webSiteNameInputRef = useRef<HTMLInputElement | null>(null);

  const mb_searchInputRef = useRef<HTMLInputElement | null>(null);
  const mb_socialInputRef = useRef<HTMLInputElement | null>(null);
  const mb_nativeInputRef = useRef<HTMLInputElement | null>(null);
  const mb_displayInputRef = useRef<HTMLInputElement | null>(null);
  const mb_videoInputRef = useRef<HTMLInputElement | null>(null);
  const mb_othersInputRef = useRef<HTMLInputElement | null>(null);

  const sm_facebookInputRef = useRef<HTMLInputElement | null>(null);
  const sm_twitterInputRef = useRef<HTMLInputElement | null>(null);
  const sm_instagramInputRef = useRef<HTMLInputElement | null>(null);
  const sm_tiktokInputRef = useRef<HTMLInputElement | null>(null);
  const sm_snapchatInputRef = useRef<HTMLInputElement | null>(null);
  const sm_pinterestInputRef = useRef<HTMLInputElement | null>(null);
  const sm_youtubeInputRef = useRef<HTMLInputElement | null>(null);
  const sm_linkedinInputRef = useRef<HTMLInputElement | null>(null);
  const sm_whatsappInputRef = useRef<HTMLInputElement | null>(null);
  const sm_telegramInputRef = useRef<HTMLInputElement | null>(null);

  // State handler functions
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

  const handleAppCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWs_appCategory(e.target.value);
  };

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data: user, error } = useSWR<UserWithMeta>(
    `/api/users/${id}`,
    fetcher
  );

  useEffect(() => {
    setFirstName(user?.userMeta?.firstName);
    setLastName(user?.userMeta?.lastName);
    setCountry(user?.userMeta?.country);
    setCity(user?.userMeta?.city);
    setPhoneNumber(user?.userMeta?.phoneNumber);
    setWhatsNumber(user?.userMeta?.whatsNumber);
    setWs_appCategory(user?.userMeta?.ws_appCategory || "");
  }, [user]);

  async function updateProfileHandler() {
    const userData = {
      userMeta: {
        firstName,
        lastName,
        country,
        city,
        phoneNumber,
        whatsNumber,
        companyName: companyNameInputRef.current?.value,
        websiteLink: websiteLinkInputRef.current?.value,
        ws_webSiteName: ws_webSiteNameInputRef.current?.value,
        ws_appCategory,
        mb_search: mb_searchInputRef.current?.value,
        mb_social: mb_socialInputRef.current?.value,
        mb_native: mb_nativeInputRef.current?.value,
        mb_display: mb_displayInputRef.current?.value,
        mb_video: mb_videoInputRef.current?.value,
        mb_others: mb_othersInputRef.current?.value,
        sm_facebook: sm_facebookInputRef.current?.value,
        sm_twitter: sm_twitterInputRef.current?.value,
        sm_instagram: sm_instagramInputRef.current?.value,
        sm_pinterest: sm_pinterestInputRef.current?.value,
        sm_youtube: sm_youtubeInputRef.current?.value,
        sm_linkedin: sm_linkedinInputRef.current?.value,
        sm_whatsapp: sm_whatsappInputRef.current?.value,
        sm_telegram: sm_telegramInputRef.current?.value,
        sm_snapchat: sm_snapchatInputRef.current?.value,
        sm_tiktok: sm_snapchatInputRef.current?.value,
      }
    };

    const response = await fetch(`/api/users/${user?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) console.error(response.statusText);
    
    const updatedUser = await response.json();

    console.log(updatedUser);
    
  }

  return (
    <div>
      {user && (
        <div>
          <Divider sx={{ mt: 4 }}>
            <Avatar
              sx={{ width: 99, height: 99 }}
              alt={user?.email || ""}
              src={user?.image as string}
            />
          </Divider>
          <Box component="div" className="flex justify-between items-center">
            <Button
              variant="outlined"
              color="info"
              startIcon={<ArrowBackIcon />}
              className="mx-1"
              onClick={() => router.back()}
            >
              Back
            </Button>
            <p className="mx-4 my-2">{`E-mail: ${user?.email}`}</p>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<SaveIcon />}
              className="mx-1"
              onClick={updateProfileHandler}
            >
              Save
            </Button>
          </Box>
          <Box component="div" className="flex flex-wrap justify-around">
            {firstName && (
              <TextField
                id="standard-basic"
                label="First Name"
                variant="standard"
                sx={{ m: 2 }}
                value={firstName}
                onChange={handleFirstNameChange}
              />
            )}
            {lastName && (
              <TextField
                id="standard-basic"
                label="Last Name"
                variant="standard"
                sx={{ m: 2 }}
                value={lastName}
                onChange={handleLastNameChange}
              />
            )}
            {country && (
              <TextField
                id="standard-basic"
                label="Country"
                variant="standard"
                sx={{ m: 2 }}
                value={country}
                onChange={handleCountryChange}
              />
            )}
            {city && (
              <TextField
                id="standard-basic"
                label="City"
                variant="standard"
                sx={{ m: 2 }}
                value={city}
                onChange={handleCityChange}
              />
            )}
            {phoneNumber && (
              <TextField
                id="standard-basic"
                label="Phone Number"
                variant="standard"
                sx={{ m: 2 }}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            )}
            {whatsNumber && (
              <TextField
                id="standard-basic"
                label="Whats Number"
                variant="standard"
                sx={{ m: 2 }}
                value={whatsNumber}
                onChange={handleWhatsNumberChange}
              />
            )}
            <TextField
              id="standard-basic"
              label="Company Name"
              variant="standard"
              sx={{ m: 2 }}
              inputRef={companyNameInputRef}
              defaultValue={user.userMeta?.companyName}
            />
            <TextField
              id="standard-basic"
              label="Website Link"
              variant="standard"
              sx={{ m: 2 }}
              inputRef={websiteLinkInputRef}
              defaultValue={user.userMeta?.websiteLink}
            />
          </Box>
          <Box component="div" sx={{ my: 4 }}>
            <Divider>
              <Box component="h4">Website</Box>
            </Divider>
            <Box
              component="div"
              className="flex flex-wrap justify-around items-center"
            >
              <TextField
                id="outlined-basic"
                label="Add website name"
                variant="outlined"
                inputRef={ws_webSiteNameInputRef}
                defaultValue={user.userMeta?.ws_webSiteName}
              />
              {ws_appCategory && (
                <FormControl sx={{ my: 2 }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Category
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={ws_appCategory}
                    onChange={handleAppCategoryChange}
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
              )}
            </Box>
          </Box>
          <Box component="div" sx={{ my: 4 }}>
            <Divider>
              <Box component="h4">Media Buying</Box>
            </Divider>
            <Box component="div" className="flex flex-wrap justify-around">
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                sx={{ m: 1 }}
                inputRef={mb_searchInputRef}
                defaultValue={user.userMeta?.mb_search}
              />
              <TextField
                id="outlined-basic"
                label="Social"
                variant="outlined"
                sx={{ m: 1 }}
                inputRef={mb_socialInputRef}
                defaultValue={user.userMeta?.mb_social}
              />
              <TextField
                id="outlined-basic"
                label="Native"
                variant="outlined"
                sx={{ m: 1 }}
                inputRef={mb_nativeInputRef}
                defaultValue={user.userMeta?.mb_native}
              />
              <TextField
                id="outlined-basic"
                label="Display"
                variant="outlined"
                sx={{ m: 1 }}
                inputRef={mb_displayInputRef}
                defaultValue={user.userMeta?.mb_display}
              />
              <TextField
                id="outlined-basic"
                label="Video"
                variant="outlined"
                sx={{ m: 1 }}
                inputRef={mb_videoInputRef}
                defaultValue={user.userMeta?.mb_video}
              />
              <TextField
                id="outlined-basic"
                label="Others"
                variant="outlined"
                sx={{ m: 1 }}
                inputRef={mb_othersInputRef}
                defaultValue={user.userMeta?.mb_others}
              />
            </Box>
          </Box>
          <Box component="div" sx={{ my: 4 }}>
            <Divider>
              <Box component="h4">Social</Box>
            </Divider>
            <Box component="div" className="flex flex-wrap justify-around">
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
                defaultValue={user.userMeta?.sm_facebook}
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
                defaultValue={user.userMeta?.sm_twitter}
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
                defaultValue={user.userMeta?.sm_instagram}
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
                defaultValue={user.userMeta?.sm_pinterest}
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
                defaultValue={user.userMeta?.sm_youtube}
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
                defaultValue={user.userMeta?.sm_linkedin}
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
                defaultValue={user.userMeta?.sm_whatsapp}
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
                defaultValue={user.userMeta?.sm_telegram}
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
                defaultValue={user.userMeta?.sm_snapchat}
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
                defaultValue={user.userMeta?.sm_tiktok}
              />
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default EditUser;
