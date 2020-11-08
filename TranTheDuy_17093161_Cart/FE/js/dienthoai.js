$(window).on("load", function () {
    var URL = "http://localhost:5000/dienthoai/";
    fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (data.status === 200 && data.message === "success") {
                const html = data.data.map((dt) => {
                    return (
                        `<div class="p-3 m-2 bg-light border border-dark rounded text-center item">` +
                        `<div class="invisible item-id">${dt.id}</div>` +
                        `<img class="item-image mb-4"
                    src="${dt.image.src}"
                    alt="${dt.image.name}">` +
                        `<p class="item-name text-primary">${dt.name}</p>` +
                        `<p class="item-price text-danger">${new Intl.NumberFormat('vi-VN',
                            { style: 'currency', currency: 'VND' }
                        ).format(dt.price)}</p>` +
                        `<input type="number" class="item-input" min="1" value="1">` +
                        `<div class="mt-2"><button class="item-add btn btn-success border border-dark">Add to cart</button>
                        </div>` +
                        `</div>`
                    );
                }).join('');
                var itemGroup = $('.item-group');
                var item = $('.item');
                if (item) {
                    item.remove();
                }
                itemGroup.append(html);
            }
        })
        .catch((err) => console.error(err));
});
