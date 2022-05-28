import '../styles/progress.css';

export const IndeterminateBar = (
    {
        color = '#FF005C',
        background = '#ff005d40',
        height = '5px',
        rounded = false,
        fixed = true,
    }) => {
    return (
        <div
            className={fixed ? 'progress-bar progress-bar-fixed' : 'progress-bar'}
            style={{
                "backgroundColor": background,
                "height": height,
                "borderRadius": rounded ? '50px' : ''
            }}
        >
            <div
                className="progress-bar-value"
                style={{
                    "backgroundColor": color,
                    "height": height,
                    "borderRadius": rounded ? '50px' : ''
                }}>

            </div>
        </div>
    )
}