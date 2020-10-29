const validateProducts = (req, res, next) => {
    let producsFail = []
    let invalidProd = 0
    let products = req.body.products
    products.map(prod => {
        prod.problems = []
        if (!prod || !prod.id || !prod.name || !prod.value || !prod.stock) {
            invalidProd += 1
        } else {
            if (prod.name.length < 3 || prod.name.length > 55) {
                prod.problems.push("Invalid Name")
            }
            if (prod.value < 0 || prod.value > 99999.9) {
                prod.problems.push("Invalid Value")
            }
            if (prod.discount_value >= prod.value) {
                prod.problems.push("Invalid discount value")
            }
            if (prod.stock < -1) {
                prod.problems.push("Invalid stock value")
            }

            if (prod.problems.length > 0) {
                producsFail.push(prod)
            }
        }

    })
    if (producsFail.length > 0 || invalidProd > 0) {
        res.status(422).send({
            "status": "ERROR",
            "products_report": producsFail.map(e => {
                return {
                    product_id: e.id,
                    errors: e.problems
                }
            }),
            "number_of_products_unable_to_parse": invalidProd
        })
    }
    next();
}
module.exports = validateProducts