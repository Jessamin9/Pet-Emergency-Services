import React, { useState } from "react";
import useAxios from "axios-hooks";
import { usePosition } from "use-position"; // https://github.com/trekhleb/use-position
import { Button, Grid } from "@material-ui/core";

import "./app.css";
import Navigation from "./Navigation";
import Location from "./Location";

const App = () => {
  const { latitude, longitude } = usePosition();
  const [locationType, setLocationType] = useState();
  const [{ data }, getLocations] = useAxios(
    `/.netlify/functions/get${locationType}?lat=${latitude}&lon=${longitude}`,
    { manual: true }
  );
  const locations = (data && (data.clinics || data.shelters)) || [];
  const goToApp = type => () => {
    setLocationType(type);
    getLocations();
  };

  return locationType ? (
    <div>
      <Navigation reloadShelters={getLocations} />

      <Grid container spacing={1}>
        {locations.map(location => (
          <Location
            name={location.name}
            address={location.address}
            phone={location.phone}
            key={location.id}
          />
        ))}
      </Grid>
    </div>
  ) : (
    <div class="container">
      <h1 class="title">&#128062;Pet Emergency Services of the Bay&#128062;</h1>
      <p>
        Pets are a part of the family. That's why
        <strong>Pet Emergency Services of the Bay</strong>
        is here to help you locate the nearest emergency pet hospitals,
        veterinarians, and shelters. &#128058;
      </p>
      <Button onClick={goToApp("Shelters")}> Shelters 🏡</Button>
      <Button onClick={goToApp("Clinics")}>
        Emergency Clinics/Veterinarians 🏥
      </Button>
    </div>
  );
};

export default App;
