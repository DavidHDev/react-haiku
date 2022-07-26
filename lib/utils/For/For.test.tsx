import { render, screen } from '@testing-library/react'
import { For } from './index'

it('should map items correctly', () => {
    const todos = [
        { title: 'TS Support', name: 'React' },
        { title: 'TS Support', name: 'Haiku' },
    ]

    render(
        <For
            each={todos}
            render={(todo, index) => (
                <>
                    <h1>{todo.title}</h1>
                    <p>
                        {index}: {todo.name}
                    </p>
                </>
            )}
        />
    )

    const todoTitles = screen.getAllByRole('heading')
    expect(todoTitles.length).toBe(2)

    const todoContents = screen.getAllByText(/[0-9]+: [a-zA-Z]+/i)
    expect(todoContents.length).toBe(2)
})
