	var User = {};  //用户个人信息对象
	var TeacherList = [];  //被评价人列表
	var Host = 'http://10.10.106.150:8080/jeecg-framework/'; 
	//登录ajax请求
	$('#login-btn').click(function(){

		User.userId = $('#username').val();
		User.userPW = $('#password').val();
		console.log(User);

		$.ajax({  
			headers: { 
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
			url: Host + "weChatController.do?/login",
			type : "POST",
			// crossDomain: true,
			"dataType" : "json",
			"data" : {
				"username" : User.userId,
				"password" : User.userPW
			},
			complete : function(data){
				console.log(data.status);
				if(data.status == '200') {  //登录成功时获取个人信息及被评价人列表
					console.log(data);
					$.ajax({
						headers: { 
						        'Accept': 'application/json',
						        'Content-Type': 'application/json' 
						    },
						url: Host+"weChatController.do?getMyPersonInfo",
						"type" : "GET",
						"dataType" : "json",
						"data" : {
							"username" : User.userId
						},
						complete: function(data) {
							console.log(data.status);
							if(data.status == '200') {
								console.log(data);
								// User.userId = data.username;
								// User.userName = data.user_Autonym;
								// User.userType = data.user_Type;
								// User.userSystenType = data.user_Roles;
								// $.each(data.teacherList,function(){
									// $('#TeacherInfo').append('<tr><td>'+this.teacherName+'</td><td>'+this.teacherNo+'</td><td>'+this.teacherType+'</td></tr>');
									// TeacherList.push({"teacherName":this.teacherName,"teacherNo":this.teacherNo,"teacherType":this.teacherType });
								// });
							}
						}
					});
				}
			 // : function(error) {
			 	if(data.status == '400') {
			 		// alert('fuwuqi');
			 		$('form').append('服务器错误');
			 	}
				if(data.status == '404') {
					$('form').append('用户不存在！');

				}
				if(data.status == '401') {
					$('form').append('密码错误！');

				}
				if(data.status == '403') {
					$('form').append('禁止访问！');

				}

			}
		});
		});

	//获取用户个人信息及被评价人列表ajax请求
	$('#getMyPersonalInfo').click(function(){	
							
					//获取个人信息并渲染页面
					$('#info_username').html(User.userId);
					$('#info_name').html(User.userName);
					$('#info_type').html(User.userType);
					$('#info_systemType').html(User.userSystenType);
					//获取被评价人信息存入数组并渲染页面
					$.each(TeacherList,function(){
						$('#TeacherInfo').append('<tr><td>'+this.teacherName+'</td><td>'+this.teacherNo+'</td><td>'+this.teacherType+'</td></tr>');
					});
	});

	//打开评价页面时填充被评价人信息
	$('#getComments').click(function(){
		$.each(TeacherList,function(){
			$('#comments-table').append('<tr><td>'+TeacherList.teacherNo+'</td><td>'+TeacherList.teacherName+'</td><td>'+TeacherList.teacherType+'</td><td><input type=\'number\'></td><tr>');

		});
	});
	//提交评价ajax请求
	$('#push-comments').click(function(){
		var trs = $('#comments-table input');
		//创建数据容器
		var tNos = [];
		var tScores = [];
		var tNames = [];
		var tTypes = [];
		trs.each(function(){
			var x = $(this).val();
			tScores.push(x);
		});

		//数据填充
		$.each(TeacherList,function(){
			tNos.push(this.teacherNo);
			tNames.push(this.teacherName);
			tTypes.push(this.teacherType);
		});
		//评价提交
		$.post(Host+'/ensureRecords',
			{
				"tnos" : tNos,
				"tscores" : tScores,
				"tnames" : tNames,
				"ttypes" : tTypes
			},
			function(data){
				if(data.status === '200') {
					$('#comments-table').append('评价成功！');
				}
				else {
					$('#comments-table').append('评价失败！');
				}
			});
	});


