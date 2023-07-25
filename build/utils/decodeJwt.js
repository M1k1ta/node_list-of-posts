"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwtResponse = void 0;
const decodeJwtResponse = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload);
};
exports.decodeJwtResponse = decodeJwtResponse;
