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
        if(isMine(this)){
            this.style.backgroundColor = 'red';
            return;
        }
        this.style.backgroundColor = 'blue'; 
    };
    
    function tableDataContextMenuClickEvent(){
        this.style.backgroundColor = 'green'        
    };


    function isMine(TableData){
        for(var isMineIteration = 0; isMineIteration < mines.length; isMineIteration++){       
            if(TableData.id == mines[isMineIteration].id){
                return true;
            }
        }
    };


    function addMines(){
        var tableDatas = document.getElementsByTagName("td");
        tableDatas.forEach(function(curentValue){
            if(getRandomArbitrary(curentValue)){
                tableDatas[curentValue].setAttribute('val', true);
                return;
            };
            return;
        });
       
    }


    function createTable(size){
        var table = document.createElement('table');
        var tmp = "";
        for(var row = 0; row < size; row++){
            tmp += '<tr>';
            for(var colum = 0; colum < size; colum++){
                tmp += '<td id="' + row + ':' + colum + '">'+ row + ':' + colum + '</th>'
            }
            tmp += '</tr>';
        }
        table.innerHTML += tmp;
        return table;
    }


    function addEventListenerForTable(){
        var tableDatas = document.getElementsByTagName("td");
        for(var tdIteration = 0; tdIteration < tableDatas.length; tdIteration++){
            tableDatas[tdIteration].addEventListener('click', tableDataClickEvent);
            tableDatas[tdIteration].addEventListener('contextmenu', tableDataContextMenuClickEvent);
        };
    }
    
    app.appendChild(createTable(7));
    addEventListenerForTable();
    addMines();
    
})()