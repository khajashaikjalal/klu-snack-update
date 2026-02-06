import React, { useEffect } from 'react';
import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const AdBanner = () => {
    useEffect(() => {
        const initializeAdMob = async () => {
            // Only run on native platforms (Android/iOS)
            if (!Capacitor.isNativePlatform()) {
                return;
            }

            try {
                await AdMob.initialize({
                    requestTrackingAuthorization: true,
                    testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'], // Optional: Add real device IDs here for testing
                    initializeForTesting: true,
                });

                await AdMob.showBanner({
                    adId: 'ca-app-pub-3940256099942544/6300978111', // Android Test ID
                    adSize: BannerAdSize.ADAPTIVE_BANNER,
                    position: BannerAdPosition.BOTTOM_CENTER,
                    margin: 0,
                    isTesting: true,
                });
            } catch (error) {
                console.error('AdMob initialization failed:', error);
            }
        };

        initializeAdMob();

        // Cleanup: Hide banner when component unmounts
        return () => {
            if (Capacitor.isNativePlatform()) {
                AdMob.hideBanner().catch(err => console.error("Failed to hide banner", err));
            }
        };
    }, []);

    // The banner is an overlay, so this component doesn't render DOM elements.
    // However, we can return a spacer div if we wanted to push content up, 
    // but it's often safer to handle that in the layout to match the overlay size.
    return null;
};

export default AdBanner;
