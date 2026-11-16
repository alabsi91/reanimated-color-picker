require('react-native-gesture-handler/jestSetup');
require('react-native-reanimated').setUpTests();

jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);
jest.mock('./specs/NativeSplashScreen', () => ({ hide: jest.fn() }));
