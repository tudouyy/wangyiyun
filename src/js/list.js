$(function(){
    $.getJSON("json/json2.json",function(data){
        data.list.forEach((v,k)=>{
            $(".newst").append(
                `
                <div class="lists_mus flex">
                    <div class="left">
                        <p><a href="javascript:;">${v.name}</p>
                        <div>
                            <i></i>
                            <span>${v.singer}</span>
                        </div>
                    </div>
                    <div class="right">
                        <i></i>
                    </div>
                </div>
                `
            )
        })
        data.pic.forEach((v,k)=>{
            $(".likes").append(
                `
                <ul  class="content  recomm flex">
                    <li>
                        <a href="javascript:;"><img src="${v.pic}" alt=""></a>
                        <p>${v.tit}</p>
                    </li>
                    <li>
                        <a href="javascript:;"><img src="${v.pic}" alt=""></a>
                        <p>${v.tit}</p>
                    </li>
                    <li>
                        <a href="javascript:;"><img src="${v.pic}" alt=""></a>
                        <p>${v.tit}</p>
                    </li>
                </ul>
                `
            )
        })
    });
});