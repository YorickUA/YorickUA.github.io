$(function()
  { var board_html;
  var board=[];
  var id=0;
  var board_html="";
  var matrix=[];
  for(var i=0; i<8; i+=1){
        board_html+="<tr>";
        board[i]=[];
        for(var j=0; j<8; j+=1){
            board_html+="<td id="+id+" class=\"square";
            
            if (((i+j)%2)!=0) {
                board_html+=" black\">"
            }
            else{
                board_html+=" white\">"
            }
            board_html+="</td>";
            board[i][j]=id;
            id++;
        }
        board_html+="</tr>";
    }
    $('.board').html(board_html);
    for(var i=0; i<64; i+=1){
        matrix[i]=[];
            for(var j=0; j<64; j+=1)
            matrix[i][j]=0;
    }
    var moves=[[2,1],[1,2],[-2,-1],[-1,-2],[-2,1],[1,-2],[2,-1],[-1,2]]
        for(var j=0; j<8; j+=1){
            for(var k=0; k<8; k+=1){  
                 for (var i=0; i<8;i+=1){
                        if (checkMove(j,k, moves[i][0], moves[i][1])) {
                             matrix[board[j][k]][board[j+moves[i][0]][k-moves[i][1]]]=1;
                        }
                  }
            }
        }    

    function checkMove(x, y, dx, dy) {
        dy=-dy;
        if ( (x+dx)>=0 && (x+dx)<8 ) {
            if ((y+dy)>=0 && (y+dy)<8) {
                return true;
            }
        }
        return false;
    }
    
    $(".square").on("click", clickSquare);
    
    function clickSquare(){
        if ($(".start").length!=0 && $(".end").length!=0) {
            $(".start").removeClass("start");
            $(".end").removeClass("end");
            $(".route").removeClass("route");
        }
        if ($(".start").length!=0) {
            $(this).addClass("end");
            findPath($(".start").attr("id"), $(".end").attr("id"));
        }
        else{
        $(this).addClass("start");
        }
    }
    
    function findPath(start, end) {
        var squares=[];
        for (var i=0;i<64;i+=1){
            squares[i]={id:i, route:[], distance:null, status:null};
        }
        squares[start].status="green";
        squares[start].distance=0;
        squares[start].route.push(squares[start].id);
        if (start!=end) {      
            for(var i=0;i<64; i+=1){
                 if (squares[i].status=="green") {
                            for(var j=0;j<64; j+=1){
                                if (matrix[i][j]==1){
                                    if ((squares[j].distance==null)||(squares[j].distance>(squares[i].distance+1))) {
                                     squares[j].distance=squares[i].distance+1;
                                     squares[j].status="green";
                                     squares[j].route=[];
                                     for(var k=0;k<squares[i].route.length;k++){
                                     squares[j].route.push(squares[i].route[k]);
                                     }
                                     squares[j].route.push(squares[j].id);
                                  }
                                }
                            }
                        squares[i].status="red";
                        i=-1;
                    }
                }
            }
            for(var i=1;i<squares[end].route.length-1;i+=1){
                $("#"+squares[end].route[i]).addClass("route");
            }
            console.log(squares[end].route);
            console.log(squares[end].distance);
        }
  });