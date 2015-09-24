var toggler = 0,
    online = 0,
    temp = 0,
    new_mes = 0;

$(document).ready(function(){
	$.get(
        "consultant_chat_start.php",
        {
	        action:'operator_status',
        },
        GotFirstStatus,"text"
    ).error(function() { $('#consult').hide(); });
    function GotFirstStatus(data){
	    if (data != "offline"){
		    online=1;
		    $('#consult-namebox').html(data);
		    $('#consult-offlinemessage').hide();
		    $('#pin').css('background','#20d620');
	    }
	    if ($.cookie('my_key_2')){
		     var AutoAupdaterID = setInterval('AutoApdater()', 3000); //������ ����-����������
	    } else {
		    $(".consult").hide();
	    }
	    

	}
$('.consult').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){$(".consult").removeClass("fadeIn");});
});


//---------------------------------���� �� ����� ������������ ---------------------------------
$("#consult-head").click(function OpenConsult(){	
	if (toggler == 0){
		GetList(); //�������� ������ ���������
		toggler = 1;
	} else{
		toggler = 0;
	}
	$("#consult-online").slideToggle(200); //���������� ���
})
//----------------------------------------------------------------------------------------------


//---------------------------------���������� ������ ���������----------------------------------
function GetList(){
	$.get(
        "consultant_chat_ok.php",
        {},
        GotList,"text"
    );
}
function GotList(data){
	    $("#consult-listbox").html(data);
	    $("#consult-listbox").scrollTop(99999999999);
	    $("#consult-listbox").linkify();    //������������ ������
	    $.get(                //������ ���������
            "consultant_chat_ok.php",
             {
	         action:'operator_status',
             },
             GotTempStatus,"text"
            );
            function GotTempStatus(data){
	            if (data != "offline"){
		            online = 1;
		            $('#consult-namebox').html(data);
		            $('#consult-offlinemessage').hide();
		            $('#pin').css('background','#20d620');	            
		        };
		        if (data == "offline"){
			        online = 0;
		            $('#consult-offlinemessage').show();
		            $('#pin').css('background','#d72020');
		        }
	        }

}
//----------------------------------------------------------------------------------------------


//---------------------------------�������� ���������-------------------------------------------
$("#consult-sendmes").click(function(){
	SendMsg();
})

$("#consult-message").keypress(function(e) {
    if(e.which == 13) {
	    e.preventDefault();
        SendMsg();
    }
})

function SendMsg(){
	var msg = $("#consult-message").val();
	if  (msg) {
			$.post(
	        "consultant_chat_ok.php?action=addmsg",
	        {
	         msg:msg,
	        },
	        SentMsg,"text"
        );
    }    
    
    function SentMsg(data){
	    if (data == "ok"){
		    GetList();
            $("#consult-message").addClass("animated fadeOutUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){$("#consult-message").val("").removeClass("fadeOutUp").addClass("fadeIn");}); //�������� �������� ���������
	    }
    }
}

//----------------------------------------------------------------------------------------------


//---------------------------------�������� offine ���������-------------------------------------------
$("#consult-offlinesendmes").click(function(){
	SendOfflineMsg();
})

function SendOfflineMsg(){
	var msg = $("#consult-offlinetext").val();
	var email = $("#consult-offlinemail").val();
	
	if (!msg){
		$("#consult-offlinetext").addClass("animated flash").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){$("#consult-offlinetext").removeClass("flash");});
	}
	if (!msg){
		$("#consult-offlinemail").addClass("animated flash").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){$("#consult-offlinemail").removeClass("flash");});
	}
	

	if  (msg) {
			$.post(
	        "consultant_chat_ok.php?action=addmsgemail",
	        {
	         msg:msg,
	         email:email,
	        },
	        SentOfflineMsg,"text"
        );
    }    
    
    function SentOfflineMsg(data){	   
	    $("#consult-offlinesendmes").addClass("animated bounceOutUp");
	    $("#consult-offlinetext").addClass("animated bounceOutUp");
	    $("#consult-offlinemail").addClass("animated bounceOutUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	        $("#consult-offlinep").text("���� ��������� ����������, � ��������� ����� ���� ����������� �������� � ����.");
	        $("#consult-offlinesendmes").hide();
	        $("#consult-offlinetext").hide();
	        $("#consult-offlinemail").hide();
	        });
	    
        
    }
}

//----------------------------------------------------------------------------------------------


//---------------------------------��������������-----------------------------------------------

function AutoApdater(){
	$.get(
        "http://vivt.ru/consultant_chat_ok.php",
        {
        action:"status",
        },
        GotStatus,"text"
    ).error(function() { $('#consult').hide(); });
    function GotStatus(data){
	    //alert(data);
	    if (data == 1) {
		    $('#chatAudio')[0].play(); //������ ����, ���� �������� ���������
		    if (toggler == 0){                            //���� ����������� ������
		        $(".consult").addClass("bounce").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){$(".consult").removeClass("bounce");});
	        } else{
		        GetList();
		    }
	    };
	    if (data == "offline"){   //���� ��������, ��� ��� ���������
		    online = 0;
		    $('#consult-offlinemessage').show();
		    $('#pin').css('background','#d72020');      
	    } else {                     //���� ��������, ��� ����������� ����
		    online = 1;
		    $('#consult-offlinemessage').hide();
		    $('#pin').css('background','#20d620');
	    }
    }
}

//----------------------------------------------------------------------------------------------


//---------------------------------������� ������������� ������--------------------------------

(function($){
  var url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
      url2 = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g,

      linkifyThis = function () {
        var childNodes = this.childNodes,
            i = childNodes.length;
        while(i--)
        {
          var n = childNodes[i];
          if (n.nodeType == 3) {
            var html = $.trim(n.nodeValue);
            if (html)
            {
              html = html.replace(/&/g, '&amp;')
                         .replace(/</g, '&lt;')
                         .replace(/>/g, '&gt;')
                         .replace(url1, '$1<a href="http://$2">$2</a>$3')
                         .replace(url2, '$1<a href="$2">$2</a>$5');
              $(n).after(html).remove();
            }
          }
          else if (n.nodeType == 1  &&  !/^(a|button|textarea)$/i.test(n.tagName)) {
            linkifyThis.call(n);
          }
        }
      };
  $.fn.linkify = function () {
    return this.each(linkifyThis);
  };
})(jQuery);

//----------------------------------------------------------------------------------------------
