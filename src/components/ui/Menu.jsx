import { Button, Menu as MuiMenu, Stack, MenuItem } from "@mui/material";
const Menu = ({
  handleClick,
  handleClose,
  open,
  anchorEl,
  onEdit,
  onDelete,
  buttonProps,
}) => {
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        {...buttonProps}
      >
        Menu
      </Button>
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Stack spacing={1} sx={{ p: 2 }}>
          <MenuItem
            onClick={onEdit}
            sx={{
              bgcolor: "#ededed",
              borderRadius: 1,
              paddingY: "1rem",
              paddingRight: 4,
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            sx={{
              bgcolor: "#ededed",
              borderRadius: 1,
              paddingY: "1rem",
              paddingRight: 4,
            }}
            onClick={onDelete}
          >
            Delete
          </MenuItem>
        </Stack>
      </MuiMenu>
    </>
  );
};
export default Menu;
