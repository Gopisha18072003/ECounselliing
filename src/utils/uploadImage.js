import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const uploadImageToS3 = async (selectedImage) => {
  if (!selectedImage) {
    throw new Error("No image selected for upload.");
  }

  const S3_BUCKET = "e-counselling-images";  
  const REGION = "ap-south-1";  
  const ACCESS_KEY = import.meta.env.VITE_S3_ACCESS_KEY;
  const SECRET_KEY = import.meta.env.VITE_S3_SECRET_KEY;

  // Initialize S3 Client
  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    },
  });

  const fileName = `${Date.now()}-${selectedImage.name}`;

  // Convert file to Blob
  const fileBlob = await selectedImage.arrayBuffer();

  const uploadParams = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: fileBlob,
    ContentType: selectedImage.type,
    // 🔹 Remove ACL since the bucket does not support it
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);
    const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};

export default uploadImageToS3;
