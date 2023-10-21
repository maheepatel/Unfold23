import pinataSDK from '@pinata/sdk';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
let pdf_path = path.normalize(__dirname + '/public/testcertificate.pdf');
let pdf = fs.createReadStream(pdf_path);


const pinata = new pinataSDK({
  pinataApiKey: 'e048e64fa7ca7892411f',
  pinataSecretApiKey: "0994ffc6d88fe937f2d1003f730ea6c5a8c60ffbe8d8c120aff1148ee35534d1",
  // pinataJWTKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ZDIzZDU1Mi00ZmNmLTQxY2UtYjM4MS1mMjRkNmNkYmNlZmYiLCJlbWFpbCI6ImtydGluc2hldC5kZXZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImUwNDhlNjRmYTdjYTc4OTI0MTFmIiwic2NvcGVkS2V5U2VjcmV0IjoiMDk5NGZmYzZkODhmZTkzN2YyZDEwMDNmNzMwZWE2YzVhOGM2MGZmYmU4ZDhjMTIwYWZmMTE0OGVlMzU1MzRkMSIsImlhdCI6MTY5MDUxNzE2NH0.Oqh4u58jv9f1X0EyivdAq3DeHecYw-q0s3KoSgq246E",

})

pinata.pinFileToIPFS(pdf, {
  pinataMetadata: {
    name: "test-certificate"
  }
}).then(result => {
  console.log(

    result.IpfsHash
  )
});