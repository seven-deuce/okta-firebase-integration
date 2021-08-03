import React from "react"
import "./App.css"
import { BrowserRouter, NavLink } from "react-router-dom"
import Routes from "./Routes"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="menu">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/protected">Protected Page</NavLink>
                </div>
                <Routes />
            </BrowserRouter>
        </div>
    )
}

export default App