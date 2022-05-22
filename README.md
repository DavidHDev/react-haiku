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
help you get the job done faster & with less lines of code!

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
  const { isHovered, ref } = useHover();

  return (
    <p ref={ref}>
      {isHovered ? 'All mice on me' : 'No mice on me'}
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
        	<For of={list} render={(item, index) =>
		        <p>{item.name}</p>
	        }/>
        </>
    )
}

export default Component;
```

## PACKAGE CONTENTS

### Hooks

- [`useHover()`](https://reacthaiku.online/docs/hooks/useHover) - Quick way to detect if your mouse is over an element!

### Utilities

- [`For`](https://reacthaiku.online/docs/utilities/for) - Dynamic rendering component with automatic key assignment!

## Maintainers

[David Haz](https://github.com/DavidHDev)

## License

MIT