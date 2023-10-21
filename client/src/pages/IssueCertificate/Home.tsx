import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";

const CertificateHome: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [contractAddr, setContractAddr] = useState<string>();

  const handleGo = (type: string) => {
    navigate(`/issue-certificate/${contractAddr}/${type}`);
  };

  return (
    <Box>
      <Header title="Issue Certificate" />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" sx={{ mb: 2, mt: 5 }}>
          Issue Certificates
        </Typography>
        <Typography variant="body1" mb={2}>
          Enter the address of your contract to proceed further
        </Typography>
        <Box width={"max-content"} display={"flex"} flexDirection={"column"}>
          <TextField
            label="Contract Address"
            value={contractAddr}
            onChange={(e) => setContractAddr(e.target.value)}
            sx={{ minWidth: "450px", mr: 2 }}
            // onKeyUpCapture={(e) => {
            //   if (e.key === "Enter") {
            //     handleGo();
            //   }
            // }}
          />
          <Box mt={2} display={"flex"} justifyContent={"space-around"}>
            <Button variant="contained" onClick={() => handleGo("single")}>
              Issue Certificate
            </Button>
            {/* <Button variant="contained" onClick={() => handleGo("batch")} >
              Batch Issue
            </Button> */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CertificateHome;
