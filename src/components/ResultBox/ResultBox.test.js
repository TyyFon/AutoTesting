import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
      });
    it('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: '100', convert: '$28.57'},
            { amount: '200', convert: '$57.14'},
            { amount: '455', convert: '$130.00'},
        ]  
        
        for (const testObj of testCases) {
            render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`PLN ${testObj.amount}.00 = ${testObj.convert}`);
            cleanup()
            }
        }
    )
    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: '100', convert: 'PLN 350.00'},
            { amount: '200', convert: 'PLN 700.00'},
            { amount: '455', convert: 'PLN 1592.50'},
        ]  
        
        for (const testObj of testCases) {
            render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(` $${testObj.amount}.00 = ${testObj.convert}`);
            cleanup()
            }
        }
    )
    it('should render proper info about conversion when PLN -> PLN', () => {
        const testCases = [
            { amount: '100', convert: 'PLN 100' },
            { amount: '250', convert: 'PLN 250' },
        ];

        for (const testObj of testCases) {

            render(<ResultBox from="PLN" to="PLN" amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`PLN ${testObj.amount}.00 = ${testObj.convert}`);
            cleanup()
        }
    });
    it('should render "Wrong value" if amount is lower then 0', () => {
        const testCases = [
            { amount: '-1', from: 'PLN', to: 'PLN' },
            { amount: '-10', from: 'PLN', to: 'PLN' },
            { amount: '-125', from: 'PLN', to: 'PLN' },
            { amount: '-1', from: 'USD', to: 'USD' },
            { amount: '-10', from: 'USD', to: 'USD' },
            { amount: '-125', from: 'USD', to: 'USD' },
            { amount: '-1', from: 'PLN', to: 'USD' },
            { amount: '-10', from: 'PLN', to: 'USD' },
            { amount: '-125', from: 'PLN', to: 'USD' },
            { amount: '-1', from: 'USD', to: 'PLN' },
            { amount: '-10', from: 'USD', to: 'PLN' },
            { amount: '-125', from: 'USD', to: 'PLN' },
        ];

        for (const testObj of testCases) {

            render(<ResultBox 
                from={testObj.from} 
                to={testObj.to} 
                amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent('Wrong value');
            cleanup()
        }
    });
});