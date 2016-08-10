var my_boards= new Array();
var newcards= new Array(); 
var my_lists = new Array();


var onAuthorize = function() 
{
  updateLoggedIn();
  $("#output-boards").empty();
  $("#output-newcards").empty();
  $("#output-lists").empty();

  Trello.members.get("me", function(member) 
  {
    $("#fullName").text(member.fullName);
    $boards_div = $("#output-boards");
    

    //cargar tableros del usuario actual
    Trello.get("members/me/boards", function(boards) 
    {
        $boards_div.empty();
        var tablestr="";
        tablestr+="<table class='table table-striped'><tr><th>ID</td><th>BOARD</th><th>URL</th></tr>";
        $.each(boards, function(ix, board) 
        {
            tablestr+="<tr>";
            my_boards[board.name]=new Array();
            my_boards[board.name]["name"]=board.name;
            my_boards[board.name]["url"]=board.url;
            my_boards[board.name]["id"]=board.id;
            
            tablestr+="<td>"+board.id+"</td>";
            tablestr+="<td>"+board.name+"</td>";
            tablestr+="<td><a href='"+board.url+"'>"+board.url+"</a></td>";

            tablestr+="</tr>";
        });  
        tablestr+="</table>";
        $boards_div.append(tablestr);
    });

        
  });

};
$( "#btn-step" ).click(function() 
{
    $("#output-boards").empty();
    $("#output-newcards").empty();
    $("#output-lists").empty();
    $("#btn-step").hide();
    $("#btn-step2").show();


    //cargar csv con tarjetas
    $newcards_div = $("#output-newcards");
    var client = new XMLHttpRequest();

    
    client.open('GET', 'entregables.csv');
    client.send();

    client.onreadystatechange = function() 
    {
      $newcards_div.empty();
      console.log(client.responseText);
      newcards= parseCSV( client.responseText);
      //console.log(newcards);

      var tablestr= "";

      tablestr+="<table class='table table-striped'><tr><th>TEAM</th><th>BOARD</th><th>CARD</th><th>COMMENT</th><th>LIST</th><th>URL</th></tr>";

      for(i=1; i<newcards.length; i++)
      {
          tablestr+="<tr>";
          tablestr+="<td>"+newcards[i][0]+"</td>";
          tablestr+="<td>"+newcards[i][1]+"</td>";
          tablestr+="<td>"+newcards[i][2]+"</td>";
          tablestr+="<td>"+newcards[i][3]+"</td>";
          tablestr+="<td>"+newcards[i][4]+"</td>";

          tablestr+="<td><a href='"+my_boards[newcards[i][1]]["url"]+"'>"+my_boards[newcards[i][1]]["name"]+"</a></td>";
          tablestr+="</tr>";
      }
      tablestr+="</table>";
      $newcards_div.append(tablestr);
    }

});

$( "#btn-step2" ).click(function() 
{
    $("#output-boards").empty();
    $("#output-newcards").empty();
    $("#output-lists").empty();
    $("#btn-step").hide();
    $("#btn-step2").hide();
    $("#btn-step3").show();
    $lists_div = $("#output-lists");

  var ic;
  var cardslist= "";
  cardslist+="<table class='table table-striped'>";
  cardslist+="<tr><th>IDBOARD</th><th>LISTNAME</th><th>LISTID</th></tr>";
  for(ic=1; ic<newcards.length; ic++)
  {
    var idboard= my_boards[newcards[ic][1]]["id"];
    //console.log("Datos de la tarjeta a crear");
    //console.log(boardname+":"+listname+"->"+cardname);
    var boardname = newcards[ic][1];
    var listname = newcards[ic][4];
    var cardname = (newcards[ic][2]);
    var alllists;

    Trello.get("boards/"+idboard+"/lists", function(lists) 
    {
        for (li in lists)
        {
          if(lists[li].name = listname)
          {
            console.log(idboard);
            console.log(listname);
            console.log(my_lists);
            if(my_lists[idboard] === undefined)
            {
              my_lists[idboard]=new Array();
            }
            my_lists[idboard][listname]=lists[li].id; 
            cardslist+="<tr>";
            cardslist+="<td>"+idboard+"</td>";
            cardslist+="<td>"+listname+"</td>";
            cardslist+="<td>"+lists[li].id+"</td>";
            cardslist+="</tr>"; 
          }
        }
        $lists_div.append(cardslist);
    });
    
    /*
            if(list.name == listname)
            {
              console.log("Intentando crear tarjeta:");
              console.log(cardname);
              console.log(list.id);
              console.log(idboard);

              Trello.addCard({
                name: cardname, 
                desc: cardname+"- Tarjeta autogenerada",
                pos: "bottom", 
                idList: list.id,
                idBoard: idboard
              });
              var success = function(successMsg) 
              { 
                //get cardid and put comments
              }
              var error= function(errorMsg) { console.log("Error creating card")}
            }
    */

  } 
  
});


$( "#btn-step2" ).click(function() 
{

}); 
//funciones para autenticación con trello
var updateLoggedIn = function() {
  var isLoggedIn = Trello.authorized();
  $("#loggedout").toggle(!isLoggedIn);
  $("#loggedin").toggle(isLoggedIn);
};

var logout = function() {
  Trello.deauthorize();
  updateLoggedIn();
};

Trello.authorize({
  interactive: false,
  success: onAuthorize
});

$("#connectLink")
  .click(function() 
  {
    Trello.authorize
    ({
      	type: "popup",
      	success: onAuthorize,
      	scope: 
      	{
        	write: true,
        	read: true
      	}
    });
    console.log("Connecting");
  });

$("#disconnect").click(logout);
//funciones axiliares

function parseCSV(str) {
    var arr = [];
    var quote = false;  // true means we're inside a quoted field

    // iterate over each character, keep track of current row and column (of the returned array)
    for (var row = col = c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c+1];        // current character, next character
        arr[row] = arr[row] || [];             // create a new row if necessary
        arr[row][col] = arr[row][col] || '';   // create a new column (start with empty string) if necessary

        // If the current character is a quotation mark, and we're inside a
        // quoted field, and the next character is also a quotation mark,
        // add a quotation mark to the current column and skip the next character
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }  

        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"') { quote = !quote; continue; }

        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == ',' && !quote) { ++col; continue; }

        // If it's a newline and we're not in a quoted field, move on to the next
        // row and move to column 0 of that new row
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
    }
    return arr;
}