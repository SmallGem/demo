import React, {Component} from 'react';
import Request from '../../utils/Request';
import UserTable from '../../components/table/UserTable';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentWillMount() {
        let urlShard = "/user";
        let users = new Request('GET', urlShard);
        console.log(users);

        this.setState({
            users: users,
        })
    }

    render() {
        return(
            <div className="container is-widescreen">
                <h2 className="title is-2">用户列表</h2>
                <UserTable users={this.state.users}/>
            </div>
        )
    }
}

export default User;
