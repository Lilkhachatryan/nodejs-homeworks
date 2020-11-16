import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { notifyError, notifySuccess, notifyWarning } from "../plugins/notify";

class Home extends Component {
    state = {
        socket: null,
        message: '',
        messages: []
    };

    componentDidMount() {
        const socket = io('http://localhost:8000', {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'Authorization': `Bearer ${this.props.token}`,
                    },
                },
            }
        });
        this.setState({
            ...this.state,
            socket
        });
        socket
            .on('connect', () => {
                socket
                    .on('message', (msg) => {
                        console.log('msg', msg);
                        this.setState({ ...this.state, messages: [...this.state.messages, msg] });
                    })
                    .on('messages', (data) => {
                        this.setState({ ...this.state, messages: data });
                    })
            })
            .on('disconnect', (a) => {
                console.log('disconnected', a)
            })
            .on('join', (description) => {
                notifySuccess(description)
            })
            .on('leave', (description) => {
                notifyWarning(description)
            })
            .on('connect_error', err => {
                console.log(err.message); // not authorized
                console.log(err.data); // { content: "Please retry later" }
                notifyError(err.message)
            })
    }

    componentWillUnmount() {
    }


    handleMessageChange = (event) => {
        this.setState({
            ...this.state,
            message: event.target.value
        })
    };

    sendMessage = (e) => {
        e.preventDefault();
        this.state.socket.emit('message', this.state.message);
        this.setState({ ...this.state, message: '' })
    };

    render() {
        return (
            <div className="messagesForm">
                <ul id="messages">
                    {
                        this.state.messages.map(item => (<li key={item.id}>{item.message}</li>))
                    }
                </ul>
                <form action=""
                      onSubmit={this.sendMessage}>
                    <input
                        id="m"
                        autoComplete="off"
                        value={this.state.message}
                        onChange={(e) => this.handleMessageChange(e)}/>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        token: state.login.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // updateChat: (payload) => dispatch(updateChat(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

