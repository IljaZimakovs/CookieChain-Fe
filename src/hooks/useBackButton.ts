// /hooks/useBackButton.ts
'use client';

import { useEffect } from 'react';
import { initBackButton } from '@telegram-apps/sdk-react';
import { useRouter } from 'next/navigation';

export function useBackButton() {
  const router = useRouter();

  useEffect(() => {
    const [backButton, cleanup] = initBackButton();

    // Show the back button
    backButton.show();

    // Function to handle the back button press event
    const handleBackButtonPress = () => {
      router.back(); // Navigate to the previous page
    };

    // Subscribe to the back button press event
    backButton.on('click', handleBackButtonPress);

    return () => {
      // Hide the back button and unsubscribe from the event when the component is unmounted
      backButton.off('click', handleBackButtonPress);
      backButton.hide();
      cleanup();
    };
  }, [router]);
}
