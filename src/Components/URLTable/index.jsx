import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import "./urlList.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { UserState } from "../../context";
import DeleteURL from "./DeleteURL";

const rowsPerPage = 10;

const URLTable = () => {
  const { storage } = UserState();
  const [copy, setCopy] = useState("");
  const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowPerPage] = useState(10);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  if (storage.length === 0) return;

  return (
    <>
      <TableContainer className="table-wrapper">
        <Table className="fl-table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Short Url</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? storage.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : storage
            ).map((item, i) => (
              <TableRow key={page * rowsPerPage + i}>
                <TableCell width="5%">{page * rowsPerPage + i + 1}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: { sm: "40px", md: "80px" },
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  <Link href={`http://${item.full}`}>{item.full}</Link>
                </TableCell>
                <TableCell width="30%" sx={{ textAlign: "right" }}>
                  <span style={{ verticalAlign: "inherit" }}>
                    localhost:4000/{item.short}
                  </span>

                  <Tooltip
                    title={copy || "Copy Link"}
                    placement="right-end"
                    enterDelay={200}
                    leaveDelay={200}
                    arrow
                  >
                    <Button
                      variant="text"
                      color="inherit"
                      sx={{
                        minWidth: 0,
                        color: "grey",
                        "&:hover": { color: "inherit" },
                      }}
                      disableElevation
                      onClick={(e) => {
                        navigator.clipboard.writeText(
                          `localhost:4000/${item.short}`
                        );
                        setCopy("Copied ✓");
                        setTimeout(() => setCopy(""), 500);
                      }}
                    >
                      <ContentCopyIcon
                        sx={{
                          fontSize: "14px",
                          marginLeft: "10px",
                          cursor: "pointer",
                          "&:hover": { color: "blue" },
                        }}
                      />
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell width="8%">{item.clicks}</TableCell>
                <TableCell width="10%">
                  <span style={{ verticalAlign: "inherit" }}>
                    {new Date(item.lastClicked).toLocaleDateString()}
                  </span>
                  <DeleteURL short={item.short} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={3}
                count={storage.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default URLTable;
