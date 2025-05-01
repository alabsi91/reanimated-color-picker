//
//  RCTNativeSplashScreen.mm
//  ExampleLatest
//

#import "RCTNativeSplashScreen.h"
#import "ExampleLatest-Swift.h"

@implementation RCTNativeSplashScreen

RCT_EXPORT_MODULE(NativeSplashScreen) // Export module to Objective-C runtime

// Create an instance of the Swift class
RCTNativeSplashScreenImpl *nativeSplashScreen =
    [[RCTNativeSplashScreenImpl alloc] init];

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeSplashScreenSpecJSI>(params);
}

#pragma mark - Swift Splash Screen Methods

- (void)hide {
  [nativeSplashScreen hide]; // Call Swift method
}

@end
