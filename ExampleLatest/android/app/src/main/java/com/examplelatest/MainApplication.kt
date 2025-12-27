package com.examplelatest

import android.app.Application
import com.nativeSplashScreen.NativeSplashScreenPackage
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.common.assets.ReactFontManager
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost

class MainApplication : Application(), ReactApplication {

    override val reactHost: ReactHost by lazy {
        getDefaultReactHost(
            context = applicationContext,
            packageList =
                PackageList(this).packages.apply {
                    // Packages that cannot be auto linked yet can be added manually here, for example:
                    // add(MyReactNativePackage())
                    add(NativeSplashScreenPackage())
                }
        )
    }

    override fun onCreate() {
        super.onCreate()
        ReactFontManager.getInstance().addCustomFont(
            this, "Quicksand", R.font.quicksand
        )
        loadReactNative(this)
    }
}
