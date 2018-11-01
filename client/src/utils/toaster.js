
import { toast } from "react-toastify";

/**
 * Information Toaster message.
 * @param {String} message
 */
export function infoToaster(message) {
    toast.info(message);
}

/**
 * Success Toaster message.
 * @param {String} message
 */
export function successToaster(message) {
    toast.success(message);
}

/**
 * Warning Toaster message.
 * @param {String} message
 */
export function warningToaster(message) {
    toast.warn(message);
}

/**
 * Error Toaster message.
 * @param {String} message
 */
export function errorToaster(msg) {
    toast.error(msg);
}
