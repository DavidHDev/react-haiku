export const Center = ({ inline = false, axis = 'both', className, children }) => {

    const getStyles = () => {
        switch (axis) {
            case 'x': {
                return {
                    "justifyContent": 'center',
                }
            }
            case 'y': {
                return {
                    "alignItems": 'center',
                }
            }
            case 'both': {
                return {
                    "alignItems": 'center',
                    "justifyContent": 'center',
                }
            }
            default: {
                return {
                    "alignItems": 'center',
                    "justifyContent": 'center',
                }
            }
        }
    }

    return (
        <div className={className} style={{
            "display": inline ? 'inline-flex' : 'flex',
            ...getStyles(),
        }}>
            {children}
        </div>
    );
}
