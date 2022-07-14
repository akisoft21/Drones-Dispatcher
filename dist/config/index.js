"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AZURE_CONTAINER_NAME = exports.AZURE_ACCOUNT_NAME = exports.AZURE_ACCESS_KEY = exports.AZURE_CONNECTION_STRING = exports.S3_BUCKET = exports.S3_REGION = exports.AWS_ACCESS_KEY_ID = exports.AWS_ACCESS_KEY = exports.ENVIRONMENT = exports.BASE_PATH = exports.DB_USER = exports.DB_PASSWORD = exports.DB_NAME = exports.DB_HOST = exports.PORT = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.PORT = process.env.PORT || "";
exports.DB_HOST = process.env.PORT || "";
exports.DB_NAME = process.env.PORT || "";
exports.DB_PASSWORD = process.env.PORT || "";
exports.DB_USER = process.env.PORT || "";
exports.BASE_PATH = process.env.BASE_PATH || "";
exports.ENVIRONMENT = process.env.NODE_ENV || "";
exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || "";
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
exports.S3_REGION = process.env.S3_REGION || "";
exports.S3_BUCKET = process.env.S3_BUCKET || "";
exports.AZURE_CONNECTION_STRING = process.env.AZURE_CONNECTION_STRING || "";
exports.AZURE_ACCESS_KEY = process.env.AZURE_ACCESS_KEY || "";
exports.AZURE_ACCOUNT_NAME = process.env.AZURE_ACCOUNT_NAME || "";
exports.AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME || "";
//# sourceMappingURL=index.js.map