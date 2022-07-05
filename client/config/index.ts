const configs = {
    API_END_POINT: 'http://localhost:4000/api/',
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    LIMIT_LOAD_PRODUCT: 4,
};
const common = {
    CONNECTION_TIMEOUT: 30000,
    MAXIMUM_FILE_SIZE: 1024 * 1024 * 7, //7 MB
    MAXIMUM_FILES_UPLOAD: 2,
    WAITING_TIME: 5000, // 5 secs
    ANIMATION_TIME: 300,
};


export default {
    ...configs,
    ...common
}