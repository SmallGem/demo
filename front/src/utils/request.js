const post = (urlShard, data) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                return JSON.parse(request.response);
            }
        }
    };
    request.open("GET", "http://application.test:5000/" + urlShard, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(data);
};

const get = (urlShard) => {
    
};