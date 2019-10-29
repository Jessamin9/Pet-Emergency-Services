import React from "react";
import { Button, Checkbox, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  checkbox: {
    marginRight: 16
  },
  container: {
    height: 100,
    padding: 50,
  },
  flex: {
    display: "flex",
    alignItems: "center"
  }
});

// Cooling Center

const Location = ({ name, phone, address }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.container}>
        <div className={classes.flex}>
          
          <div>
            <Typography variant="h6">{name}</Typography>
            <Typography>{address}</Typography>
            <Typography>{phone}</Typography>
          </div>
        <Button target="_blank" href={`http://maps.google.com/?q=${address}`}>Directions</Button>
        <Button href={`tel:${phone}`}>Call</Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default Location;
