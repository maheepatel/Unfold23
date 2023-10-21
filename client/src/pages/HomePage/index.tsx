import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "self-start",
          height: "100vh",
        }}
      >
        <Box sx={{ mb: 16 }}>
          <Typography variant="h2" component="div" gutterBottom>
            Welcome to Certify
          </Typography>
          <Typography variant="subtitle2" component="div" gutterBottom>
            Certify is a decentralized platform for issuing certificates. It is
            built on top of Ethereum Blockchain. It is a platform where
            institutions can issue certificates to applicants and Applicants and
            3rd party members can verify their certificates.
          </Typography>
          <Typography variant="h6" component="code">
            Click on the button below to get started
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link to={"/new-contract"} style={{ textDecoration: "none" }}>
            <Card
              sx={{
                maxWidth: 345,
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Deploy a new Contract
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Deploy a new Contract as institution for issuing
                    certificates
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>

          <Link to={"/issue-certificate"} style={{ textDecoration: "none" }}>
            <Card
              sx={{
                maxWidth: 345,
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Issue Certificate
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Institution can Issue a certificate to any applicant
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>

          <Link to={"/verify-certificate"} style={{ textDecoration: "none" }}>
            <Card
              sx={{
                maxWidth: 345,
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Verify Certificate
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Verify an issued certificate to an applicant by the
                    institution
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Box>
      </Container>
    </motion.div>
  );
};

export default HomePage;
