$(document).ready(function () {

    // UPDATE TOTAL PRICE
    function updateTotalPrice() {
        var totalPrice = 0;
        $('#table-body  > tr').each(function (index, tr) {
            totalPrice += Number($(tr).find("td:eq(3)").text().replace(/[^0-9]+/g, ""));
        });
        $('.total-price').text(Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice));
    }

    // GET ITEM TO ADD OR UPDATE
    function getItem(userID, itemID, itemName, itemQuantity, itemPrice) {
        var URL = `http://localhost:5000/giohang/${userID}/${itemID}`;
        fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 200 && data.message === "success") {
                    if (data.data.length !== 0) {
                        updateItem(userID, itemID, itemQuantity, itemPrice);
                    } else {
                        addItem(userID, itemID, itemName, itemQuantity, itemPrice);
                    }
                }
            })
    }

    // ADD ITEM
    function addItem(userID, itemID, itemName, itemQuantity, itemPrice) {
        var URL = "http://localhost:5000/giohang/add";
        var data = {
            "userID": userID,
            "itemID": itemID,
            "itemName": itemName,
            "quantity": itemQuantity,
            "price": itemPrice
        }
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 200 && data.message === "success") {
                    /**
                     * tbody
                     */
                    var tbody = $('#table-body');
                    var html = `<tr id="${itemID}">` +
                        `<td>${itemName}</td>` +
                        `<td>${itemQuantity}</td>` +
                        `<td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(itemPrice)}</td>` +
                        `<td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(itemPrice * itemQuantity)}</td>` +
                        `<td><div class="link">Remove</div></td>` +
                        `</tr > `;
                    tbody.append(html);
                    var notification = $('.cart-notification');
                    var success = `<div class="alert alert-success alert-dismissible">` +
                        `<button type="button" class="close" data-dismiss="alert">&times;</button>` +
                        `Item Added Into Cart</div>`
                    notification.append(success);
                    /**
                    * tfooter
                    */
                    updateTotalPrice();
                }
            })
            .catch(err => {
                var notification = $('.cart-notification');
                var notSuccess = `<div class="alert alert-danger alert-dismissible">` +
                    `<button type="button" class="close" data-dismiss="alert">&times;</button>` +
                    `Item Didn't Add Into Cart</div>`
                notification.append(notSuccess);
            })
    }

    // UPDATE ITEM
    function updateItem(userID, itemID, itemQuantity, itemPrice) {
        var item = $(`#${itemID}`);
        var oldQuantity = item.find("td:eq(1)").text();
        var newQuantity = Number(itemQuantity) + Number(oldQuantity);
        var total = newQuantity * itemPrice;
        var URL = `http://localhost:5000/giohang/${userID}/${itemID}`;
        var data = {
            "quantity": newQuantity
        }
        fetch(URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 200 && data.message === "success") {
                    item.find("td:eq(1)").text(newQuantity);
                    item.find("td:eq(3)").text(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total));
                    var notification = $('.cart-notification');
                    var success = `<div class="alert alert-success alert-dismissible">` +
                        `<button type="button" class="close" data-dismiss="alert">&times;</button>` +
                        `Item Updated Into Cart</div>`
                    notification.append(success);
                    /**
                    * tfooter
                    */
                    updateTotalPrice();
                }
            })
            .catch(err => {
                console.log(err);
                var notification = $('.cart-notification');
                var notSuccess = `<div class="alert alert-danger alert-dismissible">` +
                    `<button type="button" class="close" data-dismiss="alert">&times;</button>` +
                    `Item Didn't Update Into Cart</div>`
                notification.append(notSuccess);
            })
    }

    // ADD TO CART
    $('.item-group').on("click", ".item-add", function () {
        var item = $(this).closest('.item');
        var itemId = item.find('.item-id').text();
        var itemName = item.find('.item-name').text();
        var itemQuantity = item.find('.item-input').val();
        var itemPrice = Number(item.find('.item-price').text().replace(/[^0-9]+/g, ""));
        if (itemId !== null && itemName !== null && itemPrice !== null && itemQuantity > 0) {
            getItem("17093161", itemId, itemName, itemQuantity, itemPrice);
        } else {
            var notification = $('.cart-notification');
            var wrongQuantity = `<div class="alert alert-danger alert-dismissible">` +
                `<button type="button" class="close" data-dismiss="alert">&times;</button>` +
                `Item Quantity Must Be Greater Than 1</div>`
            notification.append(wrongQuantity);
        }
    });

    // REMOVE ITEM
    $('#table-body').on("click", ".link", function () {
        var userID = "17093161";
        var tr = $(this).closest('tr');
        var itemID = tr.attr('id');
        var URL = `http://localhost:5000/giohang/remove/${userID}/${itemID}`;
        fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 200 && data.message === "success") {
                    var item = $(`#${itemID}`);
                    item.remove();
                    var notification = $('.cart-notification');
                    var removeSuccess = `<div class="alert alert-success alert-dismissible">` +
                        `<button type="button" class="close" data-dismiss="alert">&times;</button>` +
                        `Remove Item Success</div>`
                    notification.append(removeSuccess);
                    /**
                    * tfooter
                    */
                    updateTotalPrice();
                } else {
                    var notification = $('.cart-notification');
                    var removeFail = `<div class="alert alert-danger alert-dismissible">` +
                        `<button type="button" class="close" data-dismiss="alert">&times;</button>` +
                        `Remove Item Not Success</div>`
                    notification.append(removeFail);
                }
            })
            .catch((err) => console.error(err));
    });

    // REMOVE CART
    $('#clear-cart').on("click", ".link", function () {
        var userID = "17093161";
        var URL = `http://localhost:5000/giohang/remove/${userID}`;
        fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 200 && data.message === "success") {
                    var tbody = $('#table-body');
                    tbody.empty();
                    var notification = $('.cart-notification');
                    var removeSuccess = `<div class="alert alert-success alert-dismissible">` +
                        `<button type="button" class="close" data-dismiss="alert">&times;</button>` +
                        `Remove Cart Success</div>`
                    notification.append(removeSuccess);
                    /**
                    * tfooter
                    */
                    updateTotalPrice();
                } else {
                    var notification = $('.cart-notification');
                    var removeFail = `<div class="alert alert-danger alert-dismissible">` +
                        `<button type="button" class="close" data-dismiss="alert">&times;</button>` +
                        `Remove Cart Not Success</div>`
                    notification.append(removeFail);
                }
            })
            .catch((err) => console.error(err));
    });
});

// GET CART
$(window).on("load", function () {
    var URL = "http://localhost:5000/giohang/";
    fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (data.status === 200 && data.message === "success") {
                /**
                 * show tbody
                 */
                const html = data.data.map((item) => {
                    return (
                        `<tr id="${item.itemID}">` +
                        `<td>${item.itemName}</td>` +
                        `<td>${item.quantity}</td>` +
                        `<td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>` +
                        `<td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.quantity * item.price)}</td>` +
                        `<td><div class="link">Remove</div></td>` +
                        `</tr > `
                    );
                }).join('');
                var tbody = $('#table-body');
                var tbodyChildren = tbody.children();
                if (tbodyChildren) {
                    tbody.empty();
                }
                tbody.append(html);
                /**
                 * show tfooter
                 */
                var totalPrice = 0;
                for (var item of data.data) {
                    totalPrice += (item.quantity * item.price);
                }
                $('.total-price').text(Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice));
            }
        })
        .catch((err) => console.error(err));
});