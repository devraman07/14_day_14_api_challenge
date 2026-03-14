import cloudinary from "../configs/cloudinary.config.js";


export const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve , reject) => {
        const stream = cloudinary.uploader.upload_stream(
           { folder : 'login-image' },
           (error , result) => {
            if(error) reject(error)
                else resolve(result.secure_url);
           }
        )

        stream.end(fileBuffer);
    });
}