import React, {Component} from 'react'
import './add.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Request from "../../utils/Request";

function Catalogs(props) {
    return props.catalogs.map(catalog => {
        let id = catalog.id;
        let name = catalog.name;

        return (
            <option value={id} key={id}>{name}</option>
        )
    })
}

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModify: false,
            catalogs: [{
                id: "",
                name: "请选择分类",
            }],
            imageDataUrl: "",
            nameLength: 0,
            descriptionLength: 0,
            itemId: "",
            name: "",
            image: null,
            price: 0,
            description: "",
            catalogId: "",
        };
        this.image = React.createRef();
    }

    changeImage() {
        let image = this.image.current.files[0];
        console.log(typeof image);
        let fileReader = new FileReader();
        fileReader.onload = (res) => {
            this.setState({
                imageDataUrl: res.target.result,
                image: image,
            })
        };
        fileReader.readAsDataURL(image);
    }

    changeName(event) {
        let name = event.target.value.substr(0, 16);
        this.setState({
            name: name,
            nameLength: name.length,
        });
    }

    changePrice(event) {
        this.setState({
            price: Math.floor(Math.abs(event.target.value) * 100) / 100,
        });
    }

    changeDescription(event) {
        let description = event.target.value.substr(0, 200)
        this.setState({
            description: description,
            descriptionLength: description.length,
        });
    }

    changeCatalog(event) {
        console.log(event.target.value);
        this.setState({
            catalogId: event.target.value,
        });
    }

    submitForm(event) {
        event.preventDefault();
        let id = this.state.itemId;
        let name = this.state.name;
        let image = this.state.image;
        let price = this.state.price;
        let description = this.state.description;
        let catalogId = this.state.catalogId;

        console.log("name: " + name);
        if (name === "" || name === null) {
            alert("名称不能为空");
        }

        console.log(image);

        console.log("price: " + price);
        if (price === "" || price === null) {
            alert("价格不能为空");
        }

        console.log("catalogId: " + catalogId);
        if (catalogId === "" || catalogId === null) {
            alert("分类不能为空");
        }

        let formData = new FormData();
        if (image !== null && image !== "") {
            formData.append('image', image);
        }
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('catalog_id', catalogId);

        let request = new XMLHttpRequest();
        let response;
        request.onreadystatechange = () => {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    response = JSON.parse(request.response);
                } else {
                    response = request.status;
                }
            }
        };

        if (this.state.isModify) {
            request.open("PUT", "http://localhost/item/" + id)
        } else {
            request.open("POST", "http://localhost/item");
        }

        request.send(formData);

        this.props.selectMenuItem("items");
    }

    componentWillMount() {
        console.log(this.props.item);
        if (this.props.item !== null && this.props.item !== "") {
            let item = this.props.item;
            this.setState({
                isModify: true,
                itemId: item.id,
                name: item.name,
                imageDataUrl: item.image,
                price: item.price,
                description: item.description,
                catalogId: item.catalog.id,
            })
        }

        const urlShard = "/catalog";
        let catalogs = new Request("GET", urlShard);
        this.setState({
            catalogs: [{
                id: "",
                name: "请选择分类"
            }].concat(catalogs),
        })
    }

    render() {
        return (
            <div className="container is-widescreen">
                <h2 className="title is-2">添加商品</h2>
                <form onSubmit={this.submitForm.bind(this)}>
                    <div className="field">
                        <label className="label">图片</label>
                        <div className="control upload-control">
                            <FontAwesomeIcon className="upload-icon" icon="cloud-upload-alt"/>
                            <img
                                className={this.state.imageDataUrl ? "upload-image" : "upload-image upload-invisible"}
                                src={this.state.imageDataUrl} alt="上传图片"
                            />
                            <input
                                type="file" accept="image/*" title="上传图片"
                                className="upload-input upload-invisible"
                                ref={this.image}
                                onChange={() => this.changeImage()}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">名称</label>
                        <div className="control has-icons-right">
                            <input
                                type="text" name="name" className="input"
                                value={this.state.name || ""}
                                onChange={this.changeName.bind(this)}
                            />
                            <span className="icon" style={{right: "4px"}}>{this.state.nameLength}/16</span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">价格</label>
                        <div className="control">
                            <input
                                type="number" name="price" className="input"
                                value={this.state.price || ""}
                                onChange={this.changePrice.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">描述</label>
                        <div className="control has-icons-right">
                            <textarea
                                className="textarea has-fixed-size"
                                value={this.state.description || ""}
                                onChange={this.changeDescription.bind(this)}
                            />
                            <span className="icon" style={{
                                top: "initial",
                                right: "8px",
                                bottom: 0
                            }}>{this.state.descriptionLength}/200</span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">分类</label>
                        <div className="control">
                            <div className="select">
                                <select value={this.state.catalogId} onChange={this.changeCatalog.bind(this)}>
                                    <Catalogs catalogs={this.state.catalogs}/>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                className="button is-primary"
                                type="submit" value={this.state.isModify ? "修改" : "添加"}
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Add;
