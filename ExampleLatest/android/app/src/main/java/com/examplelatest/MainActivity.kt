package com.examplelatest

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.os.Bundle
import android.view.View
import androidx.core.animation.doOnEnd
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.nativeSplashScreen.NativeSplashScreenModule

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen().apply {
            setKeepOnScreenCondition { NativeSplashScreenModule.keepOn }
            setOnExitAnimationListener { screen ->
                val duration = 200L

                val zoomInX = ObjectAnimator.ofFloat(screen.iconView, View.SCALE_X, 1f, 5f)
                zoomInX.duration = duration

                val zoomInY = ObjectAnimator.ofFloat(screen.iconView, View.SCALE_Y, 1f, 5f)
                zoomInY.duration = duration

                val fadeOut = ObjectAnimator.ofFloat(screen.view, View.ALPHA, 1f, 0f)
                fadeOut.duration = duration

                AnimatorSet().apply {
                    playTogether(zoomInX, zoomInY, fadeOut)
                    doOnEnd { screen.remove() }
                    start()
                }
            }
        }
        super.onCreate(null)
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "ExampleLatest"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
