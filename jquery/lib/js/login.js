$(function(){
	loginCheck();
//	居中
	setHeight();
	$(window).resize(function(){
		setHeight();
	});
	
	//产生验证码
	$(".showCode").html(setIDcode);
	$(".showCode").click(function(){
		$(".showCode").html(setIDcode);
	});
	
	$("#confirmBtn").click(function(){
		location.href = "index.html";
	});
	
});


function setHeight(){
	var h = $(window).height()
	$(".container").css({
		height:h
	});
	$(".loginDiv").css({
		marginTop:h/4
	});
	if(h < 500){
		$(".loginDiv").css({
			marginTop:50
		});
	}
}

function setIDcode(){
	var codeType = ["num","bWord","sWord"];
	var posi = [];
	var codeCheck = "";
	for(var i =0; i < 6; i++){
		posi[i] = checkType(codeType,randomInt(0,2));
		if(posi[i] == 1){
			codeCheck += createNum();
		}
		else if(posi[i] == 2){
			codeCheck += createbWord();
		}
		else if(posi[i] == 3){
			codeCheck += createsWord();
		}
	}
	return codeCheck;
}

function randomInt (m, n) {
	return parseInt(Math.random() * (n - m + 1) + m);   // 5 10
}
function checkType(arr,n){
	if(arr[n] == "num"){
		return 1;
	}
	else if(arr[n] == "bWord"){
			return 2;
	}
	else if(arr[n] == "sWord"){
	return 3;
	}
}		
function createNum(){
	return String(randomInt (0, 9));
}		
function createbWord(){
			return String.fromCharCode(randomInt(65, 90));
}
function createsWord(){
	return String.fromCharCode(randomInt(97, 122));
}
	
function loginCheck(){
//	登录验证
	$("#loginForm").validate({
		rules:{
			username:{
				required:true,
				rangelength:[4,20]
			},
			password:{
				required:true,
				rangelength:[4,20]
			},
			idcode:{
				required:true
			}
		},
		messages:{
			username:{
				required:"用户名不能为空",
				rangelength:"用户名长度应为4-6位"
			},
			password:{
				required:"密码不能为空",
				rangelength:"密码长度应为6-10位"
			},
			idcode:{
				required:"验证码不能为空"
			}
		},
		unhighlight: function (element,error,errorClass) { //验证通过
            $(element).tooltip('destroy');
        },              
		errorPlacement: function (error,element) {
   			if ($(element).next("div").hasClass("tooltip")) {
                $(element).attr("data-original-title", $(error).text()).tooltip("show");
                
            } else {
                $(element).attr("title",$(error).text()).tooltip("show");
            }
        },
        submitHandler: function () {
        	$("[type='submit']").button("loading");
        	$.post('http://192.168.15.2/gz0820web/login',$("#loginForm").serializeArray(),function(data){
				console.log(data)
				console.log($("#loginForm").serializeArray())
				if(data.status != 1){
					$("[type='submit']").button("reset");
					$("#confirmBtn").css({display:"none"});
				}
				else{
					$("#confirmBtn").css({display:"inline"});
					setInterval(function(){
						location.href = "index.html";
					},5000);
				}
				$(".modal-body").text(data.msg);
				$(".modal").modal();
			},'json');
            return false;
        }  				
	});
}



