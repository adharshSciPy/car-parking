import React from "react";
import { useState, useEffect } from "react";
import { Container, Box } from "@mui/system";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import parkedCar from '../../assests/parked-illustrations.png'
import axios from 'axios'





function Slot() {



  const [slot1, freeSlot1] = useState(true)
  const [slot2, freeSlot2] = useState(true)
  const [slot3, freeSlot3] = useState(true)
  const freeSlotStyle = {
    backgroundColor: 'rgba(255, 0, 0, 0.333)',
    width: '10rem',
    height: '20rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mr: '1rem'
  }

  const NotFreeSlotStyle = {
    backgroundColor: 'rgba(0, 255, 0, 0.333)',
    width: '10rem',
    height: '20rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mr: '1rem'
  }

  // dynaics slots
  const dSlots = [
    {
      slot: slot1
    },
    {
      slot: slot2
    },
    {
      slot: slot3
    },
    {
      slot: true
    },
    {
      slot: true
    }
  ]




  const SlotCheck1 = async () => {
    await axios
      .get("https://api.thingspeak.com/channels/2025615/fields/1/last.txt?api_key=7U6CJW5RNHPMOIN9")
      .then((response) => {
        const X = response.data;
        console.log(X);
        if (X > 0) {
          freeSlot1(false)      
        }
      })
      .catch((err) => {
        console.log("Slot 1 Server Responding Failed");
      });

  }
  const SlotCheck2 = async () => {
    await axios
      .get("https://api.thingspeak.com/channels/2025615/fields/2/last.txt?api_key=7U6CJW5RNHPMOIN9")
      .then((response) => {
        const X = response.data;
        console.log(X, "vannu");
        if (X > 0) {
          freeSlot2(false)

        }
      })
      .catch((err) => {
        console.log("Slot 2 Server Responding Failed");
      });
  }

  const SlotCheck3 = async () => {
    await axios
      .get("https://api.thingspeak.com/channels/2025615/fields/3/last.txt?api_key=7U6CJW5RNHPMOIN9")
      .then((response) => {
        const X = response.data;
        console.log(X);
        if (X > 0) {
          freeSlot3(false)
        
        }
      })
      .catch((err) => {
        console.log("Slot 3 Server Responding Failed");
      });

  }

  useEffect(() => {
    SlotCheck1();
    SlotCheck2();
    SlotCheck3();

  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" color="initial" sx={{ fontWeight: 600 }}>Car Parking Slots</Typography>
          </Grid>



          <Grid item xs={12}>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
              {
                dSlots.map((index) => {
                  return (
                    <Box sx={index.slot ? NotFreeSlotStyle : freeSlotStyle}>
                      {
                        index.slot ?
                          <Typography variant="subtitle1" color="initial" sx={{ fontWeight: '700', color: 'green' }}>Free Slot</Typography>
                          :

                          <Box sx={{ height: '30vh', width: '60vw', overFlow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <img src={parkedCar} alt="" style={{ height: '100%', width: '100%' }} />
                            <Typography variant="body1" color="initial">Parked</Typography>
                          </Box>
                      }
                    </Box>
                  )
                })
              }
            </Box>
          </Grid>
        </Grid>
        

      </Container>
    </>
  )
}

export default Slot;
