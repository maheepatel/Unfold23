import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "../../Components/Header";
import { useContractRead } from "wagmi";

import BatchType from "./BatchIssue";
import SingleType from "./SingleIssue";

import CertificateJson from './../../../public/Certificate.json';
import { enqueueSnackbar } from "notistack";



const Certificate: React.FC<{}> = () => {
  const { certificateId, issueType } = useParams<{
    certificateId: string;
    issueType: string;
  }>();
  const { data: contractName, isError, } = useContractRead({
    address: certificateId as any,
    abi: CertificateJson.abi,
    functionName: "name"
  })


  if (!contractName || isError) {
    enqueueSnackbar("Invalid Certificate ID", { variant: "error" });
    return <Navigate to={"/issue-certificate"} />
  };


  return (
    <Box>
      <Header title="Issue Certificate" />
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>Issue Certificates</Typography>
        <Typography gutterBottom>
          Contract name:{'  '}
          <span style={{ fontWeight: "bold" }}>
            {contractName?.toString()}
          </span>
        </Typography>
        {issueType === "single" ? <SingleType /> : <BatchType />}
      </Container>
    </Box>
  );
}

export default Certificate;

