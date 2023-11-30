import { Box, Button, Switch, Typography } from "@mui/material";
import React from "react";
import facebook from "../../../assets/images/facebook.png";
import google from "../../../assets/images/google.png";
import linkedin from "../../../assets/images/linkedin.png";
import twitter from "../../../assets/images/twitter.png";
import apple from "../../../assets/images/apple.png";

const SocialAPISettings = () => {
  const fakedata = [
    {
      icon: facebook,
      topTitle: "Connect to Facebook",
      topDes: "Configure your facebook API settings.",
      config: "Configure facebook",
      des: "You can successfully connect to your facebook account and log in from here.",
    },
    {
      icon: twitter,
      topTitle: "Connect to Twitter",
      topDes: "Configure your facebook API settings.",
      config: "Configure Twitter",
      des: "You can successfully connect to your twitter account and log in from here.",
    },
    {
      icon: linkedin,
      topTitle: "Connect to Linkedin",
      topDes: "Configure your facebook API settings.",
      config: "Configure Linkedin",
      des: "You can successfully connect to your linkedin account and log in from here.",
    },
    {
      icon: apple,
      topTitle: "Connect to Apple",
      topDes: "Configure your facebook API settings.",
      config: "Configure Apple",
      des: "You can successfully connect to your apple account and log in from here.",
    },
    {
      icon: google,
      topTitle: "Connect to Google",
      topDes: "Configure your facebook API settings.",
      config: "Configure Google",
      des: "You can successfully connect to your google account and log in from here.",
    },
  ];

  return (
    <Box>
      <Box sx={{ mt: "20px" }}>
        <Typography sx={{ fontSize: "22px" }} variant="h4">
          Social API Settings
        </Typography>
        <Typography
          sx={{
            width: {
              xs: "100%",
              lg: "400px",
            },
            mt: "5px",
          }}
        >
          You can connect your application social profile API settings from this
          API settings menu. AA offers integration with various social sites.
        </Typography>
      </Box>

      <Box
        sx={{
          border: "1px solid #B0A7A7",
          borderRadius: "8px",
          margin: "20px 0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #B0A7A7",
            padding: "20px",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              Enable social login
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "300",
                width: {
                  xs: "100%",
                  lg: "360px",
                },
              }}
            >
              Enabling this will add Social Icons under registration form to
              allow users to login or register using Social Profiles
            </Typography>
          </Box>
          <Box>
            <Switch defaultChecked />
          </Box>
        </Box>

        <Box>
          {fakedata.map((data, i) => (
            <Box
              key={i}
              sx={{
                borderBottom: "1px solid #B0A7A7",
                padding: "20px",
              }}
            >
              <Box>
                <Box>
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "500" }}
                    variant="h4"
                  >
                    {data.topTitle}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography sx={{ fontSize: "11px", fontWeight: "500" }}>
                      {data.topDes}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#033AA3",
                        fontSize: "11px",
                      }}
                    >
                      {data.config}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: "20px",
                    padding: "15px",
                    background: "#F9F8F8",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 8px -4px black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                        src={data.icon}
                        alt=""
                      />
                    </Box>
                    <Typography
                      sx={{
                        width: "250px",
                        fontSize: "12px",
                      }}
                    >
                      {data.des}
                    </Typography>
                  </Box>

                  <Box>
                    <Button
                      sx={{
                        background: "#BACED1",
                        color: "#43425D",
                        fontWeight: "500",
                        textTransform: "capitalize",
                        borderRadius: "10px",
                        "&:hover": {
                          background: "#BACED1",
                        },
                      }}
                      variant="contained"
                    >
                      Configure
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "#455A64",
            padding: "5px 20px",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "capitalize",
            "&:hover": {
              background: "#455A64",
            },
          }}
        >
          Save Change
        </Button>
      </Box>
    </Box>
  );
};

export default SocialAPISettings;
