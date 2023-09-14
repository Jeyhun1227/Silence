import { useState } from "react";
import { Card, Divider, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { formatToNow, formateDateTime } from "utils/date-formatter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuPopover from "components/menu-popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useToggle from "hooks/useToggle";
import ConfirmDialog from "components/confirm-dialog/ConfirmDialog";
import { useUser } from "feature/auth/context";
import roles from "constants/roles";
import { useDeleteLiveStreams } from "../hooks/use-live-streams";
import Button from "components/Button";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import Comments from "../comments";
import isPast from "date-fns/isPast";

const Item = ({ data }) => {
  const { id, title, description, dateTime, link } = data;
  const [openPopover, setOpenPopover] = useState(null);
  const [showConfirmDelete, toggleConfirmDelete] = useToggle(false);

  const { enqueueSnackbar } = useSnackbar();

  const user = useUser();
  const isAdmin = user?.role === roles.ADMIN;
  const isCommentingDisabled = isPast(new Date(dateTime));

  const handleOpenPopover = (event) => setOpenPopover(event.currentTarget);
  const handleClosePopover = () => setOpenPopover(null);
  const deleteMutation = useDeleteLiveStreams(id);

  const handleConfirmDelete = () => {
    deleteMutation.mutate(null, { onSuccess: () => toggleConfirmDelete() });
  };

  const handleCopy = () => {
    enqueueSnackbar("Link copied", { variant: "success" });
    copy(link);
  };

  return (
    <Card sx={{ p: { xs: 2, md: 3 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        {isAdmin && (
          <IconButton onClick={handleOpenPopover}>
            <MoreVertIcon />
          </IconButton>
        )}
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      <Stack direction="row" spacing={0.5} alignItems="center" my={2}>
        <AccessTimeIcon fontSize="small" variant="body2" fontWeight="semibold" />
        <Typography>{formateDateTime(new Date(dateTime))}</Typography>
        <Typography color={isPast(new Date(dateTime)) ? "error.main" : "success.main"} pl={1} fontWeight={500}>
          {formatToNow(dateTime)}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="soft" href={link} target="_blank">
          View
        </Button>
        <Button variant="text" onClick={handleCopy}>
          Copy link
        </Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Comments liveStreamId={id} isCommentingDisabled={isCommentingDisabled} />

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-bottom" sx={{ width: 140 }}>
        <MenuItem
          onClick={() => {
            handleClosePopover();
            toggleConfirmDelete();
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={showConfirmDelete}
        title="Delete Live stream"
        content="Are you sure want to delete this live stream?"
        action={
          <Button variant="contained" onClick={handleConfirmDelete} loading={deleteMutation.isLoading}>
            Confirm
          </Button>
        }
        onClose={toggleConfirmDelete}
      />
    </Card>
  );
};

export default Item;
