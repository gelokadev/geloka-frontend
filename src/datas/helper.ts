import moment from "moment";
import { env } from "../configs/EnvironmentConfig";

export const convertDate = (date: any, format = "DD-MM-YYYY") => {
    return moment(date).format(format);
}

export function getFilePath(file: string|undefined) {
    if (file)
        if (file.startsWith('http') && file.includes(':')) {
            return file.replace('//file', '/file');
        } else {
            return `${env?.API_ENDPOINT_URL}/${file}`.replace('//file', '/file')
        }
}