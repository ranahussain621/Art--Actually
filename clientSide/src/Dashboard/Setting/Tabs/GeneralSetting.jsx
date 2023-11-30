import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const GeneralSetting = () => {
  return (
    <Box>
      <Box sx={{ mt: "20px" }}>
        <Typography sx={{ fontSize: "22px" }} variant="h4">
          General Settings
        </Typography>
        <Typography sx={{ width: "600px", mt: "5px" }}>
          You can configure your general site settings and store options for
          vendor from this settings menu. AA offers most flexibility when it
          comes to setting up your Gallery with your custom choices.
        </Typography>
      </Box>

      <Box sx={{ mt: "45px" }}>
        <Typography sx={{ fontSize: "22px" }} variant="h4">
          Site Options
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          Configure your site settings and control access to your site. Learn
          More
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
              Disable Thankyou Note
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: "300" }}>
              Disable Thankyou wizard for those members who donate for Artworks.
            </Typography>
          </Box>
          <Box>
            <Switch defaultChecked />
          </Box>
        </Box>

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
              Data clear
            </Typography>
            <Typography
              sx={{ fontSize: "13px", fontWeight: "300", color: "#FF0000" }}
            >
              Delete all data and tables related to Artwork.
            </Typography>
            <Typography
              component={Link}
              to="/"
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#033AA3",
                textDecoration: "none",
              }}
            >
              Learn more.
            </Typography>
          </Box>
          <Box>
            <Switch defaultChecked />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              Member Artswork URL
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: "300" }}>
              Define member artswork name in URL
            </Typography>
            <Typography
              sx={{ fontSize: "13px", fontWeight: "300", color: "#033AA3" }}
            >
         art work
            </Typography>
          </Box>
          <Box>
            <Switch defaultChecked />
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: "20px" }}>
        <Typography sx={{ fontSize: "22px" }} variant="h4">
          Members Gallery Options
        </Typography>
        <Typography sx={{ mt: "5px" }}>
          Configure members settings and setup your store policy users. Learn
          More
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
              Store terms and conditions
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: "300" }}>
              Enable terms and conditions for vendor store
            </Typography>
          </Box>
          <Box>
            <Switch defaultChecked />
          </Box>
        </Box>

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
              Enable terms and conditions
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: "300" }}>
              Enable terms and conditions check on registration
            </Typography>
          </Box>
          <Box>
            <Switch defaultChecked />
          </Box>
        </Box>

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
              Enable single seller mode
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: "300" }}>
              Enable single seller mode
            </Typography>
            <Typography
              sx={{ fontSize: "13px", fontWeight: "300", color: "#033AA3" }}
            >
              Learn more.
            </Typography>
          </Box>
          <Box>
            <Switch defaultChecked />
          </Box>
        </Box>

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
              App Artwork per page
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "300",
                width: {
                  xs: "100%",
                  lg: "450px",
                },
              }}
            >
              Set how many Arts to display per page on the member store page. It
              will affect only if the member isn't set this value on their
              member setting page
            </Typography>
          </Box>
          <Box>
            <input type="text" placeholder="12" className="form-control" />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              Category
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "300",
              }}
            >
              Choose your store category provided for members
            </Typography>
          </Box>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={10}>Multiple</MenuItem>
                <MenuItem value={20}>Multiple</MenuItem>
                <MenuItem value={30}>Multiple</MenuItem>
              </Select>
            </FormControl>
          </Box>
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

export default GeneralSetting;
