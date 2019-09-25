$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    setInterval(function () {
        //check if numbers in the graph are too small..then show tooltip
        var minWidth = 15;
        var checkForceTooltip = function (jselector) {
            var element$ = $(jselector);
            var eWidth = element$.width();
            if (eWidth < minWidth){
                if(element$.attr("data-trigger") !== "manual" || element$.attr("aria-describedby") === undefined){
                    element$.attr("data-trigger", "manual");
                    element$.tooltip("show");
                }
            }else{
                if(element$.attr("data-trigger") === "manual"){
                    element$.removeAttr("data-trigger");
                    element$.tooltip("hide");
                }
            }
        };
        checkForceTooltip(".progress-bar+.progress-bar-danger");
        checkForceTooltip(".progress-bar+.progress-bar-warning");

    }, 1000);
});