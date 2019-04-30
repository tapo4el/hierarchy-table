
export default class Api {
    static getData(): Promise<Response> {
        return fetch('/data', {
            method: 'GET',
        });
    }
}
