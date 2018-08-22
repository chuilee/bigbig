(function(window, document, $, undefined) {
    "use strict";

    /**
     * 提交报名信息
     *
     * @method     goSubmit
     * @param      {string}  name     姓名
     * @param      {string}  company  公司名称
     * @param      {string}  duty     职位
     * @param      {number}  tel      电话
     * @param      {string}  email    邮箱
     * @param      {string}  member   邀请成员
     */
    function goSubmit(name, company, duty, tel, email, member) {
        var data = {
            company: company,
            duty: duty,
            email: email,
            member: member
        };
        //alert(JSON.stringify(data));
        //必须从URL参数中获取到资讯对应的ID
        var newsUid = getQueryString('id');
        if (newsUid === null || newsUid === '') {
            window.alert('无法获取到对应的资讯ID，请联系活动提供商。');
            return;
        }
        $.ajax({
            type: "post",
            url: 'http://api.lanmeihui.com.cn/api/PortalApi.aspx?action=CollectSignData',
            data: {
                id: newsUid,
                name: name,
                mobile: tel,
                data: JSON.stringify(data)
            },
            cache: false,
            success: function(data) {
                window.alert("您的信息已提交成功，如通过审核，我们将短信通知您参加，多谢您的参与！");
            }
        });
    }

    /**
     * 获取url查询字符串
     *
     * @method     getQueryString
     * @param      {string}  name    key
     * @return     {string}  value
     */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return window.unescape(r[2]);
        return null;
    }

    $(function() {

        var layout = document.querySelector("#layout");
        var pages = document.querySelectorAll(".page");
        var Height = layout.offsetHeight;
        var Width = layout.offsetWidth;
        var audio = document.querySelector("audio");
        var musicLogo = document.querySelector(".music-logo");
        var isStart = false;

        window.spHeight = Height;

        /**
         * 播放背景音乐
         *
         * @method     playMusic
         */
        function playMusic() {
            if (isStart === false) {
                musicLogo.classList.add("playing");
                audio.src = "video/bg.mp3";
                // audio.play();
            }
            isStart = true;
        }

        Z.onTap(musicLogo, function() {

            if (musicLogo.classList.contains("playing")) {
                audio.pause();
            }else {
                audio.play();
            }

            musicLogo.classList.toggle("playing");

        });

        window.setTimeout(function() {
            document.body.removeChild(document.querySelector(".page-loading"));
            document.getElementById("layout").style.display = "block";
            musicLogo.style.display = "block";
            lib.ScreenSystem(document.getElementById("layout"));
            playMusic();
        }, 0);

        $('#queding').on('click', function() {
            var name = $('#name').val();
            var company = $('#company').val();
            var duty = $('#duty').val();
            var tel = $('#tel').val();
            var email = $('#email').val();
            var member = $('#inviter').val();

            if (name === '' || company === '' || duty === '' || tel === '') {
                window.alert('请填写完整信息');
                return;
            } else if (email !== '') {
                var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if (!re.test(email)) {
                    window.alert('邮箱格式错误');
                    return;
                }
            }

            goSubmit(name, company, duty, tel, email, member);
        });
    });
})(window, document, Zepto);
