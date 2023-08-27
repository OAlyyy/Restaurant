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

const priceData = {

  extras: [
    { name: "Ketchub", price: 1 },
    { name: "Mayonnaise", price: 1 },
    { name: "Chilli", price: 1 },
  ],

  sizes: [
 { name: "Small", price: 0 },
    { name: "Medium", price: 3 },
    { name: "Large", price: 5 },
  ]
    
  
};


const ExtrasDialog = ({ open, onClose, onExtrasSelected }) => {

  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const handleExtrasChange = (event) => {
    const { name, checked } = event.target;
    const extra = priceData.extras.find((item) => item.name === name);
    const selectedExtra = extra ? { name: extra.name, price: extra.price } : null;
  
    if (checked) {
      setSelectedExtras((prevSelectedExtras) => [...prevSelectedExtras, selectedExtra]);
    } else {
      setSelectedExtras((prevSelectedExtras) =>
        prevSelectedExtras.filter((selectedExtra) => selectedExtra.name !== name)
      );
    }
  };

  const handleSizeChange = (event) => {
    const { name, value } = event.target;
    const selectedSize = { name, price: parseFloat(value) };
    setSelectedSize([selectedSize]); 
  };

  const handleSave = () => {
    const totalExtrasPrice =
    selectedExtras.reduce((acc, extra) => acc + extra.price, 0) +
    selectedSize.reduce((acc, size) => acc + size.price, 0);
    
    const selectedData = {
      extras: selectedExtras,
      size: selectedSize,
      totalExtrasPrice: totalExtrasPrice,
  };

    console.log("selectedExtras:", selectedExtras);
    console.log("selectedSize:", selectedSize);
    console.log("totalExtrasPrice:", selectedData.totalExtrasPrice);
    console.log("selectedData",selectedData)

    
    onExtrasSelected(selectedData);
    setSelectedExtras([]); // Empty the selectedExtras
    setSelectedSize(""); // Clear the selectedSize
  };

  const handleCancel = () => {
    setSelectedExtras([]); // Reset selectedExtras when Cancel is clicked
    onClose();
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

            {priceData.sizes.map((size) => (
        <FormControlLabel
        key={size.name}
        control={
          <Checkbox
          checked={selectedSize[0]?.name === size.name}
          onChange={handleSizeChange}
          name={size.name}
          value={size.price}
        />
      }
        label={
              <Typography style={{ color: "black" }}>
                {size.name} (+${size.price})
              </Typography>
           
          }
          
        />
      ))}

            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography >Extras</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>


             {priceData.extras.map((extra) => (
  <FormControlLabel
    key={extra.name}
    control={<Checkbox />}
    label={
      <Typography style={{ color: "black" }}>
        {extra.name} (+${extra.price})
      </Typography>
    }
    name={extra.name}
    onChange={handleExtrasChange}
  />
))}


            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Add to Cart</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtrasDialog;
