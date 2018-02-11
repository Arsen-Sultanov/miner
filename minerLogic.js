var minerLogic = (function(){
    var mines=[];
    var app = document.getElementById("app");
  
    function isMine(elem){
        mines.some(function(curentValue){
            return curentValue === elem;
        });
    }

    function  getRandomArbitrary(elem){
        if(!isMine(elem)){
            return Math.round(Math.random());
        }
        return 0;
    }


    function tableDataClickEvent(){
        event.target.className = 'td-open'; 
    };
    
    function tableDataContextMenuClickEvent(event){
        event.preventDefault();
        if(event.target.className === 'td-open'){
            return;
        }
        event.target.className = 'td-flag'; 

    };

   
//Генератор бомб 
    function bombGenerator(bomb){
        var numberOfBombs = bomb || 5 ;
        return function(){
           
            if(numberOfBombs > 0 ){
                if(Math.round(Math.random())){
                    --numberOfBombs;
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
        var tableDatas = document.getElementsByTagName("table");
        tableDatas[0].addEventListener('click', tableDataClickEvent);
        tableDatas[0].addEventListener('contextmenu', tableDataContextMenuClickEvent);
    }
    
    app.appendChild(createTable(7));
    addEventListenerForTable();
   
    
})()    