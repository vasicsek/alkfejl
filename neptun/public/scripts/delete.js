function showConfirm(message) {
    let _resolve, _reject

    const $modal = $('.confirm-modal')
    $modal.modal('show')

    $modal.find('.modal-ok').on('click', function (e) {
        _resolve(true)
    })
    $modal.find('.modal-cancel').on('click', function (e) {
        _resolve(false)
    })

    return new Promise(function (resolve, reject) {
        _resolve = resolve
        _reject = reject
    })
}

$('#btnDelete').on('click', function (e) {
    e.preventDefault()
    showConfirm()
        .then(response => {
            if (response) {
                window.location.href = this.href
            }
        })
})