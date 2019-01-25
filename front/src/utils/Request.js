class Request {
    constructor(method, urlShard, data = null, url = "http://application.test:5000") {
        this.request = new XMLHttpRequest();
        this.response = null;
        this.request.onreadystatechange = () => {
            if (this.request.readyState === XMLHttpRequest.DONE) {
                if (this.request.status === 200) {
                    this.response = JSON.parse(this.request.response);
                } else {
                    this.response = this.request.status;
                }
            }
        };
        this.request.open(method, url + urlShard, false);
        this.request.setRequestHeader("Content-Type", "application/json");
        if (data) {
            this.request.send(JSON.stringify(data));
        } else {
            this.request.send();
        }

        return this.response;
    }
}

export default Request;
