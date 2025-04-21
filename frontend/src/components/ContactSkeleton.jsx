import { Box, Skeleton, Avatar, Typography } from "@mui/material";

const ContactSkeleton = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ margin: 1 }}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </Box>
  );
};

export default ContactSkeleton;
