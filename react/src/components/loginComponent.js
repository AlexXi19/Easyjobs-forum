import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button} from "shards-react";
import axios from "axios";
import {connect} from "react-redux";
import {LoginAction} from "../../states/actions";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            wrongPw: 0,
            noUser: 0,
            isLoggedIn: false,
            returnPage: "",
        }
    }

    updateLogin(user) {
        this.props.loginState(user);
    }

    updateEmail(event) {
        this.setState({email: event.target.value});
    }

    updatePassword(event) {
        this.setState({password: event.target.value});
    }

    login(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/account/login',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then((response) => {
            if (response.data['login'] === 1) {                     // Login successful
                this.setState({isLoggedIn: true});
                this.setState({returnPage: 'blog-overview'});
                this.updateLogin(response.data['user']);
            } else if (response.data['login'] === 0) {              // Password incorrect
                this.setState({returnPage: 'login'});
            } else {                                                // User doesn't exist
                this.setState({returnPage: 'login'});
            }
            this.props.history.push(this.state.returnPage);
            // window.location.href = this.state.returnPage
        }).catch(function (error) {
            console.log(error)
        });
    }

    render() {
        return (
            <form>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={(event) => this.updateEmail(event)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={(event) => this.updatePassword(event)}
                    />
                </div>
                {/*<div className="form-group">*/}
                {/*    <div className="custom-control custom-checkbox">*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            className="custom-control-input"*/}
                {/*            id="customCheck1"*/}
                {/*        />*/}
                {/*        <label className="custom-control-label" htmlFor="customCheck1">*/}
                {/*            Remember me*/}
                {/*        </label>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <br/>
                <Button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={(event) => this.login(event)}
                    size="md"
                >
                    Submit
                </Button>
                {/*<p className="forgot-password text-right">*/}
                {/*    Forgot <a href="#">password?</a>*/}
                {/*</p>*/}
            </form>

        );
    }
}

const mapStateToProps = state => {
    return{
        state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginState: (user) => dispatch(LoginAction(user))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Login));
