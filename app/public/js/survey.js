// console.log("Survery.js linked.");

function validateInputs(){
    let isValid = true;
    $('input').each(function() {
      if (!$(this).val()) {
        isValid = false;
      }
    });
    $('.custom-select').each(function(i, element) {
      if (!$(this).val()) {
        isValid = false;
      }
    });
    return isValid;
}

function submit(event) {
    event.preventDefault();
    $("#error").text("").removeClass('alert alert-danger');
    // console.log("You clicked.");
    if (validateInputs()) {
        const userData = {
            name: $('#name').val().trim(),
            photo: $('#photoUrl').val().trim(),
            scores: [
                $('#q1').val(),
                $('#q2').val(),
                $('#q3').val(),
                $('#q4').val(),
                $('#q5').val(),
                $('#q6').val(),
                $('#q7').val(),
                $('#q8').val(),
                $('#q9').val(),
                $('#q10').val()
            ]
        };
        $.get("/api/employees")
            .then(function (res) {
                // console.log(res);
                // console.log(userData.scores);
                let bestMatch;
                let largestDifference=50;
                for (let i = 0; i < res.length; i++) {
                    // console.log(res[i].scores);
                    let difference=0;
                    for(let a=0;a<10;a++){
                        difference+=Math.abs(res[i].scores[a]-userData.scores[a])
                    }
                    // console.log(difference);
                    if(difference<largestDifference){
                        largestDifference=difference;
                        bestMatch=res[i];
                    }
                    // console.log(bestMatch);
                    displayModal(bestMatch);
                }
                // console.log("done printing");
                // $.post("/api/employees", userData)
                //     .then(function (res) {
                //         if (res.success) {
                //             // alert("Post was successful!");
                //         }
                //     })
            })
        
    }
    else{
        $("#error")
        .text('Please fill out all fields before submitting!')
        .addClass('alert alert-danger');
    }
};

function displayModal (data) {
  
    $('#match-name').text(data.name);
    $('#match-img').attr('src', data.photo);
    $('#results-modal').modal('toggle');
  }

$("#submit").on('click',submit);