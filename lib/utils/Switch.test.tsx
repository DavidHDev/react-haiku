import { render } from '@testing-library/react';
import { Switch } from './Switch';

const ComponentA       = () => <div>Component A</div>;
const ComponentB       = () => <div>Component B</div>;
const DefaultComponent = () => <div>Default Component</div>;

enum TestCases {
    A = 'a',
    B = 'b',
    DEFAULT = 'default'
}

const renderSwitch = (value: TestCases) => {
    return render(
        <Switch
            value={value}
            components={{
                [TestCases.A]: ComponentA,
                [TestCases.B]: ComponentB
            } as any}
            defaultComponent={DefaultComponent}
        />
    );
};

describe('Switch Component', () => {
    it('should render the correct component based on value', () => {
        const { getByText, asFragment } = renderSwitch(TestCases.A);
        expect(getByText('Component A')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render the default component if value does not match any case', () => {
        const { getByText, asFragment } = renderSwitch(TestCases.DEFAULT);
        expect(getByText('Default Component')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
});