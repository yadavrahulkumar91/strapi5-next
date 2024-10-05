// // lib/firebaseAdmin.js

// import admin from "firebase-admin";
// import path from "path";
// import { promises as fs } from "fs";

// const serviceAccount = require(path.resolve(
//   "./lib/gamechanger-drive-91-d27c1e195052.json"
// ));

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "gamechanger-drive-91.appspot.com",
//   });
// }

// const bucket = admin.storage().bucket();

// export default bucket;

import admin from "firebase-admin";

// Store the service account details as a constant
// const serviceAccount = {
//   type: "service_account",
//   project_id: "gamechanger-drive-91",
//   private_key_id: "d27c1e195052232227b2c6f981d89e264dde249e",
//   private_key:
//     "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqdcWDAeuOUZCa\n6Rfzfnsbuv/XoBVrfEoG+23zCb1Q3qdeRNvbphUR/Ax+C3SfinEDKm1hMeiE7Wxz\nZ6sTo+D/+aN7LANBklG6VCrGkECNfGbg7EpemeLzIj3PEwwXsCLGSbWw4Xjhb2yh\naozJ/liGytCOdUqqBcg+n8o7tiqu9o6fAcIde47VoGmQdCrbOuZYk2Ybtod80VmR\nSMwBWyaqDZ0xAexV22imXdzOHuaTavV4ol4itsfWDM+DsKqi2ekhkXGEbjQicC+x\nBDUI+v+xmwzGoNtbemt/pSc9jXn3zEP8e40vOnZ+/cXJKs3hegYYvStl2grfl00p\nnWSULsCTAgMBAAECggEABX/wQ/ZTZc+e5UihA7OwgCgL6iaZmlKzxr7lAMLvL0VH\nzCRXnaIhqudhdc2j0SPz2oDLb6ffEy7f4WdWXzdZ4pho3GgCoOJ6LZNan/Z2hrod\nTaOCEMRRTLvtl5lLOhZuQMyPBqp3rnpcXGbmLPw+WfcAPKBvLMYr/E1Ghp+th+CS\nIPdx9U7itTI/5Wcc+lj0KJTZEzfjlgTaqOCuM49YdbZyzwO3OkYozQCGoA7itqif\nokkGBgeiFs02cMZDK50ARAUM2/Fxa1ocjVeuBj5fWV+iMVcwJJIZZx2chGjR1nQO\nQQRZaCpAKWDl5/mk5JHog3BG82hVP6XfeQ4sz6lL+QKBgQDb+PjoByrwP9qRDmEM\n/EjIocr2CPbHexbxuGb43mLyua40V19CIddHK4qzFZ9nihtpR3UpIToLtvTqji8/\n9iQPyZX1T1yyT88j5MbfB1g4wA+H8UsH9eufUmM+Iyscb2nvJVWgp7JbCF+f1caz\nHRZMlk/br91ex5y2DjN+16HcKwKBgQDGYNW1nWLWoUePTbYW+YdVKMS56sz4YBvI\nrJcdoBamOIpya0c6hLjgoL2JaljIKBT5tbpV/ZgU/m3DbKxXnxHBP5v5/6P03OqL\n5OjYlp+ePBCgQjDH3ST8lAsM4Fn7UBmav7V10dlODfJRMApZF3eCYZUJC3zdffbx\njd3Gw0GxOQKBgQCHtxpKfXGefKbq7AYwrs5xCnFgTrOC64yCYhUV4o8F1k2GeYmK\nEbrybAjM6MBKb0juMWo1kAxyAdUlicfZHJGvM95TVT2Jvfe8239fRvbFPKnYY6S5\nKp7O01PrmGMWzh57r3se/Zfq1kW5JXnMNFv3sJ1gmyZnPZyQLj7TOVLhtQKBgDr3\nHY7WMULKvZKC7tT1ZpyReagperN5HckQQ/qyUwklVUGdUZa7TJi4Lp5h1fHouBNh\nSPm2XzYeSlIEQ1XoGkbuuVYd/oYSBEWAzRVT8C4AfJCmHAnMWeoZtw8kwJpKvNGa\nmj1jGsxwqM4pEWpZ51QB3WLK31qWzogOOxWRhD1BAoGAOPSmw/U6kx8NVdniMUyR\nSphNm7Zi5HG3Ave2xcDlhyRFkb1URqeYgKE1vBjZPWMXxMtRapJNOVcj3hZvNW4C\n9gITtH80e2MSxICcLCgRmBH1uR8fwG8RF9E12SgB0Ictwj6xvyuzJKkyU0+urrM+\nSVsFjDMQXeGPpR2faWHIPlg=\n-----END PRIVATE KEY-----\n",
//   client_email:
//     "firebase-adminsdk-y4ega@gamechanger-drive-91.iam.gserviceaccount.com",
//   client_id: "112221887212496964795",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url:
//     "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y4ega%40gamechanger-drive-91.iam.gserviceaccount.com",
// };
const serviceAccount = {
  type: "service_account",
  project_id: "gamechanger-drive-91",
  private_key_id: "925076fe82fdc8c65ef1d29cb551f41989f80952",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYUQ3cawTPjh9C\n7WGrOsbQiWw+Q3u1XQTFRKq2R6Tx18LU31j9s8nbnuK1opFLKhnLVOF5LibYXZo4\nNOhRZw4gc++N2Ic7ZJXoFpncSzyAHxnfB1/wt+U6b9KK7QmB8uqwDihr4+Hg+aK/\npCvqvv00visAqwWXb0PNQ+qB9eJ2FJLLypWA2ONDrIwgF7ffzkp8ab+488KsFy3a\nYdiQl73DBKp+wCtpUiD61TDRmlzUxe7f8owuIl25IPla/6X3O2SwIVOOIZ2L5Wtu\nRqw+oMwZpNQHK537pDGJJ9OJtzOlsxZdoOX9rm65QvtGYJPCRq+0vOhu+g1X/R/R\nrbwpNov1AgMBAAECggEACA/6SNmNVqMyOmuwSM0CqxUrGpyd1rrGvt5knuNp8rc2\nA+iSoFM88xgU7gJd6HmhBedHTA/KVJeXyzPZvD1VPRiF7J8ygU1QtglEOant2OZM\ni0arqGVDh/VVUq87WpqOG6WUNCnK0grEt5osDO/xHTKXuiBTWnG0SBA5QInQY+mb\n6p5k5AoafuOU/39Ut1g4dzgLgKoNYqwwSpVo+ICezkPVbc/nGNaPhwsCNYsRNpxr\nq5w7gnm5MH2bLA59/b+I5SSzIkDfn4KhSIAYnz8nFamyi/nIEIjp6AeS2rJ9DunA\np6Ivk35KtcJZeF03/od+zm5e31aYGmM4rJPKr9mgPQKBgQDT5ik04c3uA4no2eOx\nMA+If8/bYsgqcPUjXNnamAHEJnPvqySHjYJ5LApaTSspk/cs9GQ1yNTMKSBLQX8M\nFEz1p9Fh5nU+YUdKxj8/af3gmq90fy7rUynTdNf5GyI1TWdON6cIhmX0+Aue9pWA\nU6/L5EB6Qelxnw22EM4xY0e4DwKBgQC4BGFunFAQ2dj/SubkndE4i5S/KiWKJ/ox\ni6X8gGbL3cEWzZshVO+64GPfjbZbpMFOR12yXiCmue8kMunB8LFIYwm+OOd96UoD\nytU8Bpz94oapuIVdsezw3V82JBiXOLmfdT7Gifaey/x0Pi3KBejtRAnNUjlPtp+i\ncae7gVpXuwKBgFkLWz2RtgvTCN0E0x3eaGif7STv+dV76keV+SZWwkc/MXEBpjQg\nTzfEPgV8cCrktvX5LTM81c+FaMC3IUBeN4jzoJVXVuWD04WkkWeAjuMXnauC1qCl\nLepiK2/O6y0i/cpssJBwid/LbHa8gE6Q3Er9++pkUEki4Ywku8EdS0IZAoGAFPXi\nxz+k2xaFYib8/+N+FmvHyLKbTg5ZsFUQ1h8mFmiu+tL2rahIGkg++BLjR7MPlcQJ\nRyzzmSoqtDvcZovtFaq6TGGc9LmjBaWP/mNedIjd/+0Vu+Ntcs40by1TY75BXolz\nWhgS8GmZ2v/OJWng603JtAp+nrbVniJGEdSdHssCgYBiTcsywduXX9+02vQU8F7v\nIjGvSJ2lDlzupO/32iVJY8SEzD/+XxZs+KEUGOpXLlIl0aTcQfbGSpwFsFBPrEBl\nmJoD128onczbHmFmdsDZYdSOZA1AtdvggZSkVQR9X3dwxa/qUDwn+1TbpZX08OR9\n0eSVcBgjviLXNJDubXk+zg==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-y4ega@gamechanger-drive-91.iam.gserviceaccount.com",
  client_id: "112221887212496964795",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y4ega%40gamechanger-drive-91.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gamechanger-drive-91.appspot.com",
  });
}

const bucket = admin.storage().bucket();

export default bucket;
