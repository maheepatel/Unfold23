import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from '@mui/material'
import Header from 'src/Components/Header';
import { useNavigate } from "react-router-dom";

const VerifyCertificateHome: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [contractAddr, setContractAddr] = useState<string>();


  const handleGo = () => {
    navigate(`/verify-certificate/${contractAddr}`);
  }

  return (
    <Box>
      <Header title="Verify Certificate" />
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography variant="h2" sx={{ mb: 2, mt: 5 }}>Verify Certificates</Typography>
        <Typography variant="body1" mb={2}>
          Enter the address of your contract to proceed further
        </Typography>
        <Box width={"max-content"} display={"flex"} flexDirection={"column"}>
          <TextField
            label="Contract Address"
            value={contractAddr}
            onChange={(e) => setContractAddr(e.target.value)}
            sx={{ minWidth: "450px", mr: 2 }}
            onKeyUpCapture={(e) => {
              if (e.key === "Enter") {
                handleGo();
              }
            }}
          />
        </Box>
        <Box mt={2} display={'flex'} justifyContent={'space-around'}>
          <Button variant="contained" onClick={() => handleGo()} disabled={!contractAddr} >
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default VerifyCertificateHome;