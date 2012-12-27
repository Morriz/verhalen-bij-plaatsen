$(function () {
    $("#register").fadeIn(500);
    $("#tiles").bind("select", function (ev, url) {
        if ($("#TileDialog").is(':visible')) {
            $("#TileDialog").hide();;
        }
        showAddStoryDialog(ev, url);
    });
});


function register() {
    $("#userName").text($("#registerForm input[name=name]").val());
    $("#register").fadeOut(500);
    $("#account").show();

    //setTimeout(showAddStoryDialog, 2000);
}

function editUser() {
    $("#main").hide();
    $("#register").fadeIn(500);
}

function showAddStoryDialog(ev, url) {
    $("#TileDialog .thumb").attr("src", url);
    //alert(url);
    $("#TileDialog").fadeIn(1000);
}

function submitStory() {
    $("#TileDialog").hide();
    $("#stories nostoriesyet").remove();
    var storyDate = $("#storyForm input[name=story-day]").val() + "/" + $("#storyForm input[name=story-month]").val() +
        "/" + $("#storyForm input[name=story-year]").val() + " ";
    var $story = $("<li>");
    $story.append($("<div>").text($("#storyForm [name=title]").val()+" S").addClass("story-title"));
    $story.append($("<div>").text($("#storyForm textarea").val() + " ").addClass("story-main"));
    $story.append($("<div>").html($("#userName").text() + " - " + storyDate ).addClass("story-author").addClass("pull-right"));
    $("#stories").append($story);
    
    $("#tiles").trigger("refresh");
}