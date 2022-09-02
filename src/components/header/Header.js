import React from "react";
import { Link, useHistory } from "react-router-dom";
import { app_name } from "../../static";

const Header = () => {
    const { location } = useHistory();
    return (
        <section className="navbar navbar-default navbar-static-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <Link to={location.pathname} className="navbar-brand">{ app_name }</Link>
                </div>
            </div>
        </section>
    )
}

export default Header;