interface Props {
    className:string,
    children: JSX.Element | JSX.Element[]
}

const Margin : React.FC<Props> = ({className, children}) => {
    return (
        <div className={`
            mx-4 my-4
            md:mx-8
            lg:mx-12
            ${className}`}>
            {children}
        </div>
    );
}

export default Margin;