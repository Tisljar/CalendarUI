const Cell = ({ onClick, className, children }: any) => {
    return (
        <div onClick={onClick} className={className}>
            {children}
        </div>
    );
};

export default Cell;
