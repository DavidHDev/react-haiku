import { Children } from 'react'

interface IProps<T> {
    each: T[]
    render: (data: T, index: number) => React.ReactNode
}

export function For<T>({ each, render }: IProps<T>): JSX.Element {
    // @todo `key={}`

    return (
        <>{Children.toArray(each.map((item, index) => render(item, index)))}</>
    )
}
