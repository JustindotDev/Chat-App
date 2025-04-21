import { Box, Skeleton, Avatar } from "@mui/material";

const MessageSkeleton = ({ side = "left" }) => {
  const isRight = side === "right";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isRight ? "flex-end" : "flex-start",
        px: 2,
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isRight ? "row-reverse" : "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Skeleton variant="circular">
          <Avatar sx={{ width: 32, height: 32 }} />
        </Skeleton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: isRight ? "flex-end" : "flex-start",
          }}
        >
          <Skeleton
            variant="rounded"
            width="5rem"
            height=".4rem"
            sx={{ mb: 0.5, borderRadius: "12px" }}
          />
          <Skeleton
            variant="rounded"
            width="4rem"
            height=".4rem"
            sx={{ borderRadius: "12px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MessageSkeleton;
