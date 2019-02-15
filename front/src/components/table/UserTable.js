import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class UserList extends Component {
    render() {
        return this.props.users.map(user => {
            let id = user.id;
            let avatar = user.avatar;
            let nickname = user.nickname;
            let country = user.country;
            let province = user.province;
            let city = user.city;

            let gender;
            switch (user.gender) {
                case 1:
                    gender = <FontAwesomeIcon icon="mars"/>;
                    break;
                case 2:
                    gender = <FontAwesomeIcon icon="venus"/>;
                    break;
                default:
                    gender = <FontAwesomeIcon icon="question"/>;
            }

            return (
                <tr key={id}>
                    <th><img src={avatar} alt={nickname}/></th>
                    <th>{nickname}</th>
                    <th>{gender}</th>
                    <th>{country}</th>
                    <th>{province}</th>
                    <th>{city}</th>
                </tr>
            )
        })
    }
}

class UserTable extends Component {
    render() {
        return (
            <table className="table is-hoverable is-bordered">
                <thead>
                <tr>
                    <th>头像</th>
                    <th>昵称</th>
                    <th>性别</th>
                    <th>国籍</th>
                    <th>省份</th>
                    <th>市/县</th>
                </tr>
                </thead>
                <tbody>
                <UserList users={this.props.users || []}/>
                </tbody>
            </table>
        )
    }
}

export default UserTable;
