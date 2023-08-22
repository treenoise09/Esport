import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Breadcrumbs from "../component/CustomBreadcrumbs";

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Breadcrumbs
        pages={[
          { title: "Home", path: "/" },
          { title: "Sign in", path: "/signin" },
          { title: "Sign up", path: "/signup" },
          { title: "Tournament", path: "/Tournament" },
          { title: "TournamentList", path: "/TournamentList" },
        ]}
      />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 15,
            pb: 10,
            width: "100%",
            height: "100%",
          }}
        >
          <Container fixed>
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                marginTop: "5rem", // กำหนดระยะห่างด้านบน
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF8C00",
                  color: "#000000",
                  m: 1,
                  px: 7,
                  py: 2,
                  borderRadius: "10px",
                  fontSize: "40px",
                  "&:hover": {
                    bgcolor: "#B22222",
                  },
                }}
              >
                สร้างรายการแข่งขัน
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF8C00",
                  color: "#000000",
                  m: 1,
                  px: 10.5,
                  py: 2,
                  borderRadius: "10px",
                  fontSize: "40px",
                  "&:hover": {
                    bgcolor: "#B22222",
                  },
                }}
              >
                สมัครการแข่งขัน
              </Button>
            </Box>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
