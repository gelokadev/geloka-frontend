import moment from "moment";

export const convertDate = (date: any, format = "DD-MM-YYYY") => {
    return moment(date).format(format);
}