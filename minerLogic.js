var minerLogic = (function(){
    var app = document.getElementById("app");
    var trs;
    var numbFlags = 0;
    
    
    function openAll(){
        removEventListenerForTable();
        if(trs === undefined){trs = document.getElementsByTagName ('td');}   
        for(var iter = 0; iter < trs.length; iter++){
            if(trs[iter].className === 'td-flag' && trs[iter].hasAttribute('bomb') ){
                continue;
            }
            else if(trs[iter].hasAttribute('bomb')){ 
                trs[iter].className = 'td-open-mine'; 
                continue;
            }
            trs[iter].className = 'td-open';
        }
    }

    function victory(){

    }

// Обработчики кликов
    function tableDataClickEvent(){
        if(event.target.tagName != 'TD' || event.target.className === 'td-flag') return;
        else if(event.target.hasAttribute('bomb')){
            event.target.className = 'td-open-mine';
            openAll();
            return;
        } 
        event.target.className = 'td-open';
    };
    
    function tableDataContextMenuClickEvent(event){
        event.preventDefault();
        if(event.target.tagName != 'TD' || event.target.className === 'td-open') return;
        else if(event.target.className === 'td-flag'){
            event.target.className = 'td-close';
            ++numbFlags;
            return;
        }
        else if(numbFlags === 0){
            return;
        }
        --numbFlags;
        event.target.className = 'td-flag'; 
    };

   
//Генератор бомб 
    function bombGenerator(bomb){
        var numberOfBombs = bomb || 5 ;
        return function(){
            if(Math.round(Math.random()) && numberOfBombs > 0 ){
                if(Math.round(Math.random())){
                    --numberOfBombs;
                    ++numbFlags;
                    return "bomb";
                    console.log(numberOfBombs);
                }
                return;
            }
            return;
        }
    }


    function createTable(size){
        var table = document.createElement('table');
        var tmp = "";
        var bombs =  bombGenerator();
        for(var row = 0; row < size; row++){
            tmp += '<tr>';
            for(var colum = 0; colum < size; colum++){
                tmp += '<td class="td-close" id="' + row + ':' + colum + ' " '+ bombs() +'> </td>'
            }
            tmp += '</tr>';
        }
        table.innerHTML += tmp;
        return table;
    }


    function addEventListenerForTable(){
        tableDatas = document.getElementsByTagName("table");
        tableDatas[0].addEventListener('click', tableDataClickEvent);
        tableDatas[0].addEventListener('contextmenu', tableDataContextMenuClickEvent);
    }

    function removEventListenerForTable(){
        tableDatas[0].removeEventListener('click', tableDataClickEvent);
        tableDatas[0].removeEventListener('contextmenu', tableDataContextMenuClickEvent);
    }
    
    app.appendChild(createTable(7));
    addEventListenerForTable();
   
    
})()    