import { createHashRouter } from "react-router-dom";
import { HomePage, NewContract, VerifyCertificate, VerifyCertificateHome, CertificateHome, Certificate } from "../pages";

import RootLayout from "./../Components/RootLayout";

const router = createHashRouter([
  {
    // path: ":routeType",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/new-contract",
        element: <NewContract />,
      },
      {
        path: "/issue-certificate",
        children: [
          {
            path: "",
            element: <CertificateHome />,
          },
          {
            path: ":certificateId/:issueType",
            element: <Certificate />,
          }
        ]
      },
      {
        path: "/verify-certificate",
        children: [
          {
            path: "",
            element: <VerifyCertificateHome />,
          },
          {
            path: ":certificateId",
            element: <VerifyCertificate />,
          }
        ]

      }
    ],
  },
]);

export default router;
