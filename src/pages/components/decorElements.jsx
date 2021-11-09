


export function DecorElemBorder(props) {
    return <div style={{
        position: 'absolute',
        boxShadow: '0 0 10px rgb(0, 0, 0)',
        border: `5px solid ${props.color === 'red' ? '#b60000' : '#192245'}`,
        transform: 'rotate(45deg)',
        zIndex: '-1',
        ...props.pos,
        ...props.size
    }} className="d-none d-lg-block">

    </div>;
}

export function DecorElemBox(props) {
    return <div style={{
        position: 'absolute',
        boxShadow: '0 0 10px rgb(0, 0, 0)',
        backgroundColor: `${props.color === 'red' ? '#b60000' : '#192245'}`,
        transform: 'rotate(45deg)',
        zIndex: '-1',
        ...props.pos,
        ...props.size
    }} className="d-none d-lg-block">

    </div>;
}