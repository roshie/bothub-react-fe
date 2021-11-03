import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';  
import Headroom from 'react-headroom';  
import { useState, useEffect } from 'react';
import { routes } from '../../App';
import logout from '../../logout'
import { Modal } from 'react-bootstrap';




export default function Layout(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Headroom>
                <nav className="navbar navbar-light bg-primary shadow-sm" style={{ height: '80px' }}>
                    <div className="container-fluid justify-content-around">
                        <span className="navbar-brand mb-0 d-flex flex-column">
                            <h3 className="fw-bold text-light mb-0">BotHub.in</h3>
                            <span className="text-light" style={{fontSize: '9px', textAlign: 'end'}}>Experience innovation</span>
                        </span>
                        <span className="navbar-brand mb-0 h1"></span>
                        <span className="navbar-brand mb-0 h1 d-none d-md-block">
                            <Item href={props.page === "home" ? "#" : routes.home} active={props.page === "home" ? true : false}>Home</Item>
                            <Item href={props.page === "home" ? "#categories" : `${routes.home}#categories`} active={false}>Categories</Item>
                            <Item href={props.page === "home" ? "#3dPrinting" : `${routes.home}#3dPrinting`} active={false}>3D Printing</Item>
                            {props.loginState ?
                                <>
                                    <Item href={props.page === "profile" ? "#" : routes.profile} active={props.page === "profile" ? true : false}>Profile</Item>
                                    <Item href="NA" active={false}>Logout</Item>
                                </>
                                :
                                    <Item href={`${routes.login}?redirect=${props.page}`} active={false}>Login</Item>
                            }   
                        </span>
                        <a className="navbar-toggler d-block d-md-none" type="button" onClick={handleShow}>
                            <FontAwesomeIcon icon={faBars} className="text-secondary"/>
                        </a>
                    </div>
                </nav>
            </Headroom>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{'border': 'none'}} className="bg-primary">
                    <Modal.Title className="text-light">Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-primary d-flex flex-column">
                    <Item href={props.page === "home" ? "#" : routes.home} active={props.page === "home" ? true : false}>Home</Item>
                    <Item href={props.page === "home" ? "#categories" : `${routes.home}#categories`} active={false}>Categories</Item>
                    <Item href={props.page === "home" ? "#3dPrinting" : `${routes.home}#3dPrinting`} active={false}>3D Printing</Item>
                    {props.loginState ?
                        <>
                            <Item href={props.page === "profile" ? "#" : routes.profile} active={props.page === "profile" ? true : false}>Profile</Item>
                            <Item href="NA" active={false}>Logout</Item>
                        </>
                        :
                            <Item href={`${routes.login}?redirect=${props.page}`} active={false}>Login</Item>
                    }  
                </Modal.Body>
            </Modal>

            {props.children}
            <footer> </footer>
            
        </>
    );
}

function Item (props) {
    return (
        <a
        href={props.href !== 'NA' ? props.href : '#'}
        onClick={props.href === 'NA' ? logout : () => true}
        className={`navbar-link m-2 fs-6 ${props.active ? 'text-secondary' : 'text-light'}`} 
        style={{textDecoration: 'none', cursor: 'pointer'}}>
            {props.children}
        </a>
    );
}