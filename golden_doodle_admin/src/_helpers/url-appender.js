export function urlAppender(path) {
    

    if (path) {
        return 'http://localhost:8081/app'+path;
    } else {
        return null;
    }
}