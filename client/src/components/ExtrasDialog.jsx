import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ExtrasDialog = ({ open, onClose, onExtrasSelected }) => {
  const [selectedExtras, setSelectedExtras] = useState([]);

  const handleCheckboxChange = (event) => {
    const extra = event.target.name;
    if (event.target.checked) {
      setSelectedExtras((prevSelectedExtras) => [...prevSelectedExtras, extra]);
    } else {
      setSelectedExtras((prevSelectedExtras) =>
        prevSelectedExtras.filter((selectedExtra) => selectedExtra !== extra)
      );
    }
  };

  const handleSave = () => {
    onExtrasSelected(selectedExtras);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Extras</DialogTitle>
      <DialogContent>

        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Extra 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedExtras.includes("Extra 1")}
                  onChange={handleCheckboxChange}
                  name="Extra 1"
                />
              }
              label="Extra 1"
            />
            {/* Add additional content for Extra 1 */}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Extra 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedExtras.includes("Extra 2")}
                  onChange={handleCheckboxChange}
                  name="Extra 2"
                />
              }
              label="Extra 2"
            />
            {/* Add additional content for Extra 2 */}
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Extra 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedExtras.includes("Extra 3")}
                  onChange={handleCheckboxChange}
                  name="Extra 3"
                />
              }
              label="Extra 3"
            />
            {/* Add additional content for Extra 3 */}
          </AccordionDetails>
        </Accordion>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Add to Cart</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtrasDialog;
