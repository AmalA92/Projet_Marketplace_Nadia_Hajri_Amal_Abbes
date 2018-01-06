module.exports.searchQuery = (data) => {

    let query = {}
    if (data.categorie)
        query.categorie = data.categorie
    if (data.ville)
        query.ville = data.ville
    if (data.search)
        query.$text = {
            $search: data.search
        }
    //prix
    if (data.prix_min && !data.prix_max) {
        query.prix = {}
        query.prix.$gte = data.prix_min
    }
    if (data.prix_max && !data.prix_min) {
        query.prix = {}
        query.prix.$lte = data.prix_max
    }
    if (data.prix_max && data.prix_min) {
        query.prix = {}
        query.prix.$gte = data.prix_min
        query.prix.$lte = data.prix_max
    }

    return query
}
