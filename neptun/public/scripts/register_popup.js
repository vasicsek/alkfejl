$('#btnRegister').on('click', function (e) {
    e.preventDefault();
    let $modal = $('.modal');

    $modal = $(`<div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="loginModal">
          <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
              <div class="modal-header">Regisztráció</div>
              <div class="modal-body">
                <div class="alert alert-danger"></div>
                <div class="form-area"></div>
              </div>
            </div>
          </div>
        </div>`)

    $formArea = $modal.find('.form-area');
    $formAlert = $modal.find('.alert');

    $formArea.load('/register #formRegister', function () {
        $modal.modal('show');
        $formAlert.hide();

        $formArea.find('form').on('submit', function (e) {
            e.preventDefault();
            const data = $(this).serializeArray();
            Promise.resolve(
                $.ajax({
                    url: '/ajax/register',
                    method: 'POST',
                    data,
                    dataType: 'json',
                    headers: { 'csrf-token': $('[name="_csrf"]').val() }
                })
            ).then(json => {
                if (json.success) {
                    location.assign('/');
                } else {
                    $formAlert.text('Hibás adatok!').show();
                }
            })
        })
    })
})