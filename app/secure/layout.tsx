const SecurePageLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="flex h-full items-center justify-center bg-ghibli bg-cover">
            {children}
        </div>
     );
}
 
export default SecurePageLayout;