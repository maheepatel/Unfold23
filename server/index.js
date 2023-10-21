import express from 'express';
import pinataSDK from '@pinata/sdk';
import multer from 'multer';
import { Readable } from 'stream';
import cors from 'cors';

const storage = multer.memoryStorage()
const upload = multer({ dest: 'uploads/', storage })

const pinata = new pinataSDK({
  pinataApiKey: 'e048e64fa7ca7892411f',
  pinataSecretApiKey: "0994ffc6d88fe937f2d1003f730ea6c5a8c60ffbe8d8c120aff1148ee35534d1",
  // pinataJWTKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ZDIzZDU1Mi00ZmNmLTQxY2UtYjM4MS1mMjRkNmNkYmNlZmYiLCJlbWFpbCI6ImtydGluc2hldC5kZXZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImUwNDhlNjRmYTdjYTc4OTI0MTFmIiwic2NvcGVkS2V5U2VjcmV0IjoiMDk5NGZmYzZkODhmZTkzN2YyZDEwMDNmNzMwZWE2YzVhOGM2MGZmYmU4ZDhjMTIwYWZmMTE0OGVlMzU1MzRkMSIsImlhdCI6MTY5MDUxNzE2NH0.Oqh4u58jv9f1X0EyivdAq3DeHecYw-q0s3KoSgq246E",
})


const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', // allow to server to accept request from different origin
  "Access-Control-Allow-Origin": "*", // allow to server to accept request from different origin
}));
app.use(express.urlencoded({ extended: true }));
app.use(upload.array("files", 20));
app.post('/ipfs/pin', async (req, res) => {
  const files = req.files;

  const ipfs_cids = [];
  let ipfs_promises = [];

  for (let f of files) {
    const stream = Readable.from(f.buffer);
    ipfs_promises.push(pinata.pinFileToIPFS(stream, {
      pinataMetadata: {
        name: f.originalname
      }
    }));
  }

  const ipfs_results = await Promise.all(ipfs_promises);

  for (let i = 0; i < ipfs_results.length; i++) {
    ipfs_cids.push({
      [files[i].originalname]: ipfs_results[i].IpfsHash
    })
  }
  console.log(`${ipfs_cids.length} file/s pinned to IPFS`);
  res.send(ipfs_cids);

});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});