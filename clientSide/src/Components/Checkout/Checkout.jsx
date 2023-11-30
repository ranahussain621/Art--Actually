import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "../../assets/images/cardImage3.png";

const Checkout = () => {
  return (
    <Box>
      <Box
        sx={{
          padding: "20px 0px ",
          background: "#EEECEB",
        }}
      >
        <Container>
          <Typography sx={{ fontSize: "38px", color: "#709AA4" }}>
            Checkout
          </Typography>

          <Grid
            container
            alignItems="center"
            sx={{
              background: "#fff",
              borderRadius: "8px",
              border: "3px solid #9f9f9f",
              borderTop: "none",
              padding: {
                xs: "20px",
                lg: "120px 150px",
              },
              mt: "20px",
            }}
          >
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: {
                    xs: "column",
                    lg: "row",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "20px",
                      md: "40px",
                    },
                    fontWeight: "500",
                    color: "#1A1F36",
                  }}
                >
                  Pop Cat
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    color: "#fff",
                    background: "#709AA4",

                    borderRadius: "8px",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "#709AA4",
                    },
                  }}
                >
                  Add Another Art
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "30px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Box>
                    <img
                      className="img-fluid"
                      style={{
                        width: "70px",
                        height: "70px",
                      }}
                      src={Image}
                      alt=""
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#1A1F36",
                        fontSize: "20px",
                        fontWeight: "500",
                      }}
                    >
                      {" "}
                      Donation
                    </Typography>
                    <Typography sx={{ color: "#697386" }}>
                      Single Payment
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      color: "#1A1F36",
                      fontSize: "18px",
                      textDecoration:"underline"
                    }}
                  >
                    Remove
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      color: "#1A1F36",
                      fontSize: "24px",
                    }}
                  >
                    $25.00
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={5}
              sx={{
                paddingLeft: {
                  xs: "0px",
                  lg: "80px",
                },
              }}
            >
              <Box
                sx={{
                  boxShadow: "0px 0px 10px -5px #000",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: "500",
                      color: "#1A1F36",
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: "500",
                      color: "#1A1F36",
                    }}
                  >
                    $129.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      color: "#fff",
                      background: "#709AA4",
                      borderRadius: "8px",
                      textTransform: "capitalize",
                      "&:hover": {
                        background: "#709AA4",
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Checkout;
