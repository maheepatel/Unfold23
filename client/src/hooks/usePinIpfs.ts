import { useState } from 'react';

const usePinIpfs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // set the type of CIDs as an array of objects with key-value pairs
  const [CIDs, setCIDs] = useState<Array<{ [key: string]: string }>>([]);

  const pinFileToIPFS = async (file: File | File[]) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setCIDs([]);

    const formData = new FormData();
    if (Array.isArray(file)) {
      for (let f of file) {
        formData.append('files', f);
      }
    } else {
      formData.append('files', file);
    }

    try {
      const response = await fetch('http://localhost:3000/ipfs/pin', {
        method: 'POST',
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "no-cors",
        },
      });

      const data = await response.json();

      if (data) {
        setCIDs(data);
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    isSuccess,
    CIDs,
    pinFileToIPFS,
  };

};

export default usePinIpfs;