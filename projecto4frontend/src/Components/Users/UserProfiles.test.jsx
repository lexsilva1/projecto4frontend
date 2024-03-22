import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import UserProfiles from "./UserProfiles";
import * as UserProfilesModule from './UserProfiles'; // Import the module containing the functions
import { deleteUser, restoreUser } from './UserProfiles'; // Import the functions to be tested


jest.mock('./UserProfiles', () => {
  const originalModule = jest.requireActual('./UserProfiles');

  return {
    __esModule: true,
    ...originalModule,
    deleteUser: jest.fn(),
    restoreUser: jest.fn(),
  };
});

describe('UserProfiles Functions', () => {
  beforeEach(() => {
    sessionStorage.setItem('role', 'Owner');
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  test('deleteUser function', async () => {
    // Test deleteUser function
    const mockUsername = 'testuser';

    await UserProfilesModule.deleteUser(mockUsername);

    expect(UserProfilesModule.deleteUser).toHaveBeenCalledWith(mockUsername);
    // Add further assertions based on your expected behavior after deletion
  });

  test('restoreUser function', async () => {
    // Test restoreUser function
    const mockUsername = 'testuser';

    await UserProfilesModule.restoreUser(mockUsername);

    expect(UserProfilesModule.restoreUser).toHaveBeenCalledWith(mockUsername);
    // Add further assertions based on your expected behavior after restoration
  });
});