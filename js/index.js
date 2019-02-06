$(function () {
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
        wolfTimer.stop();
    });
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        processHandle();
        startWolfAnimation();
    });
    $(".restart").click(function () {
        $(".over").stop().fadeOut(100);
        processHandle();
        startWolfAnimation();
    });

    var wolfTimer;
    var wolf_1;
    var wolf_2;
    var arrPos;

    function startWolfAnimation() {
        wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png',
            './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'];
        wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png',
            './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'];
        arrPos = [
            {left: "100px", top: "115px"},
            {left: "190px", top: "142px"},
            {left: "20px", top: "160px"},
            {left: "105px", top: "193px"},
            {left: "202px", top: "212px"},
            {left: "19px", top: "221px"},
            {left: "120px", top: "275px"},
            {left: "30px", top: "295px"},
            {left: "209px", top: "297px"}
        ];
        var $wolfImg = $("<img src='' class='wolf'>");
        var posIndex = Math.floor(Math.random() * 9);
        $wolfImg.css({
            position: "absolute",
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top
        });
        window.wolfType = Math.floor(Math.random() * 2) == 0 ? wolf_1 : wolf_2;
        window.wolfIndex = 0;
        window.wolfEnd = 5;
        wolfTimer = setInterval(function () {
            if (wolfIndex <= wolfEnd) {
                $wolfImg.attr("src", wolfType[wolfIndex++]);
            } else {
                $wolfImg.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
        }, 100);
        $(".container").append($wolfImg);
        runGame($wolfImg);
    }

    function runGame($wolfImg) {
        $wolfImg.one("click", function () {
            window.wolfIndex = 5;
            window.wolfEnd = 9;
            if (window.wolfType == wolf_1) {
                $(".score").text(parseInt($(".score").text()) + 10);
            } else {
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }

    function stopWolfAnimation() {
        clearInterval(wolfTimer);
        $(".wolf").remove();
    }

    function processHandle() {
        $(".process").css({width: 180});
        var timer = setInterval(function () {
            var width = $(".process").width();
            width -= 0.03;
            if (width >= 0) {
                $(".process").css({width: width});
            } else {
                clearInterval(timer);
                stopWolfAnimation();
                $(".over").stop().fadeIn(100);
            }
        }, 10);
    }

});