//hooks
import React, { useState, useContext } from 'react';

//components
import { Link } from 'react-router-dom';

//data
import { SidebarData, adminSideBarData, healthSideBarData, patBscUsrSideBarData, Exceptional } from './SidebarData';

//css
import './Navbar.css';

//context
import { IconContext } from 'react-icons';
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import { MainContext } from '../../context/maincontext'

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    let { handleToken, userRole } = useContext(MainContext)
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <React.Fragment>

            <IconContext.Provider value={{ color: '#fff' }}>

                <div className='navbar'>

                    <Link to='#' className='menu-bars'>
                        {//<FaIcons.FaBars onClick={showSidebar} />
                        }
                        <BiToggleLeft onClick={showSidebar} />
                    </Link>

                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                    <ul className='nav-menu-items' onClick={showSidebar}>

                        <li className='navbar-toggle'>

                            <Link to='#' className='menu-bars'>
                                {/* <AiIcons.AiOutlineClose />*/}
                                <BiToggleRight />
                            </Link>

                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>

                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>

                                </li>
                            );
                        })}
                        {userRole === "admin" ? (adminSideBarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>

                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>

                                </li>
                            );
                        })) : null}
                        {userRole === "health" ? (healthSideBarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>

                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>

                                </li>
                            );
                        })) : null}

                        {userRole === "patient" || userRole === "basic" ? (patBscUsrSideBarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>

                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>

                                </li>
                            );
                        })) : null}
                        <li className={Exceptional.profile.cName}>
                            <Link to="/profile" >
                                {Exceptional.profile.icon}
                                <span>{Exceptional.profile.title}</span>
                            </Link>

                        </li>
                        <li className={Exceptional.logout.cName}>
                            <Link to="/" onClick={() => {
                                handleToken("clear")

                            }}>
                                {Exceptional.logout.icon}
                                <span>{Exceptional.logout.title}</span>
                            </Link>

                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </React.Fragment >
    )
}

export default Navbar;