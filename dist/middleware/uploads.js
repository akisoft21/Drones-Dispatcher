"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getBlobStream = exports.FrontendAssetsUpload = exports.ChatImageUpload = exports.FileUploadGCS = exports.uploadDocStrategy = exports.uploadStrategy = exports.FileUploadAzure = exports.ProfilePhotoUpload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const multer_1 = __importDefault(require("multer"));
const multer_cloud_storage_1 = __importDefault(require("multer-cloud-storage"));
const config_1 = require("../config");
const multer_azure_blob_storage_1 = require("multer-azure-blob-storage");
const stream_1 = require("stream");
aws_sdk_1.default.config.update({
    secretAccessKey: config_1.AWS_ACCESS_KEY,
    accessKeyId: config_1.AWS_ACCESS_KEY_ID,
    region: config_1.S3_REGION, // region of bucket
});
const s3 = new aws_sdk_1.default.S3();
// const getStream = require('into-stream')
exports.ProfilePhotoUpload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: config_1.S3_BUCKET,
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
const resolveContentSettings = (req, file) => {
    return new Promise((resolve, reject) => {
        const contentSettings = yourObjectlogic(req, file);
        resolve(contentSettings);
    });
};
const resolveMetadata = (req, file) => {
    return new Promise((resolve, reject) => {
        const metadata = yourObjectlogic(req, file);
        resolve(metadata);
    });
};
exports.FileUploadAzure = (0, multer_1.default)({
    storage: new multer_azure_blob_storage_1.MulterAzureStorage({
        connectionString: config_1.AZURE_CONNECTION_STRING,
        accessKey: config_1.AZURE_ACCESS_KEY,
        accountName: config_1.AZURE_ACCOUNT_NAME,
        containerName: config_1.AZURE_CONTAINER_NAME,
        blobName: resolveBlobName,
        metadata: resolveMetadata,
        contentSettings: resolveContentSettings,
        containerAccessLevel: 'blob',
        urlExpirationTime: 60
    })
});
function resolveBlobName(req, file) {
    return new Promise((resolve, reject) => {
        const blobName = processFile(req, file);
        resolve(blobName);
    });
}
function processFile(req, file) {
    const unique_id = req.params.unique_id;
    const file_name = file.originalname.replace(/ /g, "-");
    return `/${Date.now()}${unique_id}-${file_name}`;
}
function yourObjectlogic(req, file) {
    console.log("------->>>>><<<<<<<----------");
    console.log(file);
    console.log("------->>>>><<<<<<<----------");
    return {};
}
const inMemoryStorage = multer_1.default.memoryStorage();
exports.uploadStrategy = (0, multer_1.default)({ storage: inMemoryStorage }).single('image');
exports.uploadDocStrategy = (0, multer_1.default)({ storage: inMemoryStorage }).single('doc');
exports.FileUploadGCS = (0, multer_1.default)({
    storage: new multer_cloud_storage_1.default({
        autoRetry: true,
        bucket: 'budcrm',
        projectId: 'starlit-hulling-305318',
        keyFilename: 'starlit-hulling-305318-ea3ebdc09e3e.json',
        filename: (req, file, cb) => {
            const unique_id = req.params.unique_id;
            const file_name = file.originalname.replace(/ /g, "-");
            cb(null, `/${Date.now()}${unique_id}-${file_name}`);
        }
    }),
});
exports.ChatImageUpload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: config_1.S3_BUCKET,
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
exports.FrontendAssetsUpload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: config_1.S3_BUCKET,
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
function _getBlobStream(req) {
    console.log(req.file.buffer);
    const stream = stream_1.Readable.from(req.file.buffer);
    console.log(stream);
    return stream;
}
exports._getBlobStream = _getBlobStream;
//# sourceMappingURL=uploads.js.map