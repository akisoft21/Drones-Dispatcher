import aws from "aws-sdk";
import multerS3 from "multer-s3";
import multer from "multer";
import MulterGoogleCloudStorage from 'multer-cloud-storage';
import { AWS_ACCESS_KEY, AWS_ACCESS_KEY_ID, S3_REGION, S3_BUCKET, AZURE_ACCESS_KEY, AZURE_ACCOUNT_NAME, AZURE_CONNECTION_STRING, AZURE_CONTAINER_NAME } from "../config";
import { MASObjectResolver, MulterAzureStorage } from "multer-azure-blob-storage";
import { Readable } from 'stream';

aws.config.update({
    secretAccessKey: AWS_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID,
    region: S3_REGION, // region of bucket
});

const s3 = new aws.S3();
// const getStream = require('into-stream')
export const ProfilePhotoUpload = multer({
    storage: multerS3({
        s3,
        bucket: S3_BUCKET,
        acl: "public-read",
        metadata(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key(req, file, cb) {
            const fileName = Date.now();
            const originalName = file.originalname;
            const extension = originalName.slice(originalName.lastIndexOf("."));
            const newFileName = `profile_images/${fileName}${extension}`;
            cb(null, newFileName);
        },
    }),
});
const resolveContentSettings: MASObjectResolver = (req: any, file: Express.Multer.File): Promise<MetadataObj> => {
    return new Promise<MetadataObj>((resolve, reject) => {
        const contentSettings: MetadataObj = yourObjectlogic(req, file);
        resolve(contentSettings);
    });
};
export type MetadataObj = { [k: string]: string };
const resolveMetadata: MASObjectResolver = (req: any, file: Express.Multer.File): Promise<MetadataObj> => {
    return new Promise<MetadataObj>((resolve, reject) => {
        const metadata: MetadataObj = yourObjectlogic(req, file);
        resolve(metadata);
    });
};
export const FileUploadAzure = multer({
    storage: new MulterAzureStorage({
        connectionString: AZURE_CONNECTION_STRING,
        accessKey: AZURE_ACCESS_KEY,
        accountName: AZURE_ACCOUNT_NAME,
        containerName: AZURE_CONTAINER_NAME, 
        blobName: resolveBlobName,
        metadata: resolveMetadata,
        contentSettings: resolveContentSettings,
        containerAccessLevel: 'blob',
        urlExpirationTime: 60
    })
});
function resolveBlobName(req: any, file: Express.Multer.File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const blobName: string = processFile(req, file);
        resolve(blobName);
    });
}
function processFile(req: any, file: Express.Multer.File): string {
    const unique_id = req.params.unique_id;
    const file_name = file.originalname.replace(/ /g, "-")
    return `/${Date.now()}${unique_id}-${file_name}`
}
function yourObjectlogic(req: any, file: Express.Multer.File): {} {
    console.log("------->>>>><<<<<<<----------");
    console.log(file);
    console.log("------->>>>><<<<<<<----------");
    return {}
}

const inMemoryStorage = multer.memoryStorage()
export const uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
export const uploadDocStrategy = multer({ storage: inMemoryStorage }).single('doc')

export const FileUploadGCS = multer({
    storage: new MulterGoogleCloudStorage({
        autoRetry: true,
        bucket: 'budcrm',
        projectId: 'starlit-hulling-305318',
        keyFilename: 'starlit-hulling-305318-ea3ebdc09e3e.json',
        filename: (req: any, file: any, cb: Function) => {
            const unique_id = req.params.unique_id;
            const file_name = file.originalname.replace(/ /g, "-")
            cb(null, `/${Date.now()}${unique_id}-${file_name}`);
        }
    }),
});
export const ChatImageUpload = multer({
    storage: multerS3({
        s3,
        bucket: S3_BUCKET,
        acl: "public-read",
        metadata(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key(req, file, cb) {
            const fileName = Date.now();
            const originalName = file.originalname;
            const extension = originalName.slice(originalName.lastIndexOf("."));
            const newFileName = `chat_media/${fileName}${extension}`;
            cb(null, newFileName);
        },
    }),
});

export const FrontendAssetsUpload = multer({
    storage: multerS3({
        s3,
        bucket: S3_BUCKET,
        acl: "public-read",
        metadata(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key(req, file, cb) {
            const fileName = Date.now();
            const originalName = file.originalname;
            const extension = originalName.slice(originalName.lastIndexOf("."));
            const newFileName = `public_assets/${fileName}${extension}`;
            cb(null, newFileName);
        },
    }),
});

export function _getBlobStream(req: any) {
    console.log(req.file.buffer);
    const stream = Readable.from(req.file.buffer);
    console.log(stream);
    return stream;
}


