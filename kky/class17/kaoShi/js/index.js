// console.log("外部引入index.js");

var id;//用来存放/记录 要修改的那条数据的id,确认修改使用
var arr=[];//用来存的所有数据
;(function(){
	var TIME=3000;//规定提示框隐藏时间
	
	var checkAll=document.getElementById("checkAll");
	var inverse=document.getElementById("inverse");
	
	var user=document.getElementById("user");
	var age=document.getElementById("age");
	var edu=document.getElementById("edu");
	var add=document.getElementById("add");
	
	var queRenXiuGai=document.getElementById("queRenXiuGai");
	
	var GeHang=document.getElementById("GeHang");
	var yiRu=document.getElementById("yiRu");
	var paiXu=document.getElementById("paiXu");
	
	var quanBuShanChu=document.getElementById("quanBuShanChu");
	
	var search=document.getElementById("search");
	var chaXun=document.getElementById("chaXun");
	
	
	//函数1 init() 初始化
	init();
	
	//函数15: 全选/全不选
	checkAll.onclick=function(){
		// console.log("this.checked:",this.checked);
		//调用函数16 checkAllFun() 实现爱好所有选项选中/取消选中
		checkAllFun(this.checked);
	}
	
	//函数17: 反选
	inverse.onclick=function(){
		var hobbyIpts=document.querySelectorAll("div#hobby>div.hobby>label>input");
		for(var i=0;i<hobbyIpts.length;i++){
			hobbyIpts[i].checked=!hobbyIpts[i].checked;
		}
		//调用函数13 isCheckAll 判断 全选/全不选 是否要被选中
		isCheckAll()
	}
	
	
	//函数18 添加功能
	add.onclick=function(){
		var userValue=user.value;
		var ageValue=age.value;
		var patt1=/^[^<>]*[^<>]*$/;//不能输入包含<,>
		var patt2=new RegExp("^[^<>]*[^<>]*$");//不能输入包含<,>
		console.log("userValue:",userValue);
		var f1=patt1.test(userValue);
		var f2=patt2.test(userValue);
		console.log("f1:",f1);
		console.log("f2:",f2);
		if(userValue&&ageValue&&f1){
			var obj={
				user:userValue,
				age:ageValue,
				//调用函数19 getSex() 获取性别
				sex:getSex(),
				//调用函数20 getHobby() 获取爱好 选中项的值,结果是个数组
				hobby:getHobby(),
				edu:edu.value,
				time:+new Date(),
				//调用函数21 getId() 获取id
				id:getId()
			}
			// console.log("obj:",obj);
			if(!localStorage.arr2021113){
				localStorage.arr2021113="[]";
				arr=[];
			}
			// console.log("arr:",arr);
			arr.push(obj);
			localStorage.arr2021113=JSON.stringify(arr);
			
			//函数3 showPage() 渲染页面
			showPage();
			
			//函数23 clearDom() 添加/确认修改 完成后 清空所有数据
			clearDom();
			
			
		}else{
			if(!userValue){
				//调用函数24 infoFun 提示框 根据用户给定的内容进行提示,在time(毫秒后隐藏);
				infoFun("姓名不能为空",TIME);
			}else if(!ageValue){
				//调用函数24 infoFun 提示框 根据用户给定的内容进行提示,在time(毫秒后隐藏);
				infoFun("年龄不能为空",TIME);
			}else if(!f1){
				//调用函数24 infoFun 提示框 根据用户给定的内容进行提示,在time(毫秒后隐藏);
				infoFun("不能包含特殊字符<和>",TIME);
			}
		}
	}
	
	
	//函数25 开启 / 关闭 隔行变色
	GeHang.onclick=function(){
		var table=document.getElementById("tab");
		if(this.innerHTML=="开启隔行变色"){
			this.innerHTML="关闭隔行变色";
			table.classList.add("geHangBianSe");
			this.classList.add("active");
		}else{
			this.innerHTML="开启隔行变色";
			table.classList.remove("geHangBianSe");
			this.classList.remove("active");
		}
	}
	
	//函数26 开启/ 关闭 移入变色
	yiRu.onclick=function(){
		var table=document.getElementById("tab");
		if(this.innerHTML=="开启移入变色"){
			this.innerHTML="关闭移入变色";
			table.classList.add("yiRuBianSe");
			this.classList.add("active");
		}else{
			this.innerHTML="开启移入变色";
			table.classList.remove("yiRuBianSe");
			this.classList.remove("active");
		}
	}
	
	//函数27 排序 升序/降序
	paiXu.onclick=function(){
		this.classList.add("active");
		if(this.innerHTML=="按年龄升序↑"){
			this.innerHTML="按年龄降序↓";
			arr.sort(function(a,b){
				return a.age-b.age;
			});
		}else if(this.innerHTML=="按年龄降序↓"){
			this.innerHTML="按添加顺序排序";
			arr.sort(function(a,b){
				return b.age-a.age;
			});
		}else{
			this.innerHTML="按年龄升序↑";
			this.classList.remove("active");
			arr=JSON.parse(localStorage.arr2021113);
		}
		
		//函数3 showPage() 渲染页面
		showPage();
	}
	
	//函数28 查询功能 根据 姓名或年龄 查询,若查询条件为空则显示所有数据
	chaXun.onclick=function(){
		var searchValue=search.value;
		if(searchValue){
			var newArr=[];
			for(var i=0;i<arr.length;i++){
				if(arr[i].user.includes(searchValue)||arr[i].age.includes(searchValue)){
					newArr.push(arr[i]);
				}
			}
			//函数3 showPage() 渲染页面
			showPage(newArr);
		}else{
			arr=JSON.parse(localStorage.arr2021113);
			//函数3 showPage() 渲染页面
			showPage();
		}
	}
	
	//函数29 全部删除
	quanBuShanChu.onclick=function(){
		var f=confirm("如此重要的数据,您确定要全部删除吗?一旦删除无法找回");
		if(f){
			arr=[];
			localStorage.arr2021113="[]";
			//函数3 showPage() 渲染页面
			showPage();
		}
	}
	
	//函数30 queRenXiuGai()确认修改
	queRenXiuGai.onclick=function(){
		console.log("确认修改的id:",id);
		var userValue=user.value;
		var ageValue=age.value;
		if(userValue&&ageValue){
			var obj={
				user:userValue,
				age:ageValue,
				//调用函数19 getSex() 获取性别
				sex:getSex(),
				//调用函数20 getHobby() 获取爱好 选中项的值,结果是个数组
				hobby:getHobby(),
				edu:edu.value,
				time:+new Date(),
				id:id
			}
			console.log("obj:",obj);
			for(var i=0;i<arr.length;i++){
				if(arr[i].id==id){
					arr.splice(i,1,obj);
				}
			}
			
			localStorage.arr2021113=JSON.stringify(arr);
			//函数3 showPage() 渲染页面
			showPage();
			
			//函数23 clearDom() 添加/确认修改 完成后 清空所有数据
			clearDom();
			
			this.classList.add("hide");
			add.classList.remove("hide");
			
		}
	}
	
}());

/////////////////////////////////////////////
//函数1 init() 初始化 设置该项目必须的数据
function init(){
	//调用函数2 initData() 初始化数据
	initData();
	
	//调用函数14 hobbysFun() 给所有的爱好 添加 onclick / onchange 事件,用来调用 函数4: isCheckAll() 判断 全选/全不选 是否要被选中
	hobbysFun();
	
}
/////////////////////////////////////////////
//函数2 initData() 初始化数据
function initData(){
	if(localStorage.arr2021113){
		arr=JSON.parse(localStorage.arr2021113);
		//函数3 showPage() 渲染页面
		showPage();
	}else{
		localStorage.arr2021113="[]";
	}
	
}
/////////////////////////////////////////////
//函数3 showPage() 渲染页面 newArr,代表查询到的数据
function showPage(newArr){
	// console.log("newArr:",newArr);
	var arr2=[];
	newArr?(arr2=newArr):arr2=arr;
	// console.log("此时的数据arr2:",arr2);
	var table=document.getElementById("tab");
	var tbody=document.querySelector("table#tab>tbody");
	if(arr2.length){
		table.classList.remove("hide");
		var trs="";
		for(var i=0;i<arr2.length;i++){
			//调用函数4 setHobby()设置用户选取的 爱好 对应的汉字 
			//调用函数5 setEdu()设置用户选取的学历
			//调用函数6 timeFun() 返回规定格式的时间
			//调用函数7  bu0(n) 返回数字 09/10
			//调用函数8 up() 上移此行数据
			//调用函数9 down()下移此行数据
			//调用函数10 del() 删除
			//调用函数11 upd()  修改--步骤1
			trs+=`
				<tr>
					<td>${arr2[i].user}</td>
					<td>${arr2[i].age}</td>
					<td>${arr2[i].sex=="0"?'小哥哥':'小姐姐'}</td>
					<td>${setHobby(arr2[i].hobby)}</td>
					<td>${setEdu(arr2[i].edu)}</td>
					<td>${timeFun(arr2[i].time)}</td>
					<td>
						<button type="button" ${i==0?'disabled class=a':'onclick=up("'+arr2[i].id+'")'}  >上移</button>
						<button type="button"  onclick=del('${arr2[i].id}')  >删除</button>
						<button type="button" onclick=upd(${JSON.stringify(arr2[i])}) >修改</button>
						<button type="button" ${i==arr2.length-1?'disabled':'onclick=down("'+arr2[i].id+'")'}  >下移</button>
					</td>
				</tr>
			`;
		}
		tbody.innerHTML=trs;
	}else{
		table.classList.add("hide");
		tbody.innerHTML="";//清空tbody中的数据
	}
}
/////////////////////////////////////////////
//函数 4 setHobby() 设置用户选取的 爱好 对应的汉字 
function setHobby(arr){
	// console.log("111arr:",arr);
	var obj={
		h1:"学习",
		h2:"健身",
		h3:"挣钱",
		h4:"美食",
		h5:"游泳",
		h6:"自驾游",
	}
	var str="";
	for(var i=0;i<arr.length;i++){
		str+=obj[arr[i]]+" "
	}
	return str;
}
/////////////////////////////////////////////
//函数5 setEdu() 设置用户选取的学历
function setEdu(attr){
	var obj={
		e1:"博士",
		e2:"本科",
		e3:"专科",
		e4:"高中",
		e5:"初中",
		e6:"小学"
	}
	return attr?obj[attr]:"";
}
/////////////////////////////////////////////
//函数6 timeFun(time) 返回时间
function timeFun(time){
	var d=new Date(time);
	var year=d.getFullYear();
	var month=bu0(d.getMonth()+1);
	var date=bu0(d.getDate());
	var hours=bu0(d.getHours());
	var minutes=bu0(d.getMinutes());
	var seconds=bu0(d.getSeconds());
	return year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
}
/////////////////////////////////////////////
//函数7 bu0(n) 返回数字 09/10
function bu0(n){
	return n>10?n:('0'+n);
}
/////////////////////////////////////////////
//函数8 up(id)  上移
function up(id){
	// console.log("up id:",id);
	arr=JSON.parse(localStorage.arr2021113)
	var obj;
	for(var i=0;i<arr.length;i++){
		if(arr[i].id==id&&i!=0){
			obj=arr[i];
			arr[i]=arr[i-1];
			arr[i-1]=obj;
			break;
		}
	}
	// console.log("11111arr:",arr);
	localStorage.arr2021113=JSON.stringify(arr);
	//函数3 showPage() 渲染页面
	showPage();
}
/////////////////////////////////////////////
//函数9 down(id)  下移
function down(id){
	// console.log("down id:",id);
	arr=JSON.parse(localStorage.arr2021113)
	var obj;
	// console.log("down arr:",arr);
	for(var i=0;i<arr.length;i++){
		if(arr[i].id==id&&i!=arr.length-1){
			// console.log("down i:",i);
			obj=arr[i];
			arr[i]=arr[i+1];
			arr[i+1]=obj;
			break;
		}
	}
	// console.log("2222arr:",arr);
	localStorage.arr2021113=JSON.stringify(arr);
	// //函数3 showPage() 渲染页面
	showPage();
}
/////////////////////////////////////////////
//函数10 del(id)  删除
function del(id){
	// console.log("del id:",id);
	var f=confirm("确定删除吗?");
	if(f){
		for(var i=0;i<arr.length;i++){
			if(arr[i].id==id){
				arr.splice(i,1);
				break;
			}
		}
		
		localStorage.arr2021113=JSON.stringify(arr);
		//函数3 showPage() 渲染页面
		showPage();
	}
}
/////////////////////////////////////////////
//函数11 upd(obj)  修改--步骤1
function upd(obj){
	// console.log("upd obj:",obj);
	var user=document.getElementById("user");
	var age=document.getElementById("age");
	var edu=document.getElementById("edu");
	var add=document.getElementById("add");
	var queRenXiuGai=document.getElementById("queRenXiuGai");
	var sexIpts=document.querySelectorAll("div#sex>label>input");
	
	user.value=obj.user;
	age.value=obj.age;
	edu.value=obj.edu;
	
	//设置性别
	obj.sex=="0"?(sexIpts[0].checked=true):(sexIpts[1].checked=true);
	
	//调用函数12 updSetHobby(arr) 设置爱好 选项的选中状态
	updSetHobby(obj.hobby);
	
	id=obj.id;
	
	add.classList.add("hide");
	queRenXiuGai.classList.remove("hide");
}
/////////////////////////////////////////////
//函数12 updSetHobby(arr) 设置爱好 选项的选中状态
function updSetHobby(arr){
	// console.log("arr:",arr);
	var hobbyIpts=document.querySelectorAll("div#hobby>div.hobby>label>input");
	// console.log("hobbyIpts:",hobbyIpts);
	for(var i=0;i<hobbyIpts.length;i++){
		hobbyIpts[i].checked=false;
		for(var n=0;n<arr.length;n++){
			if(hobbyIpts[i].value==arr[n]){
				hobbyIpts[i].checked=true;
				break;
			}
		}
	}
	//函数13: isCheckAll() 判断 全选/全不选 是否要被选中
	isCheckAll();
}
/////////////////////////////////////////////
//函数13: isCheckAll() 判断 全选/全不选 是否要被选中
function isCheckAll(){
	// console.log("1");
	var hobbyIpts=document.querySelectorAll("div#hobby>div.hobby>label>input");
	var checkAll=document.getElementById("checkAll");
	var f=true;
	for(var i=0;i<hobbyIpts.length;i++){
		// console.log("2hobbyIpts[i]:",hobbyIpts[i].checked,"hobbyIpts[i].checked:",hobbyIpts[i].checked)
		if(!hobbyIpts[i].checked){
			f=false;
			break;
		}
	}
	checkAll.checked=f;
}
/////////////////////////////////////////////
//函数14 hobbysFun 给所有的爱好 添加 onclick / onchange 事件,
//用来调用 函数4: isCheckAll() 判断 全选/全不选 是否要被选中
function hobbysFun(){
	var hobbyIpts=document.querySelectorAll("div#hobby>div.hobby>label>input");
	for(var i=0;i<hobbyIpts.length;i++){
		hobbyIpts[i].onclick=function(){
			// console.log("0:this:",this,"this.checked:",this.checked);
			//调用函数13 isCheckAll() 判断 全选/全不选 是否要被选中 
			isCheckAll();
		}
	}
}
/////////////////////////////////////////////
//函数16: checkAll(f) f:ture/false 实现爱好所有选项选中/取消选中
function checkAllFun(f){
	var hobbyIpts=document.querySelectorAll("div#hobby>div.hobby>label>input");
	for(var i=0;i<hobbyIpts.length;i++){
		hobbyIpts[i].checked=f;
	}
}
/////////////////////////////////////////////
//函数19 getSex() 获取性别
function getSex(){
	var sexIpts=document.querySelectorAll("div#sex>label>input");
	if(sexIpts[0].checked){
		return sexIpts[0].value;
	}else{
		return sexIpts[1].value;
	}
}
/////////////////////////////////////////////
//函数20 getHobby() 获取爱好
function getHobby(){
	var arr=[];
	var hobbyIpts=document.querySelectorAll("div#hobby>div.hobby>label>input");
	for(var i=0;i<hobbyIpts.length;i++){
		if(hobbyIpts[i].checked){
			arr.push(hobbyIpts[i].value);
		}
	}
	return arr;
}
/////////////////////////////////////////////
//函数21 getId() 获取自定义ID
function getId(){
	//调用函数22 get4Letter 生成4位字母的验证码
	var str=get4Letter();
	return +new Date()+str;
}
/////////////////////////////////////////////
//验证码功能
//验证码功能
//验证码功能
//函数22 get4Letter() 验证码功能 纯字母 随机生成四个字母 区分大小写的字母  
// get4Letter();
function get4Letter(){
	var arr=[];
	var str="";
	for(var i=0;i<26;i++){
		// console.log(String.fromCharCode(65+i));//输出A-Z 26个大写字母
		// console.log(String.fromCharCode(97+i));//输出a-z 26个小写字母
		arr.push(String.fromCharCode(65+i),String.fromCharCode(97+i));
		// arr.push(String.fromCharCode(65+i));
	}
	console.log("arr:",arr);
	var arr2=[];
	for(var i=0;;i++){
		var n=parseInt(Math.random()*arr.length);
		arr2.push(arr[n]);
		arr2=noRepeat(arr2);
		if(arr2.length==4){
			break;
		}
	}
	console.log("arr2:",arr2,arr2.join(""));
	var str=arr2.join("");
	// console.log("str:",str);
	return str;
}
/////////////////////////////////////////////
//函数22.5 数组去重
function noRepeat(arr){
	var arr2=[];
	for(var i=0;i<arr.length;i++){
		if(!arr2.includes(arr[i])){
			arr2.push(arr[i]);
		}
	}
	return arr2;
}
/////////////////////////////////////////////
//函数23 clearDom() 添加/确认修改 完成后 清空所有数据
function clearDom(){
	var user=document.getElementById("user");
	var age=document.getElementById("age");
	var edu=document.getElementById("edu");
	var checkAll=document.getElementById("checkAll");
	var search=document.getElementById("search");
	
	user.value=age.value=edu.value=search.value="";
	
	var sexIpts=document.querySelectorAll("div#sex>label>input");
	sexIpts[0].checked=false;
	sexIpts[1].checked=false;
	
	checkAll.checked=false;
	
	//函数16: checkAll(f) f:ture/false 实现爱好所有选项选中/取消选中
	checkAllFun(false);
}
/////////////////////////////////////////////
//函数24 infoFun 提示框 根据用户给定的内容进行提示,在time(毫秒后隐藏);
function infoFun(str,time){
	var info=document.querySelector("#info"); 
	info.innerHTML=str;
	info.classList.add("show");
	var t=setTimeout(function(){
		info.classList.remove("show");
	},time)
}
/////////////////////////////////////////////

