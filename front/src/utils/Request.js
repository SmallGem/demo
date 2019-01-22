class Request {
    constructor(method, urlShard, url = "http://application.test:5000", ) {
        this.request = new XMLHttpRequest();
        this.response = null;
        this.request.onreadystatechange = () => {
            if (this.request.readyState === XMLHttpRequest.DONE) {
                if (this.request.status === 200) {
                    console.log(this.request.response);
                    this.response = JSON.parse(this.request.response);
                } else {
                    this.response = this.request.status;
                }
            }
        };
        this.request.open(method, url + urlShard, false);
        this.request.setRequestHeader("Content-Type", "application/json");
        this.request.send();

        return this.response;
    }
}

export default Request;
