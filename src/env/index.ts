const BASE_URL: string = process.env.REACT_APP_BASE_URL as string;
const IMAGE_PATH: string = process.env.REACT_APP_IMAGE_PATH as string;

const APP_ENV = {
    BASE_URL: BASE_URL,
    IMAGE_PATH: IMAGE_PATH,
};

export { APP_ENV };