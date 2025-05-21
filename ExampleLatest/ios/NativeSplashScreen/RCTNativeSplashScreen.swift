//
//  RCTNativeSplashScreen.swift
//  ExampleLatest
//

import SwiftUI
import UIKit

@objcMembers
class RCTNativeSplashScreenImpl: NSObject {
  private static var spView: UIView?

  // Helper function to get the main window
  private func getMainWindow() -> UIWindow? {
    return
      UIApplication.shared.connectedScenes
      .compactMap { $0 as? UIWindowScene }
      .flatMap { $0.windows }
      .first { $0.isKeyWindow }
  }

  // Helper function to get splash screen view
  private func getSplashScreenView() -> UIView? {
    return UIStoryboard(name: "LaunchScreen", bundle: nil)
      .instantiateInitialViewController()?.view
  }

  // Re-add splash screen
  func keepOn() {
    guard let mainWindow = getMainWindow() else { return }

    // Create a hosting controller with the splash screen
    let splashHostingController = UIHostingController(
      rootView: SplashScreenView())

    // Configure the hosting controller's view
    splashHostingController.view.backgroundColor = .clear  // Ensure transparency
    splashHostingController.view.frame = UIScreen.main.bounds
    splashHostingController.view.autoresizingMask = [
      .flexibleWidth, .flexibleHeight,
    ]
    mainWindow.addSubview(splashHostingController.view)

    RCTNativeSplashScreenImpl.spView = splashHostingController.view
  }

  func hide() {
    DispatchQueue.main.async {
      guard let launchScreen = RCTNativeSplashScreenImpl.spView else { return }

      // fade-out
      UIView.animate(
        withDuration: 0.3,
        animations: { launchScreen.alpha = 0.0 }
      ) { _ in
        launchScreen.removeFromSuperview()
      }
    }
  }
}
