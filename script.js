function searchMovie() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "dca61bcc",
      s: $("#input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `<div class="col-md-4">
                <div class="card">
                <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="Card title">` +
              data.Title +
              `</h5>
                    <p class="card-text">` +
              data.Year +
              `</p>
                    <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=` +
              data.imdbID +
              `>See Detail</a>
                </div>
                </div>
                </div>`
          );
        });
        $("#input").val("");
      } else {
        $("#movie-list").html(`<h2 class="text-center">" ` + result.Error + `"</h2>"`);
      }
    },
  });
}

$("#cari").on("click", function () {
  searchMovie();
});
$("#input").on("keyup", function (e) {
  if (e.which === 13) {
    searchMovie();
  }
});
$("#movie-list").on("click", ".see-detail", function () {
  $.ajax({
    url: "http://omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "dca61bcc",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
                <div class="container-fluid">
                    <div class="row">
                    <div class="col-md-4">
                    <img src="` +
            movie.Poster +
            `"class="img-fluid">
                    </div>
                    <div class="col-md-8">
                    <ul class="list-group">
                        <li class="list-group-item"><h5> ` +
            movie.Title +
            `</h5></li>
            <li class="list-group-item">Realeased : ` +
            movie.Released +
            `</h5></li>
            <li class="list-group-item">Duration : ` +
            movie.Runtime +
            `</li>
            <li class="list-group-item">Genre : ` +
            movie.Genre +
            `</li>
            <li class="list-group-item">Writer : ` +
            movie.Writer +
            `</li>
            <li class="list-group-item">Actor : ` +
            movie.Actors +
            `</li>
            <li class="list-group-item">Plot : ` +
            movie.Plot +
            `</li>
                    </ul>
                    </div>
                    </div>
                </div>`
        );
      }
    },
  });
});
