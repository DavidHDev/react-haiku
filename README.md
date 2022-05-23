# React Haiku

<div align="center">
	<br>
	<br>
	<img src="./media/haiku.svg" alt="react-haiku" height="200">
	<br>
	<br>
	<b>An awesome collection of React Hooks & Utilities!</b>
	<br>
	<br>
	<br>
	<br>
	<hr>
</div>

[![NPM](https://img.shields.io/npm/l/react-haiku)](https://github.com/DavidHDev/react-haiku/blob/main/LICENSE.md)
[![npm](https://img.shields.io/npm/v/react-haiku)](https://www.npmjs.com/package/react-haiku)
[![npm](https://img.shields.io/npm/dm/react-haiku)](https://www.npmjs.com/package/react-haiku)

## Links

- [Official Docs](https://reacthaiku.online/)

## What is this?

Haiku is a simple & lightweight React library with the goal of saving<br>
you time by offering a large collection of hooks & utilities that will<br>
help you get the job done faster & more efficiently!

## Install

Installing Haiku is very easy! <br>
*Requires React >=16.8.0*
<br>

#### NPM
```sh
npm install react-haiku
```

#### Yarn
```sh
yarn add react-haiku
```
#### PNPM
```sh
pnpm install react-haiku
```
<br>

## Usage Examples
<br>

Please check the official [Documentation](https://reacthaiku.online/) for full usage examples.

<br>

### Using Hooks
<br>

```jsx
import { useHover } from 'react-haiku';

const Component = () => {
  const { hovered, ref } = useHover();

  return (
    <p ref={ref}>
      {hovered ? 'All mice on me' : 'No mice on me'}
    </p>
  );
}

export default Component;
```

### Using Utilities
<br>

```jsx
import { For } from 'react-haiku';

const Component = () => {
    const list = [{ name: 'React' }, { name: 'Haiku' }]

    render(
        <>
        	<For each={list} render={(item, index) =>
		        <p>{item.name}</p>
	        }/>
        </>
    )
}

export default Component;
```

## PACKAGE CONTENTS

### Hooks

- [`useClipboard()`](https://reacthaiku.online/docs/hooks/useClipboard) - Copy data to the user's clipboard!
- [`useHover()`](https://reacthaiku.online/docs/hooks/useHover) - Quick way to detect if your mouse is over an element!
- [`useInputValue()`](https://reacthaiku.online/docs/hooks/useInputValue) - Manage input state with this simple hook!
- [`useLeaveDetection()`](https://reacthaiku.online/docs/hooks/useLeaveDetection) - Detect when your user's cursor leaves the page!
- [`useMediaQuery()`](https://reacthaiku.online/docs/hooks/useMediaQuery) - Manipulate your component using media queries!
- [`useMousePosition()`](https://reacthaiku.online/docs/hooks/useMousePosition) - Detect the current position of the mouse relative to a target or the whole document!
- [`usePrefersTheme()`](https://reacthaiku.online/docs/hooks/usePrefersTheme) - Detect the user's preferred system theme!
- [`useScript()`](https://reacthaiku.online/docs/hooks/useScript) - Attach script tags to the document from your components!
- [`useToggle()`](https://reacthaiku.online/docs/hooks/useToggle) - Toggle state values between two different options!
- [`useUrgentUpdate()`](https://reacthaiku.online/docs/hooks/useUrgentUpdate) - Force render a component when calling this hook!

### Utilities

- [`If`](https://reacthaiku.online/docs/utilities/if) - Component for simple conditional rendering!
- [`Show`](https://reacthaiku.online/docs/utilities/show) - Component for complex conditional rendering!
- [`For`](https://reacthaiku.online/docs/utilities/for) - Dynamic rendering component with automatic key assignment!

## Maintainers

[David Haz](https://github.com/DavidHDev)

## License

MIT
