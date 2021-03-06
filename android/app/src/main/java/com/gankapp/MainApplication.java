package com.gankapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import io.realm.react.RealmReactPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cn.jpush.reactnativejpush.JPushPackage;   // <--   导入 JPushPackage

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

      // 设置为 true 将不会弹出 toast
      private boolean SHUTDOWN_TOAST = false;
      // 设置为 true 将不会打印 log
      private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new RealmReactPackage(),
            new RNI18nPackage(),
            new RNDeviceInfo(),
            new SvgPackage(),
            new VectorIconsPackage(),
            new RNCWebViewPackage(),
            new RNGestureHandlerPackage(),
            new CustomToastPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG) 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
