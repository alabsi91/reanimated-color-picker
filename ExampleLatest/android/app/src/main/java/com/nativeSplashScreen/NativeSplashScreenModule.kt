package com.nativeSplashScreen

import com.facebook.react.bridge.ReactApplicationContext

class NativeSplashScreenModule(reactContext: ReactApplicationContext) :
    NativeSplashScreenSpec(reactContext) {

    override fun getName() = NAME

    override fun hide() {
        keepOn = false
    }

    companion object {
        const val NAME = "NativeSplashScreen"
        var keepOn = true
    }
}