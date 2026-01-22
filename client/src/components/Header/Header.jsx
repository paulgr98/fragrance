import { NavLink } from "react-router-dom"
import "./Header.css"

const HeaderComponent = () => {
    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-custom-bg'>
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/">Fragrance</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Perfumes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Collections</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderComponent