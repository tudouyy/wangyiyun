//轮播图插件
class Carousel{
	constructor({el,timeout = 3000,isAuto,isDots,isClick}){
		this.el = el;
		this.timeout = timeout;
		this.isAuto = isAuto;
		this.isDots = isDots;
		this.isClick = isClick;

		if(this.isDots){
			//let directionBtn = this.el.getElementsByClassName('direction-btn')[0];
			let dots = this.el.getElementsByClassName('dots')[0];
			//鼠标进入事件
			this.el.onmouseover = () =>{
				//directionBtn.style.display = 'block';
				dots.style.display = 'block';
				//$('.dots2').css({"display":"none"});
				//清除定时器
				clearInterval(this.timer);
			}
			//鼠标离开事件
			this.el.onmouseout = () =>{
				//directionBtn.style.display = 'none';
				dots.style.display = 'none';
				//再次自动轮播
				if(this.isAuto){
					this.autoMove();
				}
			}
		}

		//无缝轮播的流程
		//复制carousel-list的第一个LI到最后
		let carouselList = this.el.getElementsByClassName('carousel-list')[0];
		let firstLi = carouselList.children[0];
		this.liWidth = firstLi.offsetWidth;//每张图片的宽度
		
		carouselList.innerHTML += firstLi.outerHTML;//复制第一张图片
		this.imgLen = carouselList.children.length;//图片的个数
		
		//设置最新的UL宽度
		carouselList.style.width = this.imgLen*this.liWidth+'px';
		this.carouselList = carouselList;
		
		//添加Li的下标
		this.liIndex = 0;
		//添加按钮的下标
		this.dotIndex = 0;

		if(this.isDots){
			//获取按钮的长度
			this.dots = this.el.getElementsByClassName('dots')[0];
			this.dotLen = this.dots.children.length;
			//循环按钮，添加事件
			for(let i = 0;i<this.dotLen;i++){
				this.dots.children[i].onmouseover=()=>{
					this.liIndex = i;
					this.dotIndex = i;

					//让ul运动
					bufferMove(this.carouselList,{left: -this.liIndex*this.liWidth});
					//切换按钮
					this.dotMove();
				}
			}
		}	

		if(this.isClick){
			//给左侧按钮添加点击事件
			let prev = this.el.getElementsByClassName('prev')[0];
			prev.onclick =() =>{
				this.leftMove();
			}
			//给右侧按钮添加点击事件
			let next = this.el.getElementsByClassName('next')[0];
			next.onclick = () =>{
				this.rightMove();
			}
		}	
		
		//自动轮播
		if(this.isAuto){
			this.autoMove();
		}
	}

	//自动轮播
	autoMove(){
		this.timer = setInterval(()=>{
			this.rightMove();
		},this.timeout);
	}

	//左侧移动
	leftMove(){
		this.liIndex--;
		if(this.liIndex < 0){
			this.carouselList.style.left = -(this.imgLen - 1) * this.liWidth + 'px';
			this.liIndex = this.imgLen - 2;
		}
		bufferMove(this.carouselList,{left: -this.liIndex * this.liWidth});
		
		if(this.isDots){
			//按钮切换
			this.dotIndex--;
			this.dotMove();
		}	
		if(this.isXhx){
			//下划线切换
			this.xhxIndex--;
			this.xhxMove();
		}	
	}

	//右侧移动
	rightMove(){
		//图片运动
		this.liIndex++;
		//判断边界
		if(this.liIndex>=this.imgLen){
			//如果超出最大。让carouselList的位置回到起点
			this.carouselList.style.left = 0;
			this.liIndex = 1;
		}
		//让图片动起来
		bufferMove(this.carouselList,{left: - this.liIndex * this.liWidth});
		if(this.isDots){
			//按钮切换
			this.dotIndex++;
			this.dotMove();
		}	
		if(this.isXhx){
			//下划线切换
			this.xhxIndex++;
			this.xhxMove()
		}	
	}

	//按钮移动
	dotMove(){
		//左侧方向的判断
		if(this.dotIndex<0){
			this.dotIndex = this.dotLen -1;
		}
		//右侧方向的判断
		if(this.dotIndex>=this.dotLen){
			this.dotIndex = 0;
		}
		for(let i=0;i<this.dotLen;i++){
			this.dots.children[i].className = '';
		}
		this.dots.children[this.dotIndex].className='active';
	}
}