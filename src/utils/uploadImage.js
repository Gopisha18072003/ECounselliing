const uploadImageToCloudinary = async (selectedImage) => {
    if (!selectedImage) {
      throw new Error("No image selected for upload.");
    }

    const uploadData = new FormData();
    uploadData.append("file", selectedImage);
    uploadData.append("upload_preset", "E_Counselling");
    uploadData.append("cloud_name", "dsnqj4rrr");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsnqj4rrr/image/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
};
export default uploadImageToCloudinary;