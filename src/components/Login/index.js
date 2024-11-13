import { Component } from "react"
import Cookies from 'js-cookie'
import "./index.css"

class Login extends Component{
    state={name:"",password:""}
    user=event => {
        this.setState({name:event.target.value})
    }
    pass = event => {
        this.setState({password:event.target.value})
    }

    subm= async event => {
        event.preventDefault();
        const {name,password}=this.state
        const url="http://localhost:5000/login"
        const userDetails={name,password}
        const options={method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(userDetails),
        }
        const response=await fetch(url,options)
        if(response.ok){
            const { jwtToken }=await response.json()
            Cookies.set('jwt_token', jwtToken, {
                expires: 30,
              })
            window.location.replace("/todos")
        }
        else{
            const {history}=this.props
            window.location.replace("/register")
            console.log("failed")
        }
    }
    render() {
        const {name,password}=this.state
        return (
            <div>
                <form className="maincon" onSubmit={this.subm}>
                    <input onChange={this.user} type="text" value={name}></input>
                    <input onChange={this.pass} type="password" value={password}></input>
                    <button type="submit">Log in</button>
                </form>
            </div>
        )
    }
}

export default Login