var valueB = document.getElementById('valueB');
var createB = document.getElementById('createB');
var qrdown = document.getElementById('qrdown');
var sharevalue = valueB.value;

var valueget = document.getElementById('valueget');
var valuecopy = document.getElementById('valuecopy');

//変数宣言
var shareconv = '';
var getvalue = null;

//一部要素を隠す
$('.Black').hide();
$('.QRcreate').hide();
$('.QRload').hide();


//QRコード生成
function createQR(){
    sharevalue = valueB.value;
    sharevalue = encodeURI(sharevalue);
    shareconv = location.protocol + '//' + location.host + location.pathname + '?value=' + sharevalue;
    //var shareconv = 'https://neyatetsu.com' + '?value=' + sharevalue;
    //alert(shareconv);
    $('#qrcode canvas').remove();
    $('#qrcode').qrcode({width: 256,height: 256,text: shareconv});
    $('#qrcode canvas').attr('id','qr');
    $('.Black').fadeIn(700);
    $('.QRcreate').fadeIn(700);
}
createB.onclick = createQR;

//QRコードダウンロード
function QRdownload(){
    var downimg = document.createElement('a');
    downimg.href = document.getElementById('qr').toDataURL('image/png');
    downimg.download = 'QR-share.png';
    downimg.click();
}
qrdown.onclick = QRdownload;

//閉じる
function windowClose(){
    $('.Black').fadeOut(700);
    $('.QRcreate').fadeOut(700);
    $('.QRload').fadeOut(700);
}


//即時実行
(function(){
    getvalue = new URL(window.location.href).searchParams.get('value');
    if(getvalue != null){
        $('.Black').show();
        $('.QRload').show();
        getvalue = decodeURI(getvalue);
        valueget.value = getvalue;
    }
}());

//文字列をコピー
function copyvalue(){
    valueget.select();
    document.execCommand("copy");
    document.getElementById('copied').innerText = 'コピーしました'
}
valuecopy.onclick = copyvalue;