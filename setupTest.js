import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/react';
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });
