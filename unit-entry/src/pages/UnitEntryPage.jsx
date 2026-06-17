import { useState } from "react";
import { unitOptions } from "../data/unitOptions";

import Autocomplete from "@mui/material/Autocomplete";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function UnitEntryPage() {
  const [unitCode, setUnitCode] = useState("");
  const [unitName, setUnitName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState("Active");

  const [units, setUnits] = useState([
    {
      id: 1,
      unitCode: "KG",
      unitName: "Kilogram",
      description: "Weight Unit",
      status: "Active",
      createdDate: "06/15/2026",
    },
    {
      id: 2,
      unitCode: "PCS",
      unitName: "Pieces",
      description: "Count Unit",
      status: "Inactive",
      createdDate: "06/15/2026",
    },
  ]);

  const handleSave = () => {
    if (!unitCode || !unitName) {
      alert("Unit Code and Unit Name are required");
      return;
    }

    if (editId) {
      setUnits(
        units.map((unit) =>
          unit.id === editId
            ? {
                ...unit,
                unitCode,
                unitName,
                description,
                status,
              }
            : unit
        )
      );

      setEditId(null);
    } else {
      const newUnit = {
        id: Date.now(),
        unitCode,
        unitName,
        description,
        status,
        createdDate: new Date().toLocaleDateString(),
      };

      setUnits([...units, newUnit]);
    }

    setUnitCode("");
    setUnitName("");
    setDescription("");
    setStatus("Active");
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this unit?"
      )
    ) {
      setUnits(
        units.filter((unit) => unit.id !== id)
      );
    }
  };

  const handleEdit = (unit) => {
    setUnitCode(unit.unitCode);
    setUnitName(unit.unitName);
    setDescription(unit.description);
    setStatus(unit.status);
    setEditId(unit.id);
  };

  return (
    <Box sx={{ p: 3 }}>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Unit Information
        </Typography>

        <Autocomplete
          freeSolo
          options={unitOptions.map(
            (u) => u.code
          )}
          value={unitCode}
          onInputChange={(
            event,
            newValue
          ) => {
            const code =
              newValue.toUpperCase();

            setUnitCode(code);

            const selected =
              unitOptions.find(
                (u) =>
                  u.code === code
              );

            if (selected) {
              setUnitName(
                selected.name
              );
              setDescription(
                selected.description
              );
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Unit Code"
              margin="normal"
              fullWidth
            />
          )}
        />

        <Autocomplete
          freeSolo
          options={unitOptions.map(
            (u) => u.name
          )}
          value={unitName}
          onInputChange={(
            event,
            newValue
          ) => {
            setUnitName(newValue);

            const selected =
              unitOptions.find(
                (u) =>
                  u.name ===
                  newValue
              );

            if (selected) {
              setUnitCode(
                selected.code
              );
              setDescription(
                selected.description
              );
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Unit Name"
              margin="normal"
              fullWidth
            />
          )}
        />

        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          margin="normal"
        />

        <TextField
          select
          fullWidth
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          margin="normal"
        >
          <MenuItem value="Active">
            Active
          </MenuItem>

          <MenuItem value="Inactive">
            Inactive
          </MenuItem>
        </TextField>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
          >
            {editId
              ? "Update"
              : "Save"}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setUnitCode("");
              setUnitName("");
              setDescription("");
              setStatus("Active");
              setEditId(null);
            }}
          >
            Reset
          </Button>
        </Box>
      </Paper>

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={1}
      >
        Unit Master List
      </Typography>

      <Typography
        fontWeight="bold"
        mb={2}
      >
        Total Units: {units.length}
      </Typography>

      <TextField
        fullWidth
        label="Search Unit Name"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        sx={{ mb: 3 }}
      />

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Sl No",
                "Unit Code",
                "Unit Name",
                "Description",
                "Status",
                "Created Date",
                "Action",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    color: "white",
                    fontWeight:
                      "bold",
                    backgroundColor:
                      "#0b1f3a",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {units
              .filter((u) =>
                u.unitName
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
              )
              .map(
                (
                  unit,
                  index
                ) => (
                  <TableRow
                    key={unit.id}
                    hover
                  >
                    <TableCell>
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      {
                        unit.unitCode
                      }
                    </TableCell>

                    <TableCell>
                      {
                        unit.unitName
                      }
                    </TableCell>

                    <TableCell>
                      {
                        unit.description
                      }
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          unit.status
                        }
                        color={
                          unit.status ===
                          "Active"
                            ? "success"
                            : "error"
                        }
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {
                        unit.createdDate
                      }
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{
                          mr: 1,
                        }}
                        onClick={() =>
                          handleEdit(
                            unit
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() =>
                          handleDelete(
                            unit.id
                          )
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
}