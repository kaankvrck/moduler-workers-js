export class Request {

    constructor(url) {
        this.url = url;
    }
    //Get Request Fonksiyonunun Yazılması
    async get() {
        const response = await fetch(this.url);
        const responseData = await response.json();

        return responseData;
    }
    //Post Request Fonksiyonunun Yazılması
    async post(data) {
        const response = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const responseData = await response.json();
        return responseData;
    }
    //Put Request Fonksiyonunun Yazılması
    async put(id, data) {
        const response = await fetch(this.url + "/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const responseData = await response.json();
        return responseData;
    }
    //Delete Request Fonksiyonunun Yazılması
    async delete(id) {
        const response = await fetch(this.url + "/" + id, {
            method: "DELETE"
            
        });
        return "Deleted";
    }
}