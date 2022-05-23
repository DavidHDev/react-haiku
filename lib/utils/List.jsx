const getRenderValue = (item) => typeof item === 'object' ? JSON.stringify(item) : item;
const randomKey = () => Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);

export const List = ({ from, fallback }) => {
    if (Array.isArray(from) && from.length) {
        return <ul>{from.map(item => <li key={randomKey}>{getRenderValue(item)}</li>)}</ul>
    } else return fallback;
}