import { notification } from "antd";

export const openNotification = function (message) {
    notification.open({
        message,
        placement: "bottomRight"
    });
};