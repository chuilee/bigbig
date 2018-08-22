/**
 * 获取客户端浏览器的一些信息
 */
    var browser = { 
        versions: function() { 
            var u = navigator.userAgent, app = navigator.appVersion; 
            return {//移动终端浏览器版本信息 
                trident: u.indexOf('Trident') > -1, //IE内核 
                presto: u.indexOf('Presto') > -1, //opera内核 
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端 
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器 
                iPad: u.indexOf('iPad') > -1, //是否iPad 
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部 
                window: u.indexOf('Window') > -1 || u.indexOf('window') > -1
            }; 
        }(), 
        language: (navigator.browserLanguage || navigator.language).toLowerCase() 
    }
    
    function getInfo(){
        return browser;
    }
    /**
     *  0 未知
        1 iphone
        2 android
        3 ipad
        4 whidows phone
        5 andriod平板
        6 智能TV
     */
    function getInforParamStr(){
        var devicetype = 0;
        var os = '';
        if(browser.versions.iPhone){
            devicetype = 1;
            os = 'ios';
        }else if (browser.versions.android){
            devicetype = 2;
            os = 'android';
        }else if(browser.versions.iPad){
            devicetype = 3;
            os = 'ios';
        }else if(browser.versions.window && browser.versions.mobile){
            devicetype = 4;
            os = 'windowsphone';
        }else if (browser.versions.ios){
            devicetype = 0; //未知
            os = 'ios';
        }
        return 'devicetype='+devicetype+'&os='+os+'&sh='+window.screen.availHeight
            +'&sw='+window.screen.availWidth;
    }
