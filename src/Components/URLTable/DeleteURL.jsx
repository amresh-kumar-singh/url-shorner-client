import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { PrivateInstance } from "../../axios/axiosInstance";
import { UserState } from "../../context";

const DeleteURL = ({ short }) => {
  const { setStorage } = UserState();
  const [deleted, setDeleted] = useState("");
  const handleDelete = async () => {
    console.log("delete", short);
    const response = await PrivateInstance.delete(`/${short}`);
    if (response.status === 204) {
      setStorage((prev) => prev.filter((urlObj) => urlObj.short !== short));
      setDeleted("Deleted");
    }
  };
  return (
    <Tooltip
      title={deleted || "Delete"}
      placement="top"
      arrow
      enterDelay={300}
      leaveDelay={200}
    >
      <Button
        size="small"
        sx={{ minWidth: "0px", color: "gray", "&:hover": { color: "blue" } }}
        onClick={handleDelete}
      >
        <DeleteOutlineIcon fontSize="small" />
      </Button>
    </Tooltip>
  );
};

export default DeleteURL;
