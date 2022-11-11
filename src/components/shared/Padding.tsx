interface Props {
    className?: string,
    children: JSX.Element | JSX.Element[]
}

const Padding : React.FC<Props> = ({className, children}) => {
    return (
        <div className={`
            px-4 py-4
            md:px-8
            lg:px-12
            ${className}`}>
            {children}
        </div>
    );
}

export default Padding;