import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  test('renders without errors', () => {
    render(<Home />);
    // Assert that the component renders without throwing any errors
  });

  test('toggles edit profile modal', () => {
    render(<Home />);
    const editProfileButton = screen.getByText('Edit Profile');
    fireEvent.click(editProfileButton);
    const editProfileModal = screen.getByTestId('edit-profile-modal');
    expect(editProfileModal).toBeInTheDocument();
    fireEvent.click(editProfileButton);
    expect(editProfileModal).not.toBeInTheDocument();
  });

  test('updates user information', () => {
    render(<Home />);
    const photoInput = screen.getByLabelText('Photo');
    const nameInput = screen.getByLabelText('Name');
    const updateButton = screen.getByText('Update');
    fireEvent.change(photoInput, { target: { value: 'new-photo.jpg' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.click(updateButton);
    expect(photoInput.value).toBe('new-photo.jpg');
    expect(nameInput.value).toBe('John Doe');
  });

  test('toggles user selection', () => {
    render(<Home />);
    const selectButton = screen.getByText('Select');
    fireEvent.click(selectButton);
    expect(selectButton).toHaveTextContent('Deselect');
    fireEvent.click(selectButton);
    expect(selectButton).toHaveTextContent('Select');
  });
});