import type { NOTIFICATION_TYPE, iNotification } from "react-notifications-component";
import { Store } from "react-notifications-component";

export const showAlert = (
    message: string | React.ReactNode | React.FunctionComponent,
    type?: NOTIFICATION_TYPE,
    options?: iNotification
) => {
    let config: iNotification = {
        message: message,
        type: type || "default",
        insert: options?.insert || "bottom",
        container: options?.container || "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: options?.dismiss?.duration || 2500,
            onScreen: false,
            showIcon: true,
        }
    };
    if (options?.onRemoval) {
        config.onRemoval = options.onRemoval;
    }
    if (options?.content) {
        config.content = options.content;
    }
    Store.addNotification(config);
};

export const removeAllAlert = () => {
    Store.removeAllNotifications();
};