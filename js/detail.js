$(document).ready(function() {
    // 缓存jQuery选择器
    const $prev = $('.prev');
    const $next = $('.next');
    const $ul = $('.spec-items ul');
    const $lis = $('.spec-items ul li');
    const $mainImg = $('.img');
    const $thumbImgs = $('.spec-items img');
    const $zoomContainer = $('.main-img');
    const $zoomPup = $('.zoom-pup');
    const $zoomDiv = $('.zoom-div');
    const $bigImg = $('.zoom-div img');
    const $reduce = $('.reduce');
    const $add = $('.add');
    const $buyNum = $('.buy-num');
    const $styleItems = $('#choose-attr-1 .item');
    const $skuName = $('.sku-name');
    const baseTitle = '海贼王五档追月奔月尼卡路飞手办模型';

    // 图片导航按钮事件
    $prev.click(function() {
        $ul.css('left', '0');
        $(this).css('background', 'url(images/disabled-prev.png)');
        $next.css('background', 'url(images/sprite.png) -46px 0');
    });

    $next.click(function() {
        $ul.css('left', '-216px');
        $(this).css('background', 'url(images/disabled-next.png)');
        $prev.css('background', 'url(images/sprite.png) 0 0');
    });

    // 缩略图切换事件
    $lis.on('mouseover', function() {
        const $this = $(this);
        const index = $this.index();
        
        $lis.removeClass('img-hover');
        $this.addClass('img-hover');
        
        const newSrc = $thumbImgs.eq(index).attr('src');
        $mainImg.attr('src', newSrc);
        $bigImg.attr('src', newSrc);
    });

    // 放大镜效果
    $zoomContainer.hover(
        function() {
            $zoomPup.show();
            $zoomDiv.show();
        },
        function() {
            $zoomPup.hide();
            $zoomDiv.hide();
        }
    );

    $zoomContainer.mousemove(function(e) {
        const offset = $(this).offset();
        const pupWidth = $zoomPup.width();
        const pupHeight = $zoomPup.height();
        const containerWidth = $(this).width();
        const containerHeight = $(this).height();

        let top = e.pageY - offset.top - pupHeight / 2;
        let left = e.pageX - offset.left - pupWidth / 2;

        top = Math.max(0, Math.min(top, containerHeight - pupHeight));
        left = Math.max(0, Math.min(left, containerWidth - pupWidth));

        $zoomPup.css({
            top: top,
            left: left
        });

        const yRatio = top / (containerHeight - pupHeight);
        const xRatio = left / (containerWidth - pupWidth);
        
        $bigImg.css({
            top: -(yRatio * (800 - 540)),
            left: -(xRatio * (800 - 540))
        });
    });

    // 购买数量调整
    $add.click(function() {
        let currentVal = parseInt($buyNum.val());
        $buyNum.val(++currentVal);
        $reduce.removeClass('disabled');
    });

    $reduce.click(function() {
        let currentVal = parseInt($buyNum.val());
        if (currentVal > 1) {
            $buyNum.val(--currentVal);
            if (currentVal <= 1) {
                $(this).addClass('disabled');
            }
        }
    });

    // 修改主图和放大镜图片的样式，确保尺寸正确
    $mainImg.css({
        'width': '350px',
        'height': '350px',
        'object-fit': 'contain'
    });

    $bigImg.css({
        'width': '800px',
        'height': '800px',
        'object-fit': 'contain'
    });

    // 款式选择 - 使用款式图片直接显示
    $('#choose-attr-1').on('click', '.item', function(e) {
        e.preventDefault();
        
        const $this = $(this);
        $styleItems.removeClass('selected');
        $this.addClass('selected');
        
        // 获取选中的款式名称和图片
        const selectedStyle = $this.find('i').text().trim();
        const styleSrc = $this.find('img').attr('src');
        
        // 更新商品标题
        const newTitle = `${baseTitle} ${selectedStyle}`;
        $skuName.fadeOut(200, function() {
            $(this).text(newTitle).fadeIn(200);
        });

        // 直接使用款式图片更新主图和放大镜
        if (styleSrc) {
            $mainImg.attr('src', styleSrc).hide().fadeIn(300);
            $bigImg.attr('src', styleSrc);
        }
    });

    // 初始化：默认选中第一个款式并设置图片尺寸
    $styleItems.first().trigger('click');
});