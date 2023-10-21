import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useCallback, useState, useEffect } from "react";
import Header from "src/Components/Header";
import { isAddressEqual } from "viem";
import { useContractRead } from "wagmi";
import { Navigate, useParams } from "react-router-dom";

import CertificateJson from "./../../../public/Certificate.json";
import { enqueueSnackbar } from "notistack";
import { Upload } from "src/Components/upload";
import en from "src/locales/langs/en";
import usePinIpfs from "src/hooks/usePinIpfs";

const AddressZero = "0x0000000000000000000000000000000000000000";

const VerifyCertificate: React.FC<{}> = () => {
  const { certificateId } = useParams<{
    certificateId: string;
  }>();

  const { CIDs, pinFileToIPFS } = usePinIpfs();
  const [isCertficateValid, setIsCertificateValid] = useState<boolean>(false);
  const [cid, setCid] = useState<string>();
  const [file, setFile] = useState<File | string | null>(null);

  console.log("This is before get");

  useEffect(() => {
    console.log("Pinning successful: ", CIDs);
    if (CIDs[0] && CIDs[0][(file as File)?.name]) {
      setCid(CIDs[0][(file as File).name]);
      // console.log(CIDs);
    }

    if (cid && CIDs[0] && CIDs[0][(file as File)?.name]) {
      handleEnter();
    }
  }, [CIDs, cid]);

  const { data: contractName, isError } = useContractRead({
    address: certificateId as any,
    abi: CertificateJson.abi,
    functionName: "name",
  });

  const { data: applicantData, isError: isApplicantError } = useContractRead({
    address: certificateId as any,
    abi: CertificateJson.abi,
    functionName: "applicants",
    args: [cid],
  });


  if (!contractName || isError) {
    enqueueSnackbar("Invalid Certificate ID", { variant: "error" });
    return <Navigate to={"/verify-certificate"} />;
  }

  const handleEnter = () => {
    // console.log(applicantData);
    if (
      applicantData &&
      !isAddressEqual((applicantData as any)[0], AddressZero)
    ) {
      enqueueSnackbar("Certificate is Valid", { variant: "success" });
      setIsCertificateValid(true);
    } else {
      enqueueSnackbar("Certificate is Invalid", { variant: "error" });
    }
  };

  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      let file = Object.assign(newFile, {
        preview: URL.createObjectURL(newFile),
      });
      setFile(file);
      pinFileToIPFS(file as File);
    }
  }, []);

  
  return (
    <Box>
      <Header title="Verify Certificate" />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box mt={5}>
          <Typography gutterBottom>
            Contract name:{"  "}
            <span style={{ fontWeight: "bold" }}>
              {contractName?.toString()}
            </span>
          </Typography>

          <Grid container spacing={2} mt={4}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TextField
                  label="Content ID"
                  sx={{
                    minWidth: "450px",
                  }}
                  value={cid}
                  onChange={(e) => setCid(e.target.value)}
                  onKeyUpCapture={(e) => {
                    if (e.key === "Enter") {
                      handleEnter();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={handleEnter}
                >
                  <ChevronRightIcon />
                </Button>
              </Box>
              <Box my={3}>
                <Typography variant="h6" gutterBottom>
                  or upload certificate
                </Typography>
              </Box>
              <Upload
                sx={{ height: 200, width: 400 }}
                file={file}
                onDelete={() => {
                  setFile(null);
                  setCid("");
                }}
                onDrop={handleDropSingleFile}
              />
            </Grid>
            {/* {isCertficateValid} */}
            <Grid item xs={12} sm={6}>
              {cid && isCertficateValid && (
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <TableContainer>
                      <Table>
                        <TableRow>
                          <TableCell>Address: </TableCell>
                          <TableCell>{(applicantData as any)[0]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Ipfs Hash: </TableCell>
                          <TableCell>{(applicantData as any)[1]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>TokenId: </TableCell>
                          <TableCell>{(applicantData as any)[2]}</TableCell>
                        </TableRow>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default VerifyCertificate;
