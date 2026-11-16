import React
import ReactAppDependencyProvider
import React_RCTAppDelegate
import UIKit

class SceneDelegate: RCTDefaultReactNativeFactoryDelegate, UIWindowSceneDelegate {
  var window: UIWindow?
  var reactNativeFactory: RCTReactNativeFactory?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene else {
      return
    }

    dependencyProvider = RCTAppDependencyProvider()
    reactNativeFactory = RCTReactNativeFactory(delegate: self)
    window = UIWindow(windowScene: windowScene)

    #if DEBUG
      let devMenuConfiguration = RCTDevMenuConfiguration(
        devMenuEnabled: true,
        shakeGestureEnabled: true,
        keyboardShortcutsEnabled: true
      )
      reactNativeFactory?.devMenuConfiguration = devMenuConfiguration
    #endif

    reactNativeFactory?.startReactNative(
      withModuleName: "ExampleLatest",
      in: window,
      connectionOptions: connectionOptions
    )

    // Re-add splash screen and remove it later when the app is fully loaded
    RCTNativeSplashScreenImpl().keepOn()
  }

  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    RCTLinkingManager.scene(scene, openURLContexts: URLContexts)
  }

  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    RCTLinkingManager.scene(scene, continue: userActivity)
  }

  override func bundleURL() -> URL? {
    #if DEBUG
      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
