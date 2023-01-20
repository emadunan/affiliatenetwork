import { FC } from "react";
import useSWR from "swr";
import { Avatar, Box, Button, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { UserWithMeta } from "@prisma/client/scalar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const User: FC = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data: user, error } = useSWR<UserWithMeta>(
    `/api/users/${id}`,
    fetcher
  );

  return (
    <div>
      <div>
        <Divider sx={{ mt: 4 }}>
          <Avatar
            sx={{ width: 99, height: 99 }}
            alt={user?.email || ""}
            src={user?.image as string}
          />
        </Divider>
        <Box component="div" className="flex justify-between">
          <p className="mx-4 my-2">{`E-mail: ${user?.email}`}</p>
          <Box component="div">
            <Button
              variant="outlined"
              color="info"
              startIcon={<EditIcon />}
              className="mx-1"
              onClick={() => router.push(`/users/${id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              className="mx-1"
            >
              Delete
            </Button>
          </Box>
        </Box>
        <Box component="div" className="flex flex-wrap justify-around">
          <p className="mx-4 my-2">{`First Name: ${user?.userMeta?.firstName}`}</p>
          <p className="mx-4 my-2">{`Last Name: ${user?.userMeta?.lastName}`}</p>
          <p className="mx-4 my-2">{`Country: ${user?.userMeta?.country}`}</p>
          <p className="mx-4 my-2">{`City: ${user?.userMeta?.city}`}</p>
          <p className="mx-4 my-2">{`Phone Number: ${user?.userMeta?.phoneNumber}`}</p>
          <p className="mx-4 my-2">{`Whats Number: ${user?.userMeta?.whatsNumber}`}</p>
          <p className="mx-4 my-2">{`Company Name: ${user?.userMeta?.companyName || "NOT-PROVIDED"
            }`}</p>
          <p className="mx-4 my-2">{`Website Link: ${user?.userMeta?.websiteLink || "NOT-PROVIDED"
            }`}</p>
        </Box>
        <Box component="div" sx={{ my: 4 }}>
          <Divider>
            <Box component="h4">Settings & Accessability</Box>
          </Divider>
          <Box component="div" className="flex flex-wrap justify-around">
            <p className="mx-4 my-2">{`Privilege: ${user?.userMeta?.privilege || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Max Requests: ${user?.userMeta?.reqNumber || "NOT-PROVIDED"
              }`}</p>
          </Box>
        </Box>
        <Box component="div" sx={{ my: 4 }}>
          <Divider>
            <Box component="h4">Website</Box>
          </Divider>
          <Box component="div" className="flex flex-wrap justify-around">
            <p className="mx-4 my-2">{`Website Name: ${user?.userMeta?.ws_webSiteName || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`App Category: ${user?.userMeta?.ws_appCategory || "NOT-PROVIDED"
              }`}</p>
          </Box>
        </Box>
        <Box component="div" sx={{ my: 4 }}>
          <Divider>
            <Box component="h4">Media Buying</Box>
          </Divider>
          <Box component="div" className="flex flex-wrap justify-around">
            <p className="mx-4 my-2">{`Search: ${user?.userMeta?.mb_search || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Social: ${user?.userMeta?.mb_social || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Native: ${user?.userMeta?.mb_native || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Display: ${user?.userMeta?.mb_display || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Video: ${user?.userMeta?.mb_video || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Others: ${user?.userMeta?.mb_others || "NOT-PROVIDED"
              }`}</p>
          </Box>
        </Box>
        <Box component="div" sx={{ my: 4 }}>
          <Divider>
            <Box component="h4">Social</Box>
          </Divider>
          <Box component="div" className="flex flex-wrap justify-around">
            <p className="mx-4 my-2">{`Facebook: ${user?.userMeta?.sm_facebook || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Twitter: ${user?.userMeta?.sm_twitter || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Instagram: ${user?.userMeta?.sm_instagram || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Pinterest: ${user?.userMeta?.sm_pinterest || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Youtube: ${user?.userMeta?.sm_youtube || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Linkedin: ${user?.userMeta?.sm_linkedin || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Whatsapp: ${user?.userMeta?.sm_whatsapp || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Telegram: ${user?.userMeta?.sm_telegram || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Snapchat: ${user?.userMeta?.sm_snapchat || "NOT-PROVIDED"
              }`}</p>
            <p className="mx-4 my-2">{`Tiktok: ${user?.userMeta?.sm_tiktok || "NOT-PROVIDED"
              }`}</p>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default User;
