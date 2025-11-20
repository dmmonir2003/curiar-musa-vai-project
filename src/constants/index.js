export const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
export const MAPS_API_KEY = import.meta.env.VITE_REACT_APP_MAPS_API_KEY;

export const REGISTER_USER = "/users/create-user";
export const REGISTER_COURIER = "/users/create-user";
export const GET_ME = "/users/me";
// export const REGISTER_USER = "/user/register";
// export const REGISTER_COURIER = "/courier/register";
export const LOGIN_USER = "/user/login";
export const LOGIN_COURIER = "/auth/login";
// export const LOGIN_COURIER = "/courier/login";
export const VERIFY_EMAIL = "/user/verify-email";
export const CHANGE_PASSWORD = "/user/update-password";
export const UPDATE_PROFILE = "/user/update-profile";
export const FORGOT_PASSWORD = "/user/forgot-password";
export const VERIFY_OTP = "/user/verify-otp";
export const RESET_PASSWORD = "/user/reset-password";
export const CONTACT_US = "/contacts/create-contact";
// export const CONTACT_US = "/user/contact-us";

//
export const NEW_COURIER_REQUEST = "/courier-request/new-courier-request";
export const UPDATE_COURIER_REQUEST = "/courier-request/update-courier-request";
export const DELETE_COURIER_REQUEST = "/courier-request/delete-courier-request";
export const GET_USER_REQUESTS = "/courier-request/get-user-requests";
export const GET_COURIER_STATS = "/courier-request/get-courier-stats";
// export const GET_ALL_JOBS = "/courier-request/get-pending-requests";
export const GET_ALL_JOBS = "/jobs";
export const GET_COURIER_SHIPMENTS = "/jobs/user";
// export const GET_COURIER_SHIPMENTS = "/courier-request/get-courier-shipments";
export const ACCEPT_JOB = "/jobs"; //TODO: working now as accept-job
export const GET_LOCATIONS = "/courier-request/locations";
// export const REVIEWS = "/users";
export const RATINGS = "/ratings/average-elements";
export const REVIEWS = "/testimonials";
export const GET_ROUTES = "/jobs/daily-route";
// export const GET_ROUTES = "/courier-routes/date";
export const ADD_DAILY_ROUTES = "/courier-routes/add";
export const CANCEL_DAILY_ROUTES = "/courier-routes/cancel-route";
export const CANCEL_VERIFY_PAYMENT = "/courier-routes/verify-payment-cancel";
export const UPDATE_POSITIONS = "/courier-routes/update-positions";
export const EDIT_DAILY_ROUTES = "/courier-routes";
export const VERIFY_PAYMENT = "/orders/webhook";
export const CREATE_PAYMENT = "/orders/create";

//Static pages

export const FETCH_FAQS = "/static/faqs";
export const BLOGS = "/admin/get-blogs";
export const TESTIMONIALS = "/admin/get-testimonials";
export const SETTINGS = "/admin/get-settings";
