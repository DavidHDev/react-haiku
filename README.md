# React Haiku

<div align="center">
	<br>
	<br>
	<img src="./haiku.svg" alt="react-haiku" height="200">
	<br>
	<br>
	<b>An awesome collection of React Hooks & Utilities</b>
	<br>
	<br>
	<br>
	<br>
	<hr>
</div>

[![NPM](https://img.shields.io/npm/l/react-haiku)](https://github.com/davidhzdev/react-haiku/LICENSE)
[![npm](https://img.shields.io/npm/v/react-haiku)](https://www.npmjs.com/package/react-haiku)
[![npm](https://img.shields.io/npm/dm/react-haiku)](https://www.npmjs.com/package/react-haiku)

## Links

- [Documentation](https://reacthaiku.online/)



## Install

Installing Haiku is very straight-forward!
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

*Requires React >=16.8.0*

## Usage

### Hooks
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

### Utilities
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

Please check the official [Documentation](https://reacthaiku.online/) for full usage examples.
<br>
### Hooks

- [`useHover()`](https://reacthaiku.online/docs/hooks/useHover) - Quick way to detect if your mouse is over an element!

### Utilities

- [`For`](https://reacthaiku.online/docs/utilities/for) - Dynamic rendering component with automatic key assignment!

## Maintainers

- [David Haz](https://github.com/davidhzdev)

## License

MIT