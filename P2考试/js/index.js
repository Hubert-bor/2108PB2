var userName = document.getElementById("userName");
var userTel = document.getElementById("userTel");
var pingJia = document.getElementById("pingJia");
var add = document.getElementById("add");


//页面加载之后获取最新的数据，并把获取到的数据渲染到页面中
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

		//添加延时器，三秒之后把当前的DOM对象进行隐藏，如果弹出提示框，则return，终止此次事件
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
/* 
	实现原理：
		渲染页面定义一个函数，传入评分的数值
		aiXin()拿到评分之后进行判断：
			大于5全部为实心
			小于5全部为空心

			0-5之间的数值：
				用判断分别拼接成5个小爱心的DOM结构
			
		返回拼接完成的小爱心DOM样式，页面渲染
*/
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
/* 
	在渲染页面中直接绑定上移和下移的事件
	需要传入一个id，通过id进行定位当前的对象，直接通过下标进行操作上下移动

	实现原理:
		运用变量互换位置的形式进行数组中的位置互换
		数组后一个元素为arr[i+1]
		数组前一个元素为arr[i-1]
		接着通过位置交换的原理来实现数组中元素位置的互换

		位置互换之后当前顺序的数组重新渲染到页面，同时更新到Local Storage中防止二次刷新后页面位置回退（考试要求！无要求可不用上传）
*/
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