/****************************************************
 * Filtres
 ****************************************************/
function hommes(elt) { if (elt["genre"] == "M") return elt; }
function femmes(elt) { if (elt["genre"] == "F") return elt; }

// permet de passer des paramètres aux filtres (ici -> annee)
function parAnne(annee) {
    return function (elt) {
        if (elt["naissance"]["annee"] == annee) return elt;
    }
}