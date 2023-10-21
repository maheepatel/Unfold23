import React, { useCallback, useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormLabel, Grid, Stack, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useContractWrite } from "wagmi";
import CertificateJson from "../../../public/Certificate.json";
import { Upload } from "src/Components/upload";
import usePinIpfs from "src/hooks/usePinIpfs";
import { useParams } from "react-router-dom";

const SingeType: React.FC<{}> = () => {
  const { certificateId, issueType } = useParams<{
    certificateId: string;
    issueType: string;
  }>();

  const {
    write,
    data,
    isLoading: isContractLoading,
    isSuccess: isContractSuccess,
  } = useContractWrite({
    address: certificateId as any,
    abi: CertificateJson.abi,
    functionName: "issueCertificate",
  });

  const { CIDs, pinFileToIPFS, isError, isLoading, isSuccess } = usePinIpfs();

  const [file, setFile] = useState<File | string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);

  const handleIssueCertificate = async () => {
    if (file && address) {
      pinFileToIPFS(file as File);
    }
  };

  useEffect(() => {
    if (CIDs[0] && CIDs[0][(file as File).name]) {
      write({
        args: [address, CIDs[0][(file as File).name]],
      });
    }
  }, [CIDs]);

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("File pinned to IPFS", { variant: "success" });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isContractSuccess) {
      enqueueSnackbar("Certificate Successfully Uploaded", {
        variant: "success",
      });
    }
  }, [isContractSuccess]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Error pinning file to IPFS", { variant: "error" });
    }
  }, [isError]);

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={5} mt={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <TextField
                name="Address"
                fullWidth
                label="To Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Box>
                <FormLabel htmlFor="content-id">Content ID</FormLabel>
                <TextField
                  name="Content ID"
                  id="content-id"
                  fullWidth
                  disabled
                  // label="Content ID"
                  // defaultValue={CIDs[0] && CIDs[0][(file as File).name]}
                  value={CIDs[0] && CIDs[0][(file as File).name]}
                />
              </Box>
              {/* <Box>
                <FormLabel htmlFor="content-id">Transaction Hash</FormLabel>
                <TextField
                  name="Transaction Hash"
                  id="transaction-hash"
                  fullWidth
                  disabled
                  // label="Content ID"
                  // defaultValue={CIDs[0] && CIDs[0][(file as File).name]}
                  // value={}
                />
              </Box> */}
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Upload
              sx={{ height: 200, width: 400 }}
              file={file}
              onDelete={() => setFile(null)}
              onDrop={handleDropSingleFile}
            />
          </Grid>
        </Grid>
        <Box>
          <LoadingButton
            variant="contained"
            onClick={handleIssueCertificate}
            loading={isLoading}
            disabled={!file || !address || isLoading}
          >
            Issue Certificate
          </LoadingButton>
        </Box>
      </Stack>
    </>
  );
};

export default SingeType;
