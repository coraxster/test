<link rel="stylesheet" type="text/css" href="engine/consultant.css">
<link rel="stylesheet" type="text/css" href="engine/animate.min.css">

<div class="consult animated fadeIn">
	<div id="consult-head">������ ������</div>
	<div id="pin"></div>
    <form id="consult-online">
	    <div id="consult-offlinemessage">
		    <p id="consult-offlinep">� ��������� ��� ��������� ����������. �������� ��������� � �� ������� ���, ��� ������ ��������� ��������.</p>
		    <textarea name="offlinemessage" id="consult-offlinetext" placeholder="������� ���������" fixed></textarea>
		    <input  type="text" id="consult-offlinemail" placeholder="��� email ��� �����">
            <div id="consult-offlinesendmes">���������</div>
		 </div>
	    <div id="consult-namebox"><img id="consult-photo" src="images/cons/def.png">  <p id="consult-name">�����������</p></div>
	    <div id="consult-listbox"></div>
	    <textarea name="message" id="consult-message" placeholder="������� ��������� � ������� Enter" fixed></textarea>
        <div class="consult-but" id="consult-sendmes">���������</div><br>
    </form>
</div>
<audio id="chatAudio"><source src="engine/notify.ogg" type="audio/ogg"><source src="engine/notify.mp3" type="audio/mpeg"><source src="engine/notify.wav" type="audio/wav"></audio>
<script src="engine/consultant.js"></script>