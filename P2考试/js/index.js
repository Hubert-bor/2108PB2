var userName = document.getElementById("userName");
var userTel = document.getElementById("userTel");
var pingJia = document.getElementById("pingJia");
var add = document.getElementById("add");

window.onload = function() {
	var arr = getLocalData();
	showPage(arr);
}

//添加
add.onclick = function() {
	var arr = getLocalData();
	var obj = {
		userName: userName.value,
		phone: userTel.value,
		grade: pingJia.value,
		id: +new Date()
	}
	if(!userName.value){
		var info = document.getElementById("info");
		info.style.display="block";
		setTimeout(function(){
			info.style.display="none";
		},3000)
		return;
	}
	arr.push(obj);
	console.log(obj);
	updateLocalData(arr);
	showPage(arr);
}

//获取本地数据
function getLocalData() {
	if (!localStorage.P2) {
		localStorage.P2 = '[]';
	}
	var str = localStorage.P2;
	return JSON.parse(str);
}


//提交本地数据
function updateLocalData(arr) {
	localStorage.P2 = JSON.stringify(arr);
}
//渲染
function showPage(arr){
	var hongxinP = document.getElementById("hongxinP");
	var xin = document.querySelectorAll("hongxinP>img");
	var str1 = '<img src="./img/0.png">';
	var str2 = '<img src="./img/1.png">';
	

	var str = '';
	var tab = document.getElementById("tab");
	for(var i = 0;i<arr.length;i++){
		str+=`
			<tr>
				<td>${i+1}姓名：${arr[i].userName}</td>
			</tr>
			<tr>
				<td>手机号：${arr[i].phone}</td>
			</tr>
			<tr>
				<td id="hongxinP">评价:
					${aiXin(arr[i].grade)}
				</td>
			</tr>
			<tr>
				<td>上传时间：${timer(arr[i].id)}</td>
			</tr>
			<tr>
				<td>
					<button type="button" onclick=moveD(${arr[i].id})>上移</button>
					<button type="button" onclick=del(${arr[i].id})>删除</button>
					<button type="button" onclick=move(${arr[i].id})>下移</button>
				</td>
			</tr>
			
		`;
	}
	tab.innerHTML=str;
}
//删除
function del(id){
	var f = confirm("确定要删除吗？");
	if(!f){
		return;
	}
	var arr = getLocalData();
	for(var i = 0;i<arr.length;i++){
		if(arr[i].id==id){
			arr.splice(i,1);
			break;
		}
	}
	updateLocalData(arr);
	showPage(arr);
}

//爱心函数
function aiXin(num){
	var kong = '<img src="./img/0.png">';
	var shi = '<img src="./img/1.png">';
	if(num/1>=5){
		return shi+shi+shi+shi+shi;
	}else if(num<=0){
		return kong+kong+kong+kong+kong;
	}
	if(num==1){
		return shi+kong+kong+kong+kong;
	}
	if(num==2){
		return shi+shi+kong+kong+kong;
	}
	if(num==3){
		return shi+shi+shi+kong+kong;
	}
	if(num==4){
		return shi+shi+shi+shi+kong;
	}
	if(num==5){
		return shi+shi+shi+shi+shi;
	}
	
	
}

//上下移动
function move(id){
	var arr = getLocalData();
	var a = null;
	for(var i=0;i<arr.length;i++){
		if(id==arr[i].id){
			a=arr[i];
			arr[i] = arr[i+1];
			arr[i+1] = a;
			break;
		}
	}
	showPage(arr);
	updateLocalData(arr);
}
function moveD(id){
	var arr = getLocalData();
	var a = null;
	for(var i=0;i<arr.length;i++){
		if(id==arr[i].id){
			a=arr[i];
			arr[i] = arr[i-1];
			arr[i-1] = a;
			break;
		}
	}
	showPage(arr);
	updateLocalData(arr);
}
//时间函数

function timer(time){
	// console.log(time);
	var d = new Date(time);
	var year = d.getFullYear();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var hours = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	return year+"-"+buling(month)+"-"+buling(day)+"  "+buling(hours)+":"+buling(minute)+":"+buling(second);
	
}

//补零函数
function buling(time){
	 return time<10?"0"+time:time;
}