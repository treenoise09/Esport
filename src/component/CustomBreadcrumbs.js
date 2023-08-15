import * as React from "react"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import PropTypes from "prop-types"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { Grid, Typography } from "@mui/material"


// ...
const CustomBreadcrumbs = ({ pages }) => {
  return (
    <Grid container spacing={0} py={0} px={0}>
      <Grid item md={12} xs={12}>

      <Breadcrumbs
          aria-label=""
          style={{
            background: "linear-gradient(45deg, #4a1a1c,#0f1849)", 
            padding: "10px",
            borderRadius: "5px", 
          }}
        >
          {pages?.map((page, index) =>
            page.path ? (
              <Link
                key={index}
                to={page.path}
                component={RouterLink}
                style={{ color: "#FFFAFA" }}
              >
                {page.title}
              </Link>
            ) : (
              <Typography key={index} style={{ color: "#FFFAFA" }}>
                {page.title}
              </Typography>
            )
          )}

        </Breadcrumbs>

      </Grid>
    </Grid>
  )
}
// ...

CustomBreadcrumbs.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
}
CustomBreadcrumbs.defaultProps = {
  pages: [],
}
export default CustomBreadcrumbs
