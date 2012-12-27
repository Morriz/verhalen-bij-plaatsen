$(function () {
    $("#register").fadeIn(500);
    $("#tiles").bind("select", function (ev, url) {
        if (!$("#register").is(':visible')) {
            if ($("#TileDialog").is(':visible')) {
                $("#TileDialog").hide();;
            }
            if ($("#StoryDialog").is(':visible')) {
                $("#StoryDialog").hide();;
            }
            showAddStoryDialog(ev, url);
        }
    });
    $("#tiles").bind("over", function (ev, url) {
       // alert($(ev.target).position());
    });
});


function register() {
    $("#userName").text($("#registerForm input[name=name]").val());
    $("#tiles").trigger("search", $("#registerForm input[name=birth-place]").val());
    //alert($("#registerForm input[name=birth-place]").val());
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
    //$("#TileDialog").hide();
    $("#stories .story-none").remove();
    var storyDate = $("#storyForm input[name=story-day]").val() + "/" + $("#storyForm input[name=story-month]").val() +
        "/" + $("#storyForm input[name=story-year]").val() + " ";
    var $story = $("<a href='javascript:;'>");
    $story.append($("<div>").text($("#storyForm [name=title]").val()+" ").addClass("story-title"));
    //$story.append($("<div>").text($("#storyForm textarea").val() + " ").addClass("hide"));
    $story.append($("<div>").html($("#userName").text() + " - " + storyDate).addClass("story-author").addClass("pull-right"));
    $story.click(function () {
        $("#StoryDialog .story-title").text($("#storyForm [name=title]").val() + " ");
        $("#StoryDialog .story-main").text($("#storyForm textarea").val() + " ");
        $("#StoryDialog .story-author").html($("#userName").text() + " - " + storyDate).addClass("story-author").addClass("pull-right");
        $("#TileDialog").hide();
        $("#StoryDialog").show();
    });

    $("#stories").append($story);
    
    $("#tiles").trigger("refresh");
}

function closeTileDialog() {
    $('#TileDialog').hide();
}

function closeStoryDialog() {
    $('#StoryDialog').hide();
    $('#TileDialog').show();
}
