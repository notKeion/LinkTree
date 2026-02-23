import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  const formData = await req.formData();

  if (formData.has('file')) {
    const file = formData.get('file');

    const s3Client = new S3Client({
      region: 'auto', 
      endpoint: process.env.S3_ENDPOINT, // <--- CRITICAL: Tells the SDK to talk to Cloudflare
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const randomId = uniqid();
    const ext = file.name.split('.').pop();
    const newFilename = randomId + '.' + ext;
    const bucketName = process.env.BUCKET_NAME;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: newFilename,
      // ACL: 'public-read', <--- REMOVED: Cloudflare R2 does not support S3 ACLs
      Body: Buffer.concat(chunks),
      ContentType: file.type,
    }));

    // Generate the link using your Public R2 URL or Custom Domain
    //const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    const link = `${process.env.S3_PUBLIC_URL}/${newFilename}`;

    return Response.json(link);
  }
}