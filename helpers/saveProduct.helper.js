const saveProducts = (myCache, producs) => {
    let oldProd = myCache.get("Producs")
    oldProd = oldProd ? oldProd : []
    return myCache.mset([{ key: "Producs", val: [...oldProd, ...producs], ttl: 10000 }])
}

module.exports = saveProducts