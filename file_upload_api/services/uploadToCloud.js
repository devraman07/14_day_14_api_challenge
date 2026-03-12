import cloudinary from "../configs/cloudinary.config.js";



export const uploadTocloudinary = (fileBuffer) => {
    return new Promise ((resolve , reject) => {
           const stream = cloudinary.uploader.upload_stream(
            {folder : "profile-image"},
            (error , result) => {
                if(error) reject(error);
                resolve(result.secure_url);
            }
           )

           stream.end(fileBuffer);
    })
}