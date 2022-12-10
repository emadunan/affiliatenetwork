import { Avatar, Box, Divider } from "@mui/material";
import { FC } from "react";

const User: FC = () => {
  return (
    <div>
      <div>
        <Divider>
          <Avatar sx={{ width: 99, height: 99 }}
            alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Divider>
        <Box component="h3" className="underline">Basic Information</Box>
        <Box component="div" className="flex flex-wrap">
          <p className="mx-4 my-2">E-Mail: emadunan@gmail.com</p>
          <p className="mx-4 my-2">First Name: Emad</p>
          <p className="mx-4 my-2">Last Name: Younan</p>
          <p className="mx-4 my-2">country: Egypt</p>
          <p className="mx-4 my-2">City: Cairo</p>
          <p className="mx-4 my-2">phoneNumber: +201003379933</p>
          <p className="mx-4 my-2">whatsNumber: +201003379933</p>
          <p className="mx-4 my-2">companyName: Complex Development</p>
          <p className="mx-4 my-2">websiteLink: https://emadunan.com</p>
        </Box>
      </div>
    </div>
  );
}

export default User;