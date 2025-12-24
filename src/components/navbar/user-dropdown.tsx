'use client';

import { UserButton } from '@clerk/nextjs';

const UserDropdown = () => {
  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonOuterIdentifier: {
            color: 'white',
          },
        },
      }}
    />
  );
};

export default UserDropdown;
