import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategoriesTable from './CategoriesTable';

describe('CategoriesTable', () => {
    test('it should mount', () => {
        render(<CategoriesTable />);
        
        const categoriesTable = screen.getByTestId('CategoriesTable');
    
        expect(categoriesTable).toBeInTheDocument();
    });
    });