var app = {};
var jQuery = jQuery;
(function ($, exports) {
	var tempData = [];
	var proArr = []; //每个属性长度数组

	var Prorow = '.J_Prorow';
	var checkbox = '.J_Checkbox';
	var Jtable = '#J_table';
	var JR = '.J_MapRow';
	var JP = $(Prorow);

	var thlen = 3;//表格列数

	var init = function(){
		//每列属性的长度
		var arr = countProRow();
		
		//全部勾选组合方式数组
		proArr = reduceArr(arr);

		thlen += proArr.length;

		//勾选事件绑定
		_bindEvent();

		//初始化存储勾选属性
		setTablePro();
		
	}
	//存储勾选属性
	var setTablePro = function(){
		JP.each(function(){
			var index = $(this).data('index');
			$(this).find(checkbox + ':checked').each(function(){
				var key = this.value;
				var keyArr = key.split(':');

				if(!tempData[index]){
					tempData[index] = [];
				}
				tempData[index].push(key);
			})
		});
	}

	/**
	 * 插入表格 _addTbtr function
	 *
	 * @param  {Object} data 传入HTML数据
	 * @returns Object
	 */
	var _addTbtr = function (data){
		
		for(var i = 0; i<data.length;i++){
			var tr = _domTbtr(data[i]);//生成对象
			var idd = tr['id'];
			var indexId = getIndexTr();
			var num;

			//插入HTML
			if(indexId.length == 0 || idd>indexId[indexId.length-1]){
				$(Jtable + ' tbody').append(tr['tr']);
			}else if(idd<indexId[0]){
				$(JR).eq(0).before(tr['tr'])
			}else{
				num = countNum(idd,indexId)
				$(JR + '[data-id="'+num+'"]').after(tr['tr']);
			}
			
			
		}
		
		//合并表格
		rowspanTd();
		
	}
	//合并表格
	var rowspanTd = function(){
		var checkedlen = getChechedLen();
		var comArr = [];

			comArr = reduceArr(checkedlen);

			if(comArr.length == 1) return;

			$(JR).each(function(index){

				for(var i=comArr.length-2,j =0;i>=0;i--,j++){
					var rowTd = $(this).find('td');
					
					if((index+1)%comArr[i] == 1 || comArr[i] == 1){

						var k = rowTd.length-thlen+j;
							rowTd.eq(k).attr('rowspan',comArr[i]);
						
					}else{
						if(rowTd.length == (thlen-j))
							rowTd.eq(0).remove();
					}
					
				}
			})
	}
	//比较TR索引，返回插入索引位置
	var countNum = function(a,b){
		for(var i = 0;i<b.length-1;i++){
			if(b[i]<a && a<b[i+1]){
				return b[i];
			}
		}
	}
	//获取勾选数组长度
	var getChechedLen = function(){
		var arr = [];
		JP.each(function(){
			var len = $(this).find(checkbox + ':checked').length;
			arr.push(len);
		});
		return arr
	}
	//每列属性的长度
	var countProRow = function(){
		var arr = [];
		JP.each(function(){
			var len = $(this).find(checkbox).length;
			arr.push(len);
		});

		return arr
	}
	/**
	 * 返回组合方式数组
	 *
	 * @param  {arr} arr 
	 * @returns arr
	 */
	var reduceArr = function(arr){
		var tempArr = [];
		arr.reduceRight(function(a,b){
			tempArr.push(a*b);
			return a*b
		
		},1);

		return tempArr;
	}
	/**
	 * 返回TR索引
	 *
	 * @param  {arr} arr 
	 * @returns number
	 */
	var trIndex = function(arr){
		var a =0 ;		
		for(var i = 0;i<arr.length; i++){
			if(i == (arr.length-1)){
				a +=arr[i];
			}else{
				a += (+arr[i]-1)*proArr[arr.length-2-i]
			}

		}
		return a;
		
	}
	//trIndex([2,2,2]);
	var getIndexTr = function(){
		var arr = [];
		$(JR).each(function(){
			arr.push($(this).data('id'));
		})
		return arr;
	}
	/**
	 * 返回表格TR的HTML _domTbtr function
	 *
	 * @param  {Object} data
	 * @returns {
	 *     tr: HTML的表格DOM
	 *     id: tr对应的索引
	 *   }
	 */
	var _domTbtr = function (data){
		var data = data
		var sort = [];
		var typeId = '';
		var rowId;
		var tr = document.createElement('tr');
			tr.className = 'J_MapRow';

		for(var key in data){
			var td = document.createElement('td');

				if(data[key].rowspan) td.setAttribute('rowspan',data[key].rowspan)

				if(data[key].type == 'text'){
					var span = document.createElement('span');
					span.innerHTML = data[key].text
					span.className = 'J_map'+key.replace(':','-');

					//sort += '-'+
					sort.push(+key.split(':')[1])

					typeId += key.replace(':','-') + '|'

					td.appendChild(span);
					
				}else if(data[key].type == 'input'){
					var input = document.createElement('input');

					td.className = key;

					input.name = key;
					input.className = 'J_map'+key;
					input.setAttribute('data-type',key);

					td.appendChild(input);
				}

				//tr.id = sort;
				tr.appendChild(td);
		}
		rowId = trIndex(sort)

		typeId = typeId.substring(0,typeId.length-1);

		tr.setAttribute('data-id',rowId);
		tr.setAttribute('data-type',typeId);

		return {
				tr:tr,
				id:rowId
		}
	}
	/**
	 * 递归，计算出组合方式
	 *
	 * @param  {arr} arr
	 * @returns arr
	 */
	var doExchange = function (doubleArrays){
	    var len = doubleArrays.length;

	    if(len>=2){
	        var len1=doubleArrays[0].length;
	        var len2=doubleArrays[1].length;
	        var newlen=len1*len2;
	        var temp=new Array(newlen);
	        var index=0;
	        for(var i=0;i<len1;i++){
	            for(var j=0;j<len2;j++){
	                temp[index]=doubleArrays[0][i]+'|'+
	                    doubleArrays[1][j];
	                index++;
	            }
	        }
	        var newArray=new Array(len-1);
	        for(var i=2;i<len;i++){
	            newArray[i-1]= doubleArrays[i];
	        }
	        newArray[0]=temp;
	        return doExchange(newArray);
	    }
	    else{
	        return doubleArrays[0];
	    }
	}
	/**
	 * 勾选删除
	 *
	 * @param  {this} self
	 * @param  {number} index
	 */
	var delHmtl = function(){
		var key = this.value;
		var keyStr = key.replace(':','-');
		var inputObj = $(this).closest(Prorow).children().has('input:checked');
		var li = $(this).parent();

		var p = inputObj.eq(0).index();
		var k = li.index();
		var oldlen = thlen;

		var index = getIndex.call(this);

		$(JR + '[data-type*="'+keyStr+'"]').each(function(){
			if(index == 0){
				$(this).remove();
				return;
			}

			var len = $(this).find('td').length;

			if(p>k){

				var t = '';
					
				for(var i = 0;i<index;i++){
					if(thlen-len+i < index || len-oldlen-i > 0){
						if(i == 0 ){
							t = $(this).find('td').eq(i);
						}else{
							t = t.add($(this).find('td').eq(i));
						}
					}
				}

				if(t != ''){
					oldlen = $(this).next().find('td').length;
					t.prependTo($(this).next());
				}else{
					oldlen = thlen;
				}
				
			}			
				$(this).remove();
		})

		rowspanTd();
	}
	/**
	 * 删除勾选的数组属性
	 *
	 * @param  {number} index 勾选属性类型
	 */
	var delObjData = function(){
		
		var key = this.value;
		var keyArr = key.split(':');

		var index = getIndex.call(this);

		tempData[index].splice($.inArray(key,tempData[index]),1);
	}
	/**
	 * 深拷贝
	 *
	 * @param  {obj} obj 对象
	 */
	var deepClone = function(obj){

		return JSON.parse(JSON.stringify(obj));
	}
	/**
	 * 存储对象数据
	 *
	 * @param  {number} index 勾选属性类型
	 * @returns arr 返回生成每行表格的数据数组
	 */
	var objData = function (){
		var data = [], //存储勾选属性
			arrData = [],//存储生成表格数组
			key = this.value,
			keyArr = key.split(':'),
			arr = [];//临时

		var index = getIndex.call(this);

		data = deepClone(tempData);

		arr.push(key);
		data[index] = arr;

		if(!tempData[index]){
			tempData[index] = [];
		}
		tempData[index].push(key);


		var flag = _proLen();

		if(!flag) return;

		//递归获取组合方式
		var ret = doExchange(data);
		for(var i = 0; i<ret.length; i++){
			var proObj = {},
				retArr = ret[i].split('|');

			for(var y = 0;y<retArr.length;y++){

				var text = $(checkbox + '[value="'+retArr[y]+'"]').next().val();

				proObj[retArr[y]] = {'type':'text','name':retArr[y],'text':text};

			}
			
			proObj['salesPrice'] = {'type':'input','name':'salesPrice'};
			proObj['stock'] = {'type':'input','name':'stock'};
			proObj['barcode'] = {'type':'input','name':'barcode'};

			arrData.push(proObj);
		}

		return arrData;
		

	}
	//编辑修改属性
	var editPro = function(){
		var proId = $(this).next();
		var trId = '.J_map'+$(this).val().replace(':','-');
		var oldValue = proId.val();

		proId.removeAttr('disabled');

		proId.on('input',function(){
			$(trId).text(this.value);
		});

		proId.on('blur',function(){
			if(this.value == ''){
				this.value = oldValue;
				$(trId).text(oldValue);
			}
		});

	}
	//禁止修改属性
	var bantPro = function(){
		var proId = $(this).next();
		proId.attr('disabled','disabled');
	}

	//判断每项属性是否有勾选
	var _proLen = function (){
		var count = 0;
		JP.each(function(){
			var len = $(this).find(checkbox + ':checked').length;

			if(len > 0) count++;
		})

		if(count == proArr.length) return true;

		return false;
	}
	//获取勾选项类型
	var getIndex = function(){
		return $(this).closest(Prorow).data('index');
	}

	//事件绑定
	var _bindEvent = function (){

		//勾选属性
		$(checkbox).on('click',function(){
			var flag = _proLen();

			if($(this).is(':checked')){
				var obj = objData.call(this);
				editPro.call(this);

				if(flag){
					_addTbtr(obj);
				}

			}else{
				delObjData.call(this);
				delHmtl.call(this);
				bantPro.call(this);
			}
					
		});
	}
	
	//获取JSON
	var getJson = function(){
		var shopArr = [];

		$(JR).each(function(){
			var tdId = $(this).find('[class^="J_map"]');
			var obj = {};
				obj['id'] = this.id || '';
				tdId.each(function(){
					var key = this.className.replace('J_map','');
						key = key.split('-')[0];
				
					obj[key] = this.value?this.value:this.innerHTML;
				});

				shopArr.push(obj);

		})
		return JSON.stringify(shopArr);

	}

	var dbShop = {
		init: init,
		getJson: getJson
	}

	exports.db = dbShop;

})(jQuery,app);

app.db.init();