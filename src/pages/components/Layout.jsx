import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Headroom from 'react-headroom';  
import { useState, useEffect } from 'react';
import { routes } from '../../App';
import logout from '../../logout'
import { Modal } from 'react-bootstrap';




export default function Layout(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setAndClose = (e) => {
        setShow(false);
        scroll(e.target.href)
    }

    useEffect(() => {
        scroll()
        // eslint-disable-next-line
    }, [])


    const scroll = (path=window.location.href) => {
        console.log(path)
        if (props.page === "home") {
            const href = path.split('/').pop()
            console.log("href: ", href)
            if (href.startsWith('#')) {
                const elem = document.querySelector(href);
                elem.scrollIntoView(true)
            }
        }
    }
    
    return (
        <>
            <Headroom>
                <nav className="navbar navbar-light bg-info shadow" style={{ height: '80px' }}>
                    <div className="container-fluid justify-content-around">
                        <span className="navbar-brand mb-0 d-flex flex-column">
                            <h3 className="fw-bold text-light mb-0">BotHub.in</h3>
                            <span className="text-light" style={{fontSize: '9px', textAlign: 'end'}}>Experience innovation</span>
                        </span>
                        <span className="navbar-brand mb-0 h1"></span>
                        <span className="navbar-brand mb-0 h1 d-none d-md-block">
                            <Item href={props.page === "home" ? "#home" : routes.home} active={props.page === "home" ? true : false}>Home</Item>
                            <Item href={props.page === "home" ? "#categories" : `${routes.home}#categories`} active={false}>Categories</Item>
                            <Item href={props.page === "home" ? "#threeDPrinting" : `${routes.home}#threeDPrinting`} active={false}>3D Printing</Item>
                            {props.loginState ?
                                <>
                                    <Item href={props.page === "profile" ? "#" : routes.profile} active={props.page === "profile" ? true : false}>Profile</Item>
                                    <Item href="NA" active={false}>Logout</Item>
                                </>
                                :
                                    <Item href={`${routes.login}?redirect=${props.page}`} active={false}>Login</Item>
                            }   
                        </span>
                        <button className="navbar-toggler d-block d-md-none" type="button" onClick={handleShow}>
                            <FontAwesomeIcon icon={faBars} className="text-secondary"/>
                        </button>
                    </div>
                </nav>
            </Headroom>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{'border': 'none'}} className="bg-info">
                    <Modal.Title className="text-light">Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-primary d-flex flex-column">
                    <Item href={props.page === "home" ? "#home" : routes.home} active={props.page === "home" ? true : false} onClick={setAndClose}>Home</Item>
                    <Item href={props.page === "home" ? "#categories" : `${routes.home}#categories`} active={false} onClick={setAndClose}>Categories</Item>
                    <Item href={props.page === "home" ? "#threeDPrinting" : `${routes.home}#threeDPrinting`} active={false} onClick={setAndClose}>3D Printing</Item>
                    {props.loginState ?
                        <>
                            <Item href={props.page === "profile" ? "#" : routes.profile} active={props.page === "profile" ? true : false}>Profile</Item>
                            <Item href="NA" active={false} onClick={logout}>Logout</Item>
                        </>
                        :
                            <Item href={`${routes.login}?redirect=${props.page}`} active={false}>Login</Item>
                    }  
                </Modal.Body>
            </Modal>
            {props.children}

            <footer className="bg-secondary">
                <div className="foot bg-secondary shadow"></div>
                <div className="col" style={{marginLeft: '10%', marginRight: '10%'}}>
                    <h3 className="fw-bolder text-light">Contact</h3>
                    <div className="row mt-4">
                        <div className="col-12 col-md-4">Mail</div>
                        <div className="col-12 col-md-4">Insta</div>
                        <div className="col-12 col-md-4">Youtube</div>
                    </div>
                    
                </div>
            </footer>
            
        </>
    );
}

function Item (props) {
    return (
        <a
        href={props.href !== 'NA' ? props.href : '#'}
        onClick={props.onClick}
        className={`navbar-link m-2 fs-6 ${props.active ? 'text-secondary' : 'text-light'}`} 
        style={{textDecoration: 'none', cursor: 'pointer'}}>
            {props.children}
        </a>
    );
}