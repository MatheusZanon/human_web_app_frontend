type props = {
    children: React.ReactNode;
};

function BlankLayout({ children }: props) {
    return (
        <div className='container d-flex align-items-center justify-content-center min-vh-100'>
            {children}
        </div>
    );
}

export default BlankLayout;
