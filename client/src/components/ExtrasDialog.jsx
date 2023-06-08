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
import FormGroup from "@mui/material/FormGroup";

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
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedExtras, setSelectedExtras] = useState([]);

  const handleExtrasChange = (event) => {
    const extra = event.target.name;
    if (event.target.checked) {
      setSelectedExtras((prevSelectedExtras) => [...prevSelectedExtras, extra]);
    } else {
      setSelectedExtras((prevSelectedExtras) =>
        prevSelectedExtras.filter((selectedExtra) => selectedExtra !== extra)
      );
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleSave = () => {
    const selectedData = {
      extras: selectedExtras,
      size: selectedSize,
    };
    console.log("selectedData",selectedData)
    onExtrasSelected(selectedData);
    setSelectedExtras([]); // Empty the selectedExtras
    setSelectedSize(""); // Clear the selectedSize
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Extras</DialogTitle>
      <DialogContent>
        <Accordion defaultExpanded>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Sizes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSize === "small"}
                    onChange={handleSizeChange}
                    value="small"
                  />
                }
                label={
                  <Typography style={{ color: "black" }}>Small</Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSize === "medium"}
                    onChange={handleSizeChange}
                    value="medium"
                  />
                }
                label={
                  <Typography style={{ color: "black" }}>Medium</Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSize === "large"}
                    onChange={handleSizeChange}
                    value="large"
                  />
                }
                label={
                  <Typography style={{ color: "black" }}>Large</Typography>
                }
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography >Extras</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography style={{ color: "black" }}>Ketchub</Typography>
                }
                name="Extra 1"
                onChange={handleExtrasChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography style={{ color: "black" }}>Mayonnaise</Typography>
                }
                name="Extra 2"
                onChange={handleExtrasChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography style={{ color: "black" }}>Chilli</Typography>
                }
                name="Extra 3"
                onChange={handleExtrasChange}
              />
            </FormGroup>
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
