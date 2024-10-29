{/* Children: A utility from React that helps manage and transform ReactNode elements, making it easier to work with children components.
ReactNode: A type that represents anything React can render, such as JSX elements, strings, numbers, or null. */}
import {Children, type ReactNode} from 'react';

{/* This defines RenderFn as a generic type.
RenderFn represents a function that takes two parameters:
item of type T (which can be any type defined by the caller).
index (optional) of type number.
It returns a ReactNode, which is the rendered output. */}
type RenderFn<T> = (item: T, index?: number) => ReactNode;

{/* 
Generics: <T,> specifies that For is a generic component that can work with any data type T.
Props:
render: A function of type RenderFn<T>, which will be applied to each item in the each array.
each: An array of items of type T. This array represents the data set that we want to iterate over. 
*/}
export const For = <T,>({
  render,
  each = [],
}: {
  render: RenderFn<T>;
  each?: T[];
}) => Children.toArray(each.map((item, index) => render(item, index)));

{/*
Purpose of Changes
The change to define For as a generic component using <T,> allows it to be flexible and work with any type of data. This approach enhances the component’s reusability, as it can handle arrays of various types without needing modifications.
Example Usage
When using <For>, you specify the type of items within the each array. Here’s an example:
type ILanguage = {
  icon: string;
  language: string;
  text: string;
};

const languages: ILanguage[] = [
  { icon: 'abjad-arabic', language: 'ar', text: 'العربية' },
  { icon: 'abjad-hebrew', language: 'he', text: 'עברית' },
  { icon: 'alphabet-latin', language: 'en', text: 'English' },
];

<For<ILanguage>
  each={languages}
  render={(lng, index) => (
    <div key={index}>
    </div>
  )}
/>

For<ILanguage> specifies that the array items are of type ILanguage.
TypeScript can now infer the structure of lng inside the render function, making it easy to access properties like lng.icon and lng.language.
*/}
