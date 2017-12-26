	slider 手机滑动效果
	上传了一个简单的DEMO 可以查看 欢迎指正 修改
	
	QQ:421543076 邮箱/mail：421543076@qq.com
	
	======
	slider 用法
	width  : '100%' //LI 的宽度
	height : 640  //LI 的高度
	dot    : true //圆点
	autoplay : true //自动播放
	sliderdir : true //false 左右滑动  true上下滑动 默认为左右滑动
	row : 1 //显示列数
	col : 1 //显示行数
	maxWidth : 640 屏幕的最大宽度 //默认为640

	//新建对象 例子如下
	new Slider({
		dom: document.getElementById('slider'),
		width: 440,
		height:600,//增加百分比设置 如'100%'
		dot: true,//圆点
		autoplay:true//自动播放
	
	});
	new Slider({
		dom: document.getElementById('item-list'),
		width: 200,
		height:200,
		sliderdir:true,//false 左右滚动  true上下滚动
		row:3 //列数量 默认为1
	
	});
	new Slider({
		dom: document.getElementById('m-menus'),
		width: 160,
		height:140,
		col:4//行数量 默认为1
	
	});
	new Slider({
		dom: document.getElementById('m-menus'),
		width: 160,
		height:140,
		col:4//行数量 默认为1
		row:4//行数量 默认为1
	
	});
